from constants import *
import tweepy
import time
import json
from datetime import datetime


def fetch_twitter(api, r, candidate_name, screen_name):
    start = time.time()
    tweet_list = []
    s_timeline = tweepy.Cursor(api.user_timeline, screen_name=screen_name, tweet_mode="extended").items()
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
    redis_key = '{}_twitter'.format(candidate_name)
    r.set(redis_key, json.dumps(tweet_list))
    end = time.time()
    print('fetched {} new twitter items at {} in {} seconds, inserted into {}'.format(len(tweet_list),
                                                                                      datetime.now(),
                                                                                      end - start,
                                                                                      redis_key))
