from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timezone, timedelta
from redis import Redis
import praw
import json
import requests
import tweepy
import time
import traceback


# initialize redis
r = Redis(host='redis', port=6379)
# r = Redis(host='localhost', port=6379) # for aws only!!

# deletes all keys from redis (if we decide that persisting stuff isn't important)
r.flushdb()


# constants
top_num = 30
top_num_tweets = 50

reddit = praw.Reddit(client_id='xuKSovdtrPCrOg',
                     client_secret='bwMxzy_4Ytpdj8P0VzMhuNeXTGE',
                     user_agent='yanggangtest',
                     username='sylla-bear',
                     password='pdZ4dF4V8Fbxd3L')
subreddit = reddit.subreddit('YangForPresidentHQ')

consumer_key = "UgNuDDnG4aD0vuakNHHGzRqHI"
consumer_secret = "KD0yJfipBTBJ2tp0nLjGof2zDpSp3o7CEbTvXwKHOEUFiZJg2r"
access_token = "885251996608978945-4S2COwbMyG7DnC77ROxYvJERXuvJsS1"
access_token_secret = "XmcTgSjOEGo3CVRBzRd54WNJx8TcBF8xnsCdy9xbupYyR"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

youtube_api_key = 'AIzaSyAzK4LuxH38FMKZ7XwyYkCjyAzDNjwNg9Q'
youtube_api_key2 = 'AIzaSyBjrxjITLFDSpp6WWM4grQeEjPqzGvns5k'
youtube_url = 'https://www.googleapis.com/youtube/v3/search'
youtube_vid_url = 'https://www.googleapis.com/youtube/v3/videos'
seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
one_day_ago = datetime.now(timezone.utc) - timedelta(days=1)
three_days_ago = datetime.now(timezone.utc) - timedelta(days=3)

youtube_params = {
    'part': 'snippet',
    'order': 'viewCount',
    'publishedAfter': seven_days_ago.isoformat(),
    'q': 'andrew yang',
    'type': 'video',
    'maxResults': str(top_num),
    'key': youtube_api_key2
}

youtube_params_day = {
    'part': 'snippet',
    'order': 'viewCount',
    'publishedAfter': one_day_ago.isoformat(),
    'q': 'andrew yang',
    'type': 'video',
    'maxResults': str(top_num),
    'key': youtube_api_key2
}

youtube_params_3day = {
    'part': 'snippet',
    'order': 'viewCount',
    'publishedAfter': three_days_ago.isoformat(),
    'q': 'andrew yang',
    'type': 'video',
    'maxResults': str(top_num),
    'key': youtube_api_key2
}

youtube_params_all_time = {
    'part': 'snippet',
    'order': 'viewCount',
    'q': 'andrew yang',
    'type': 'video',
    'maxResults': str(top_num),
    'key': youtube_api_key2
}


def get_youtube_stat_params(vid_list):
    return {
        'part': 'contentDetails,statistics',
        'id': ','.join(vid_list),
        'key': youtube_api_key2
    }


# reddit job helper functions
def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except (TypeError, OverflowError):
        return False


def fetch_hot_reddit():
    reddit_items = [{k:v for k,v in vars(submission).items() if is_jsonable(v)} for submission in subreddit.hot(limit=top_num)]
    print('fetched new reddit items at {}'.format(datetime.now()))
    r.set('reddit', json.dumps(reddit_items))


def fetch_twitter():
    start = time.time()
    tweet_list = []
    s_timeline = api.user_timeline('AndrewYang', tweet_mode='extended')
    for tweet in s_timeline:
        j = tweet._json
        if j['in_reply_to_screen_name'] is None or j['in_reply_to_screen_name'] == 'AndrewYang':
            tweet_list.append(j)
            if len(tweet_list) == top_num_tweets:
                break
    r.set('twitter', json.dumps(tweet_list))
    end = time.time()
    print('fetched {} new twitter items at {} in {} seconds'.format(top_num, datetime.now(), end - start))


