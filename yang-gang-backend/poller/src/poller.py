from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timezone, timedelta, date
from redis import Redis
import praw
import json
import requests
import tweepy
import time
import traceback
from newsapi import NewsApiClient
from constants import *
import pymysql
import confuse
import sys
import hashlib


# initialize redis
r = Redis(host='redis', port=6379)
# r = Redis(host='localhost', port=6379) # for aws only!!

# deletes all keys from redis (if we decide that persisting stuff isn't important)
r.flushdb()


print('trying to establish database connection.')
while True:
    try:
        connection = pymysql.connect(host='db',
                                     port=3306,
                                     user='root',
                                     password='root',
                                     db='db',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        print('database connection successfully established. proceeding to run poller code.')
        break
    except:
        pass


config = confuse.Configuration('src', __name__)
config.set_file('config.yaml')

environment = sys.argv[1]
print('initializing with settings for {} environment'.format(environment))

env_configs = config[environment].get()


# reddit api
reddit = praw.Reddit(client_id=env_configs['reddit']['client_id'],
                     client_secret=env_configs['reddit']['client_secret'],
                     user_agent=env_configs['reddit']['user_agent'],
                     username=env_configs['reddit']['username'],
                     password=env_configs['reddit']['password'])

subreddit = reddit.subreddit('YangForPresidentHQ')


# twitter api
auth = tweepy.OAuthHandler(env_configs['twitter']['consumer_key'], env_configs['twitter']['consumer_secret'])
auth.set_access_token(env_configs['twitter']['access_token'], env_configs['twitter']['access_token_secret'])
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)


# news api
newsapi = NewsApiClient(api_key=env_configs['news']['api_key'])

# youtube api
youtube_api_key1 = env_configs['youtube']['api_key1']
youtube_api_key2 = env_configs['youtube']['api_key2']


def get_youtube_params(published_after, api_key):
    if published_after is None:
        return {
            'part': 'snippet',
            'order': 'viewCount',
            'q': 'andrew yang',
            'type': 'video',
            'maxResults': str(top_num),
            'key': api_key
        }
    return {
        'part': 'snippet',
        'order': 'viewCount',
        'publishedAfter': published_after,
        'q': 'andrew yang',
        'type': 'video',
        'maxResults': str(top_num),
        'key': api_key
    }


def get_youtube_stat_params(vid_list, api_key):
    return {
        'part': 'contentDetails,statistics',
        'id': ','.join(vid_list),
        'key': api_key
    }


# reddit job helper functions
def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except (TypeError, OverflowError):
        return False


def fetch_hot_reddit():
    reddit_items = [{k:v for k,v in vars(submission).items() if k in reddit_fields and is_jsonable(v)} for submission in subreddit.hot(limit=top_num)]
    print('fetched new reddit items at {}'.format(datetime.now()))
    r.set('reddit', json.dumps(reddit_items))


def fetch_twitter():
    start = time.time()
    tweet_list = []
    s_timeline = tweepy.Cursor(api.user_timeline, screen_name='@AndrewYang', tweet_mode="extended").items()
    count = 0
    for tweet in s_timeline:
        j = tweet._json
        if j['in_reply_to_screen_name'] is None or j['in_reply_to_screen_name'] == 'AndrewYang':
            tweet_list.append(j)
            count += 1
            if len(tweet_list) == top_num_tweets:
                break
    print('num traversed: {}'.format(count))
    tweet_list = [{k:v for k,v in tweet.items() if k in twitter_fields} for tweet in tweet_list]
    r.set('twitter', json.dumps(tweet_list))
    end = time.time()
    print('fetched {} new twitter items at {} in {} seconds'.format(len(tweet_list), datetime.now(), end - start))


