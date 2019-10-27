from apscheduler.schedulers.background import BackgroundScheduler
from redis import Redis
import praw
import requests
import tweepy
import time
import traceback
from newsapi import NewsApiClient
from constants import *
import pymysql
import confuse
import sys
from twitter_helper import fetch_twitter
from instagram_helper import fetch_instagram
from news_helper import fetch_news
from reddit_helper import fetch_hot_reddit
from youtube_helper import fetch_youtube

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


def get_api_dict(candidate_name):
    api_dict = {}
    # reddit api
    reddit = praw.Reddit(client_id=env_configs[candidate_name]['reddit']['client_id'],
                         client_secret=env_configs[candidate_name]['reddit']['client_secret'],
                         user_agent=env_configs[candidate_name]['reddit']['user_agent'],
                         username=env_configs[candidate_name]['reddit']['username'],
                         password=env_configs[candidate_name]['reddit']['password'])

    api_dict['reddit_api'] = reddit
    api_dict['subreddit_api'] = reddit.subreddit(env_configs[candidate_name]['reddit']['subreddit_name'])

    # twitter api
    auth = tweepy.OAuthHandler(env_configs[candidate_name]['twitter']['consumer_key'],
                               env_configs[candidate_name]['twitter']['consumer_secret'])
    auth.set_access_token(env_configs[candidate_name]['twitter']['access_token'],
                          env_configs[candidate_name]['twitter']['access_token_secret'])

    api_dict['twitter_api'] = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

    # news api
    # api_dict['news_api'] = NewsApiClient(api_key=env_configs[candidate_name]['news']['api_key'])

    # youtube api
    api_dict['youtube_api_key1'] = env_configs[candidate_name]['youtube']['api_key1']
    api_dict['youtube_api_key2'] = env_configs[candidate_name]['youtube']['api_key2']

    return api_dict


candidate_dict = {candidate_name: get_api_dict(candidate_name) for candidate_name in env_configs.keys()}

# TODO: may want to use different api keys for stats in the future
yang_api_dict = candidate_dict['andrew_yang']
reddit = yang_api_dict['reddit_api']
api = yang_api_dict['twitter_api']


def fetch_twitter_aggregate():
    for candidate_name, api_dict in candidate_dict.items():
        fetch_twitter(api_dict['twitter_api'], r, candidate_name,
                      env_configs[candidate_name]['twitter']['screen_name'])


def fetch_reddit_aggregate():
    for candidate_name, api_dict in candidate_dict.items():
        if candidate_name != 'donald_trump':
            fetch_hot_reddit(api_dict['subreddit_api'], r, candidate_name)


def fetch_youtube_aggregate():
    for candidate_name, _ in candidate_dict.items():
        fetch_youtube(7, candidate_name, 'youtube', env_configs[candidate_name]['youtube']['api_key1'],
                      r, env_configs[candidate_name]['youtube']['query'])
        fetch_youtube(1, candidate_name, 'youtube_day', env_configs[candidate_name]['youtube']['api_key1'],
                      r, env_configs[candidate_name]['youtube']['query'])
        fetch_youtube(3, candidate_name, 'youtube_3day', env_configs[candidate_name]['youtube']['api_key2'],
                      r, env_configs[candidate_name]['youtube']['query'])
        fetch_youtube(None, candidate_name, 'youtube_all_time', env_configs[candidate_name]['youtube']['api_key2'],
                      r, env_configs[candidate_name]['youtube']['query'])


def fetch_news_aggregate():
    for candidate_name, _ in candidate_dict.items():
        fetch_news(r,
                   candidate_name,
                   env_configs[candidate_name]['news']['query'],
                   env_configs[candidate_name]['news']['api_key'])


def fetch_instagram_aggregate():
    for candidate_name, _ in candidate_dict.items():
        fetch_instagram(r, candidate_name, env_configs[candidate_name]['instagram']['user_id'])


def fill_stats_reddit():
    try:
        num_followers_yang = reddit.subreddit('YangForPresidentHQ').subscribers
        num_followers_sanders = reddit.subreddit('SandersForPresident').subscribers
        num_followers_warren = reddit.subreddit('ElizabethWarren').subscribers
        num_followers_buttigieg = reddit.subreddit('Pete_buttigieg').subscribers
        num_followers_kamala = reddit.subreddit('Kamala').subscribers
        # num_followers_trump = None  # can't reach the donald (because it's quarantined?)
        num_followers_gabbard = reddit.subreddit('tulsi').subscribers
        with connection.cursor() as cursor:
            sql = "INSERT INTO `reddit_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_gabbard`, " \
                  "`num_followers_kamala`) VALUES ({}, {}, {}, {}, {}, {})".format(num_followers_yang,
                                                                                   num_followers_sanders,
                                                                                   num_followers_warren,
                                                                                   num_followers_buttigieg,
                                                                                   num_followers_gabbard,
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
        num_followers_trump = api.get_user('realDonaldTrump').followers_count
        num_followers_gabbard = api.get_user('TulsiGabbard').followers_count
        with connection.cursor() as cursor:
            sql = "INSERT INTO `twitter_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_kamala`, " \
                  "`num_followers_gabbard`, " \
                  "`num_followers_trump`, " \
                  "`num_followers_biden`) VALUES ({}, {}, {}, {}, {}, {}, {}, {})".format(num_followers_yang,
                                                                                          num_followers_sanders,
                                                                                          num_followers_warren,
                                                                                          num_followers_buttigieg,
                                                                                          num_followers_kamala,
                                                                                          num_followers_gabbard,
                                                                                          num_followers_trump,
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
        num_followers_trump = get_instagram_followers('realdonaldtrump')
        num_followers_gabbard = get_instagram_followers('tulsigabbard')
        with connection.cursor() as cursor:
            sql = "INSERT INTO `instagram_stats` (`num_followers_yang`, " \
                  "`num_followers_sanders`, " \
                  "`num_followers_warren`, " \
                  "`num_followers_buttigieg`, " \
                  "`num_followers_kamala`, " \
                  "`num_followers_trump`, " \
                  "`num_followers_gabbard`, " \
                  "`num_followers_biden`) VALUES ({}, {}, {}, {}, {}, {}, {}, {})".format(num_followers_yang,
                                                                                          num_followers_sanders,
                                                                                          num_followers_warren,
                                                                                          num_followers_buttigieg,
                                                                                          num_followers_kamala,
                                                                                          num_followers_trump,
                                                                                          num_followers_gabbard,
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
scheduler.add_job(fetch_reddit_aggregate, 'interval', seconds=20, id='fetch_reddit')
scheduler.add_job(fetch_instagram_aggregate, 'interval', minutes=4, id='fetch_instagram')
scheduler.add_job(fetch_twitter_aggregate, 'interval', seconds=20, id='fetch_twitter')
scheduler.add_job(fetch_news_aggregate, 'interval', minutes=30, id='fetch_news')
scheduler.add_job(fetch_youtube_aggregate, 'interval', minutes=60, id='fetch_youtube')

fetch_youtube_aggregate()
fetch_news_aggregate()
fetch_reddit_aggregate()
fetch_twitter_aggregate()
fetch_instagram_aggregate()

# stats
fill_stats_instagram()
fill_stats_reddit()
fill_stats_twitter()

scheduler.start()

while True:
    time.sleep(10)
