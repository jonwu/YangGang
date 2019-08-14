from flask import Flask
from flask_restplus import Api, Resource
from flask_apscheduler import APScheduler
from datetime import datetime
from constants import top_num
import praw
import json


class Config(object):
    JOBS = [
        {
            'id': 'fetch_hot_reddit',
            'func': 'app:fetch_hot_reddit',
            'args': (),
            'trigger': 'interval',
            'seconds': 5
        }
    ]

    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
api = Api(app=app, doc='/docs')
reddit = praw.Reddit(client_id='xuKSovdtrPCrOg',
                     client_secret='bwMxzy_4Ytpdj8P0VzMhuNeXTGE',
                     user_agent='yanggangtest',
                     username='sylla-bear',
                     password='pdZ4dF4V8Fbxd3L')
subreddit = reddit.subreddit('YangForPresidentHQ')
reddit_items = []


@api.route("/hotreddit/")
class HotRedditList(Resource):
    def get(self):
        """
        returns a list of top_num reddit posts
        """
        return reddit_items


def fetch_hot_reddit():
    global reddit_items

    reddit_items = [{k:v for k,v in vars(submission).items() if is_jsonable(v)} for submission in subreddit.hot(limit=top_num)]
    print('fetched new reddit items at {}'.format(datetime.now()))


def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except (TypeError, OverflowError):
        return False


@app.before_first_request
def init_scheduler():
    app.config.from_object(Config())

    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()
