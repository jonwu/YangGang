from flask import Flask
from flask_restplus import Api, Resource
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from constants import reddit_fields, top_num
import praw
import atexit

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
    # for submission in subreddit.stream.submissions():  # for streaming (in the future)
    # FROM python:3.6-alpine
    reddit_items = [{field: vars(submission)[field] for field in reddit_fields} for submission in subreddit.hot(limit=top_num)]
    print('fetched new reddit items at {}'.format(datetime.now()))


scheduler = BackgroundScheduler()
scheduler.add_job(func=fetch_hot_reddit, trigger="interval", seconds=10)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())