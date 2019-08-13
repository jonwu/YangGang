from flask import Flask
from flask_restplus import Api, Resource
from constants import reddit_fields, top_num
import praw
import json

app = Flask(__name__)
api = Api(app=app, doc='/docs')


@api.route("/topreddit/")
class TopRedditList(Resource):
    def get(self):
        """
        returns a list of top_num reddit posts
        """
        reddit = praw.Reddit(client_id='xuKSovdtrPCrOg',
                             client_secret='bwMxzy_4Ytpdj8P0VzMhuNeXTGE',
                             user_agent='yanggangtest',
                             username='sylla-bear',
                             password='pdZ4dF4V8Fbxd3L')
        subreddit = reddit.subreddit('YangForPresidentHQ')
        items = []

        # for submission in subreddit.stream.submissions():  # for streaming (in the future)
        for submission in subreddit.hot(limit=top_num):
            to_dict = vars(submission)
            sub_dict = {field: to_dict[field] for field in reddit_fields}
            items.append(sub_dict)
        return items