def fetch_youtube(days_lag, redis_key, api_key):
    try:
        if days_lag is not None:
            published_after = (datetime.now(timezone.utc) - timedelta(days=days_lag)).isoformat()
        else:
            published_after = None
        params = get_youtube_params(published_after, api_key)

        initial_response = requests.get(url=youtube_url, params=params).json()
        response = initial_response['items']
        vid_ids = [x['id']['videoId'] for x in response]
        print('fetched new youtube items at {} using {} params with api key: {}'.format(datetime.now(), redis_key, params['key']))
        view_counts = requests.get(url=youtube_vid_url,
                                   params=get_youtube_stat_params(vid_ids, params['key'])).json()['items']
        for i in range(len(response)):
            response[i] = {k: v for k,v in response[i].items() if k in youtube_vid_fields}
            response[i].update(view_counts[i])
        r.set(redis_key, json.dumps(response))
        print('set: {} with: {}'.format(redis_key, response[0]['statistics']))
    except:
        print('exception in getting video responses')
        print('error code: {}'.format(initial_response))
        traceback.print_exc()


def fetch_news():
    today_datestring = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    params = {
        'qInTitle': 'andrew yang',
        'language': 'en',
        'sortBy': 'popularity',
        'excludeDomains': 'pjmedia.com, patheos.com, politifact.com, liveleak.com, rightwingwatch.org, slickdeals.net, fark.com, knowyourmeme.com',
        'from': today_datestring,
        'apiKey': '84dbae84af624aeaa6e1a3fc92c97d6d',
        'pageSize': '100',
    }
    news_url = 'https://newsapi.org/v2/everything'
    all_articles = requests.get(url=news_url, params=params).json()
    r.set('news', json.dumps(all_articles))
    print('fetched {} news items at {} with {} datestring'.format(all_articles['totalResults'], datetime.now(), today_datestring))


def get_ig_gis(rhx_gis, params):
    data = rhx_gis + ":" + params
    if sys.version_info.major >= 3:
        return hashlib.md5(data.encode('utf-8')).hexdigest()
    else:
        return hashlib.md5(data).hexdigest()


def update_ig_gis_header(params, session):
    session.headers.update({
        'x-instagram-gis': get_ig_gis(
            "",
            params
        )
    })


def fetch_instagram():
    start = time.time()
    with requests.Session() as session:
        session.headers.update({'Referer': BASE_URL, 'user-agent': STORIES_UA})
        req = session.get(BASE_URL)
        session.headers.update({'X-CSRFToken': req.cookies['csrftoken']})
        session.headers.update({'user-agent': CHROME_WIN_UA})
        params = QUERY_MEDIA_VARS.format('3969496290', '')
        update_ig_gis_header(params, session)
        try:
            media = json.loads(session.get(QUERY_MEDIA.format(params)).text)['data']['user']['edge_owner_to_timeline_media']['edges']
            # remove 'node' key wrapper
            media = [x['node'] for x in media]
            for m in media:
                if m['__typename'] == 'GraphVideo':
                    m['actual_url'] = json.loads(requests.get(VIEW_MEDIA_URL.format(m['shortcode'])).text)['graphql']['shortcode_media']['video_url']
                else:
                    m['actual_url'] = None
            r.set('instagram', json.dumps(media))
            end = time.time()
            print('fetched {} instagram items at {} in {} seconds'.format(len(media), datetime.now(), end - start))
            session.cookies.clear()
        except:
            traceback.print_exc()
            session.cookies.clear()


def fill_stats_reddit():
    try:
        num_followers_yang = reddit.subreddit('YangForPresidentHQ').subscribers
        num_followers_sanders = reddit.subreddit('SandersForPresident').subscribers
        num_followers_warren = reddit.subreddit('ElizabethWarren').subscribers
        num_followers_buttigieg = reddit.subreddit('Pete_buttigieg').subscribers
        num_followers_kamala = reddit.subreddit('Kamala').subscribers
        with connection.cursor() as cursor:
            sql = "INSERT INTO `reddit_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_kamala`) VALUES ({}, {}, {}, {}, {})".format(num_followers_yang,
                                                                               num_followers_sanders,
                                                                               num_followers_warren,
                                                                               num_followers_buttigieg,
                                                                               num_followers_kamala)
            print(sql)
            cursor.execute(sql)
            connection.commit()
    except:
        traceback.print_exc()


