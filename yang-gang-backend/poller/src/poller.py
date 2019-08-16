from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from redis import Redis
import praw
import json
import tweepy
import time


# initialize redis
r = Redis(host='redis', port=6379)


# constants
top_num = 50
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
    timeline = api.user_timeline('AndrewYang', tweet_mode='extended')
    print('fetched new twitter items at {}'.format(datetime.now()))
    r.set('twitter', json.dumps([x._json for x in timeline[:top_num]]))


scheduler = BackgroundScheduler()
scheduler.add_job(fetch_hot_reddit, 'interval', seconds=5, id='fetch_hot_reddit')
scheduler.add_job(fetch_twitter, 'interval', seconds=5, id='fetch_twitter')
scheduler.start()


while True:
    time.sleep(10)
