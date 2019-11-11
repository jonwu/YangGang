from constants import *
import json
import traceback

# reddit job helper functions
def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except (TypeError, OverflowError):
        return False


def fetch_hot_reddit(subreddit, r, candidate_name):
    try:
        reddit_items = [{k:v for k,v in vars(submission).items() if k in reddit_fields and is_jsonable(v)} for submission in subreddit.hot(limit=top_num)]
        redis_key = '{}_reddit'.format(candidate_name)
        r.set(redis_key, json.dumps(reddit_items))
    except:
        traceback.print_exc()
