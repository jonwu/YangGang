from flask import Flask
from flask_sqlalchemy import SQLAlchemy, inspect
from flask_restplus import Api, Resource
from datetime import date, timedelta
from redis import Redis
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db'

api = Api(app=app, doc='/docs')
r = Redis(host='redis', port=6379)
# r = Redis(host='localhost', port=6379) # for aws only!!

db = SQLAlchemy(app)


@api.route("/hotreddit/")
class HotRedditList(Resource):
    def get(self):
        """
        returns a list of top_num reddit posts
        """
        return json.loads(r.get('reddit').decode('utf-8'))


@api.route("/news/")
class NewsList(Resource):
    def get(self):
        """
        returns a list of news posts
        """
        return json.loads(r.get('news').decode('utf-8'))


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


@api.route("/twitter_stats/")
class TwitterStatsApi(Resource):
    def get(self):
        """
        returns a twitter stats from the past day for all candidates
        """
        return [x.as_dict() for x in get_recent_data(2, TwitterStats)]


@api.route("/instagram_stats/")
class InstagramStatsApi(Resource):
    def get(self):
        """
        returns a twitter stats from the past day for all candidates
        """
        return [x.as_dict() for x in get_recent_data(2, InstagramStats)]


@api.route("/reddit_stats/")
class RedditStatsApi(Resource):
    def get(self):
        """
        returns a twitter stats from the past day for all candidates
        """
        return [x.as_dict() for x in get_recent_data(2, RedditStats)]


class TwitterStats(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "twitter_stats"

    id = db.Column(db.DateTime, primary_key=True, autoincrement=False)
    num_followers_yang = db.Column(db.Integer)
    num_followers_sanders = db.Column(db.Integer)
    num_followers_warren = db.Column(db.Integer)
    num_followers_buttigieg = db.Column(db.Integer)
    num_followers_biden = db.Column(db.Integer)
    num_followers_kamala = db.Column(db.Integer)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class InstagramStats(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "instagram_stats"

    id = db.Column(db.DateTime, primary_key=True, autoincrement=False)
    num_followers_yang = db.Column(db.Integer)
    num_followers_sanders = db.Column(db.Integer)
    num_followers_warren = db.Column(db.Integer)
    num_followers_buttigieg = db.Column(db.Integer)
    num_followers_biden = db.Column(db.Integer)
    num_followers_kamala = db.Column(db.Integer)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class RedditStats(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "reddit_stats"

    id = db.Column(db.DateTime, primary_key=True, autoincrement=False)
    num_followers_yang = db.Column(db.Integer)
    num_followers_sanders = db.Column(db.Integer)
    num_followers_warren = db.Column(db.Integer)
    num_followers_buttigieg = db.Column(db.Integer)
    num_followers_kamala = db.Column(db.Integer)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


def get_recent_data(num_days, table):
    start = date.today() - timedelta(days=num_days)
    return table.query.filter(table.id >= start).all()