def fill_stats_twitter():
    try:
        num_followers_yang = api.get_user('AndrewYang').followers_count
        num_followers_sanders = api.get_user('BernieSanders').followers_count
        num_followers_warren = api.get_user('ewarren').followers_count
        num_followers_buttigieg = api.get_user('PeteButtigieg').followers_count
        num_followers_kamala = api.get_user('KamalaHarris').followers_count
        num_followers_biden = api.get_user('JoeBiden').followers_count
        with connection.cursor() as cursor:
            sql = "INSERT INTO `twitter_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_kamala`, " \
                  "`num_followers_biden`) VALUES ({}, {}, {}, {}, {}, {})".format(num_followers_yang,
                                                                                  num_followers_sanders,
                                                                                  num_followers_warren,
                                                                                  num_followers_buttigieg,
                                                                                  num_followers_kamala,
                                                                                  num_followers_biden)
            print(sql)
            cursor.execute(sql)
            connection.commit()
    except:
        traceback.print_exc()


def get_instagram_followers(user):
    try:
        url = 'https://www.instagram.com/' + user
        r = requests.get(url).text
        start = '"edge_followed_by":{"count":'
        end = '},"followed_by_viewer"'

        return int(r[r.find(start) + len(start):r.rfind(end)])
    except:
        traceback.print_exc()


def fill_stats_instagram():
    try:
        num_followers_yang = get_instagram_followers('andrewyang2020')
        num_followers_sanders = get_instagram_followers('berniesanders')
        num_followers_warren = get_instagram_followers('elizabethwarren')
        num_followers_buttigieg = get_instagram_followers('pete.buttigieg')
        num_followers_kamala = get_instagram_followers('kamalaharris')
        num_followers_biden = get_instagram_followers('joebiden')
        with connection.cursor() as cursor:
            sql = "INSERT INTO `instagram_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_kamala`, " \
                  "`num_followers_biden`) VALUES ({}, {}, {}, {}, {}, {})".format(num_followers_yang,
                                                                                  num_followers_sanders,
                                                                                  num_followers_warren,
                                                                                  num_followers_buttigieg,
                                                                                  num_followers_kamala,
                                                                                  num_followers_biden)
            print(sql)
            cursor.execute(sql)
            connection.commit()
    except:
        traceback.print_exc()


scheduler = BackgroundScheduler()
scheduler.add_job(fill_stats_twitter, 'interval', minutes=60, id='fill_stats_twitter')
scheduler.add_job(fill_stats_reddit, 'interval', minutes=60, id='fill_stats_reddit')
scheduler.add_job(fill_stats_instagram, 'interval', minutes=60, id='fill_stats_instagram')
scheduler.add_job(fetch_hot_reddit, 'interval', seconds=10, id='fetch_hot_reddit')
scheduler.add_job(fetch_instagram, 'interval', minutes=2, id='fetch_instagram')
scheduler.add_job(fetch_twitter, 'interval', seconds=10, id='fetch_twitter')
scheduler.add_job(fetch_news, 'interval', minutes=30, id='fetch_news')
scheduler.add_job(lambda: fetch_youtube(7, 'youtube', youtube_api_key1),
                  'interval', minutes=60, id='fetch_youtube')
scheduler.add_job(lambda: fetch_youtube(1, 'youtube_day', youtube_api_key1),
                  'interval', minutes=60, id='fetch_youtube_day')
scheduler.add_job(lambda: fetch_youtube(3, 'youtube_3day', youtube_api_key2),
                  'interval', minutes=60, id='fetch_youtube_3day')
scheduler.add_job(lambda: fetch_youtube(None, 'youtube_all_time', youtube_api_key2),
                  'interval', minutes=60, id='fetch_youtube_all_time')

fetch_hot_reddit()
fetch_twitter()
fetch_news()
fetch_instagram()
fill_stats_instagram()
fetch_youtube(7, 'youtube', youtube_api_key1)
fetch_youtube(1, 'youtube_day', youtube_api_key1)
fetch_youtube(3, 'youtube_3day', youtube_api_key2)
fetch_youtube(None, 'youtube_all_time', youtube_api_key2)
fill_stats_reddit()
fill_stats_twitter()


scheduler.start()

while True:
    time.sleep(10)
