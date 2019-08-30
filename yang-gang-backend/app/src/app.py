from flask import Flask
from flask_restplus import Api, Resource
from redis import Redis
import json

app = Flask(__name__)
api = Api(app=app, doc='/docs')
r = Redis(host='redis', port=6379)
# r = Redis(host='localhost', port=6379) # for aws only!!


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
        # print('loaded {} tweets from redis'.format(r.llen('twitter')))
        # return [json.loads(x.decode('utf-8')) for x in r.lrange('twitter', 0, 30)]
        return json.loads(r.get('twitter').decode('utf-8'))


@api.route("/youtube/")
class YoutubeList(Resource):
    def get(self):
        """
        returns a list of recent andrew yang youtube videos
        """
        return json.loads(r.get('youtube').decode('utf-8'))


@api.route("/youtube_day/")
class YoutubeListDay(Resource):
    def get(self):
        """
        returns a list of recent andrew yang youtube videos today
        """
        return json.loads(r.get('youtube_day').decode('utf-8'))


@api.route("/youtube_3day/")
class YoutubeList3Day(Resource):
    def get(self):
        """
        returns a list of recent andrew yang youtube videos today
        """
        return json.loads(r.get('youtube_3day').decode('utf-8'))


@api.route("/youtube_all_time/")
class YoutubeListAllTime(Resource):
    def get(self):
        """
        returns a list of recent andrew yang youtube videos all time
        """
        return json.loads(r.get('youtube_all_time').decode('utf-8'))
