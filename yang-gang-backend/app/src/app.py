from flask import Flask
from flask_restplus import Api, Resource
from redis import Redis
import json

app = Flask(__name__)
api = Api(app=app, doc='/docs')
r = Redis(host='redis', port=6379)


@api.route("/hotreddit/")
class HotRedditList(Resource):
    def get(self):
        """
        returns a list of top_num reddit posts
        """
        return json.loads(r.get('reddit').decode('utf-8'))


@api.route("/tweets/")
class TweetList(Resource):
    def get(self):
        """
        returns a list of andrew yang tweets
        """
        return json.loads(r.get('twitter').decode('utf-8'))