# # TODO: reset twitter list on server restart
# def fetch_twitter():
#     global since_id
#     print('{} tweets in redis currently before fetch job'.format(r.llen('twitter')))
#     s_timeline = api.user_timeline('AndrewYang', tweet_mode='extended', since_id=since_id)
#     if len(s_timeline) == 0:
#         print('no new entries to fetch at {}'.format(datetime.now()))
#         return
#     since_id = s_timeline[0]._json['id']
#     count = 0
#     for tweet in reversed(s_timeline): # need to reverse to go forward in time
#         j = tweet._json
#         if j['in_reply_to_screen_name'] is None or j['in_reply_to_screen_name'] == 'AndrewYang':
#             r.lpush('twitter', json.dumps(j))
#             count += 1
#     print('fetched {} new twitter items at {}'.format(count, datetime.now()))


# def fill_twitter(max_id):
#     b_timeline = tweepy.Cursor(api.user_timeline, screen_name='@AndrewYang',
#                                tweet_mode="extended", max_id=max_id).items()
#     count = 0
#     for tweet in b_timeline:
#         j = tweet._json
#         if j['in_reply_to_screen_name'] is None or j['in_reply_to_screen_name'] == 'AndrewYang':
#             r.rpush('twitter', json.dumps(j))
#             count += 1
#             if count % 50 == 0:
#                 print('backfilled {} filtered tweets into redis'.format(count))


def fetch_youtube(params, redis_key):
    try:
        initial_response = requests.get(url=youtube_url, params=params).json()
        response = initial_response['items']
        vid_ids = [x['id']['videoId'] for x in response]
        print('fetched new youtube items at {} using {} params'.format(datetime.now(), redis_key))
        view_counts = requests.get(url=youtube_vid_url,
                                   params=get_youtube_stat_params(vid_ids)).json()['items']
        for i in range(len(response)):
            response[i].update(view_counts[i])
        r.set(redis_key, json.dumps(response))
        print('set: {} with: {}'.format(redis_key, response[0]['statistics']))
    except:
        print('exception in getting video responses')
        print('error code: {}'.format(initial_response))
        traceback.print_exc()


# initial push
# start = time.time()
# timeline = api.user_timeline('AndrewYang', tweet_mode='extended')
# initial = timeline[:top_num]
# since_id = timeline[0]._json['id']
# max_id = timeline[-1]._json['id']

# initial_count = 0
# for tweet in initial:
#     j = tweet._json
#     if j['in_reply_to_screen_name'] is None or j['in_reply_to_screen_name'] == 'AndrewYang':
#         r.rpush('twitter', json.dumps(j))
#         initial_count += 1
# end = time.time()
#
# print("initially filled redis with {} tweets in {} seconds".format(initial_count, end-start))

scheduler = BackgroundScheduler()
scheduler.add_job(fetch_hot_reddit, 'interval', seconds=5, id='fetch_hot_reddit')
scheduler.add_job(fetch_twitter, 'interval', seconds=5, id='fetch_twitter')
scheduler.add_job(lambda: fetch_youtube(youtube_params, 'youtube'),
                  'interval', minutes=35, id='fetch_youtube')
scheduler.add_job(lambda: fetch_youtube(youtube_params_day, 'youtube_day'),
                  'interval', minutes=30, id='fetch_youtube_day')
scheduler.add_job(lambda: fetch_youtube(youtube_params_3day, 'youtube_3day'),
                  'interval', minutes=35, id='fetch_youtube_3day')
scheduler.add_job(lambda: fetch_youtube(youtube_params_all_time, 'youtube_all_time'),
                  'interval', minutes=60, id='fetch_youtube_all_time')

fetch_hot_reddit()
fetch_twitter()
fetch_youtube(youtube_params, 'youtube')
fetch_youtube(youtube_params_day, 'youtube_day')
fetch_youtube(youtube_params_3day, 'youtube_3day')
fetch_youtube(youtube_params_all_time, 'youtube_all_time')

scheduler.start()

# start back-filling after timed jobs begin
# fill_twitter(max_id)

while True:
    time.sleep(10)
