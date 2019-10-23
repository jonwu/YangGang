from flask import Flask, abort, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restplus import Api, Resource, fields
from flask_marshmallow import Marshmallow
from datetime import date, timedelta
from redis import Redis
import json
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
import traceback


# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
        print('response for token {}: {}'.format(token, response))
    except PushServerError:
        # Encountered some likely formatting/validation error.
        traceback.print_exc()
        return
    except (ConnectionError, HTTPError):
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        traceback.print_exc()
        return
    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        pass # TODO: handle this case
    except PushResponseError as exc:
        # Encountered some other per-notification error.
        traceback.print_exc()


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db'

api = Api(app=app, doc='/docs')
r = Redis(host='redis', port=6379)
# r = Redis(host='localhost', port=6379) # for aws only!!

db = SQLAlchemy(app)
ma = Marshmallow(app)


@api.route('/notifications/<int:event_id>/<string:expo_id>')
class NotificationsApi(Resource):
    def post(self, event_id, expo_id):
        try:
            notification = PushNotifications(event_id=event_id, expo_id=expo_id)
            db.session.add(notification)
            db.session.commit()
            return make_response("successfully saved", 201)
        except Exception as e:
            abort(404, str(e))

    def delete(self, event_id, expo_id):
        notification = PushNotifications.query.filter(PushNotifications.event_id == event_id).\
            filter(PushNotifications.expo_id == expo_id).one_or_none()

        if notification is not None:
            db.session.delete(notification)
            db.session.commit()
            return make_response(
                "notification for event: {event_id}, expo_id: {expo_id} deleted".format(event_id=event_id,
                                                                                        expo_id=expo_id), 200
            )

        else:
            abort(
                404,
                "notification not found for event: {event_id}, expo_id: {expo_id} deleted".format(event_id=event_id,
                                                                                                  expo_id=expo_id),
            )


@api.route('/usernotifications/<string:expo_id>')
class AllNotificationsForUser(Resource):
    def get(self, expo_id):
        notifications = PushNotifications.query.filter(PushNotifications.expo_id == expo_id).order_by(PushNotifications.created_date).all()
        notifications_schema = PushNotifcationsSchema(many=True)
        return notifications_schema.dump(notifications)


event_json = api.model('Resource', {
    'title': fields.String,
    'image': fields.String,
    'event_type': fields.String,
    'line1': fields.String,
    'line2': fields.String,
    'event_date': fields.DateTime,
    'link': fields.String,
})

message_json = api.model('Resource', {
    'body': fields.String,
    'data': fields.String
})


@api.route("/getpush/")
class SimpleGetPushApi(Resource):
    def get(self):
        ids = PushIds.query.all()
        # Serialize the data for the response
        push_schema = PushIdsSchema(many=True)
        return push_schema.dump(ids)

    @api.expect(message_json)
    def post(self):
        message = request.get_json()
        ids = PushIds.query.all()
        for push_id in ids:
            send_push_message(push_id.id, message['body'])


@api.route("/simplepush/<string:expo_id>")
class SimplePushApi(Resource):
    def post(self, expo_id):
        try:
            push_object = PushIds(id=expo_id)
            db.session.add(push_object)
            db.session.commit()
            return 'added id {} to database'.format(expo_id), 200
        except Exception as e:
            abort(404, 'internal server error: {}'.format(str(e)))


@api.route("/allevents/")
class AllEventsApi(Resource):
    def get(self):
        events = Events.query.order_by(Events.event_date).all()
        # Serialize the data for the response
        events_schema = EventsSchema(many=True)
        return events_schema.dump(events)

    @api.expect(event_json)
    def post(self):
        try:
            event = request.get_json()
            print("this is my new event: {}, of type: {}".format(event, type(event)))

            schema = EventsSchema()
            new_event = schema.load(event, session=db.session)

            db.session.add(new_event)
            db.session.commit()

            return schema.dump(new_event), 201
        except Exception as e:
            import traceback
            traceback.print_exc()
            abort(404, 'internal server error: {}'.format(str(e)))


@api.route('/event/<int:id_string>')
class EventApi(Resource):
    def get(self, id_string):
        event = Events.query.filter(Events.id == id_string).one_or_none()

        if event is not None:
            # Serialize the data for the response
            events_schema = EventsSchema()
            return events_schema.dump(event)

        else:
            abort(404, 'Event not found for Id: {}'.format(id_string))

    def delete(self, id_string):
        event = Events.query.filter(Events.id == id_string).one_or_none()

        # Did we find a person?
        if event is not None:
            db.session.delete(event)
            db.session.commit()
            return make_response(
                "event {id_string} deleted".format(id_string=id_string), 200
            )

        # Otherwise, nope, didn't find that person
        else:
            abort(
                404,
                "event not found for Id: {id_string}".format(id_string=id_string),
            )

    @api.expect(event_json)
    def put(self, id_string):
        new_fields = request.get_json()
        event = Events.query.filter(Events.id == id_string).one_or_none()

        if event is None:
            abort(
                404,
                "event not found for Id: {id_string}".format(id_string=id_string),
            )

        events_schema = EventsSchema()
        update = events_schema.load(new_fields, instance=Events().query.get(id_string), partial=True)

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()

        # return updated person in the response
        data = events_schema.dump(update)

        return data, 200


@api.route("/instagram/")
class InstagramList(Resource):
    def get(self):
        """
        returns a list of top_num instagram posts
        """
        return json.loads(r.get('instagram').decode('utf-8'))


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
        returns a twitter stats from the past two days for all candidates
        """
        return [x.as_dict() for x in get_recent_data(2, TwitterStats)]


@api.route("/instagram_stats/")
class InstagramStatsApi(Resource):
    def get(self):
        """
        returns a twitter stats from the past two days for all candidates
        """
        return [x.as_dict() for x in get_recent_data(2, InstagramStats)]


@api.route("/reddit_stats/")
class RedditStatsApi(Resource):
    def get(self):
        """
        returns a twitter stats from the past two days for all candidates
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


class PushIds(db.Model):
    __tablename__ = "push_ids"

    id = db.Column(db.String(1024), primary_key=True, autoincrement=False)


class PushIdsSchema(ma.ModelSchema):
    class Meta:
        model = PushIds
        sqla_session = db.session


class Events(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    title = db.Column(db.Text())
    event_type = db.Column(db.Text())
    line1 = db.Column(db.Text())
    line2 = db.Column(db.Text())
    image = db.Column(db.Text())
    event_date = db.Column(db.DateTime())
    link = db.Column(db.Text())


class EventsSchema(ma.ModelSchema):
    class Meta:
        model = Events
        sqla_session = db.session


class PushNotifications(db.Model):
    __tablename__ = "push_notifications"

    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    expo_id = db.Column(db.Text())
    event_id = db.Column(db.Integer)
    error_message = db.Column(db.Text())
    num_retries = db.Column(db.Integer, default=0)
    __table_args__ = (db.UniqueConstraint('expo_id', 'event_id', name='_expo_id_event_id_uc'),)


class PushNotifcationsSchema(ma.ModelSchema):
    class Meta:
        model = PushNotifications
        sqla_session = db.session


def get_recent_data(num_days, table):
    start = date.today() - timedelta(days=num_days)
    return table.query.filter(table.id >= start).all()



