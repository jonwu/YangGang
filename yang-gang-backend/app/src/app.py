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
import requests


def is_exponent_push_token(token):
    """Returns `True` if the token is an Exponent push token"""
    import six

    return (
            isinstance(token, six.string_types) and
            token.startswith('ExponentPushToken'))


# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(tokens, message, data=None):
    try:
        print('sending message for tokens {}'.format(tokens))
        message_list = [PushMessage(to=token, body=message, data=data) for token in tokens]
        responses = PushClient().publish_multiple(message_list)
        print('response: {}'.format(responses))
    except PushServerError as e:
        print('PushServerError detailed message: {}'.format(e.errors))
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
        for response in responses:
            response.validate_response()
    except DeviceNotRegisteredError:
        pass # TODO: handle this case
    except PushResponseError as exc:
        # Encountered some other per-notification error.
        traceback.print_exc()


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db?charset=utf8mb4'

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


event_json = api.model('Event Model', {
    'title': fields.String,
    'image': fields.String,
    'event_type': fields.String,
    'line1': fields.String,
    'line2': fields.String,
    'event_date': fields.DateTime,
    'link': fields.String,
})

message_json = api.model('Push Message Model', {
    'body': fields.String,
    'data': fields.String,
})

# {
#   tag: string,
#   title: string,
#   link: link,
#   owner_id: owner_id,
# }

device_id_json = api.model('Create User Model', {
    'device_token': fields.String,
})

room_json = api.model('Room Model', {
    'owner_id': fields.Integer,
    'title': fields.String,
    'tag': fields.String,
    'link': fields.String,
})

chat_message_json = api.model('Chat Model', {
    'user_id': fields.Integer,
    'message': fields.String
})

user_json = api.model('Modify User Model', {
    'device_token': fields.String,
    'username': fields.String,
    'avatar_color': fields.String
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
        try:
            message = request.get_json()
            print('payload for push received: {}'.format(message))
            room = message['data']
            room_schema = RoomSchema()
            new_room = room_schema.load(room, session=db.session, partial=True)
            db.session.add(new_room)
            db.session.commit()
            requests.post('http://socket:5000/updateroom', json=room_schema.dump(new_room))
            push_list = [push_id.id for push_id in PushIds.query.all() if is_exponent_push_token(push_id.id)]
            print('number of total push_ids: {}'.format(len(push_list)))
            increment = 100
            i = 0
            try:
                while i < len(push_list):
                    send_push_message(push_list[i: i + increment], message['body'], room_schema.dump(new_room))
                    i += increment
                return 'success, pushed a total of {} messages'.format(len(push_list)), 200
            except Exception as e:
                traceback.print_exc()
                abort(404, 'internal server error at batch {}: {}'.format(i / increment, str(e)))
        except Exception as e:
            traceback.print_exc()
            abort(404, 'internal server error: {}'.format(str(e)))


@api.route('/user/<int:user_id>')
class UserApi(Resource):
    def get(self, user_id):
        try:
            user = User.query.filter(User.id == user_id).one_or_none()
            user_schema = UserSchema()
            return user_schema.dump(user)
        except:
            traceback.print_exc()

    @api.expect(user_json)
    def put(self, user_id):
        try:
            user = User.query.filter(User.id == user_id).one_or_none()
            if user is None:
                abort(
                    404,
                    "user not found for id: {user_id}".format(user_id=user_id),
                )

            new_fields = request.get_json()
            user_schema = UserSchema()
            update = user_schema.load(new_fields, instance=User().query.get(user_id), partial=True)

            # merge the new object into the old and commit it to the db
            db.session.merge(update)
            db.session.commit()
            data = user_schema.dump(update)

            return data, 200
        except:
            traceback.print_exc()


@api.route('/user')
class PostUserApi(Resource):
    @api.expect(device_id_json)
    def post(self):
        user_json = request.get_json()
        user = User.query.filter(User.device_token == user_json['device_token']).one_or_none()
        user_schema = UserSchema()
        if user is not None:
            print("found existing user")
            return user_schema.dump(user)
        try:
            user = user_schema.load(user_json, session=db.session, partial=True)
            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user)
        except Exception as e:
            traceback.print_exc()
            abort(404, str(e))


@api.route('/getroom/<string:room_id>')
class GetRoomApi(Resource):
    def get(self, room_id):
        room = Room.query.filter(Room.id == room_id).one_or_none()
        room_schema = RoomSchema()
        return room_schema.dump(room)


@api.route('/rooms')
class RoomApi(Resource):
    def get(self):
        rooms = Room.query.order_by(Room.created_date.desc()).limit(15).all()
        room_schema = RoomSchema(many=True)
        return room_schema.dump(rooms)

    @api.expect(room_json)
    def post(self):
        try:
            room = request.get_json()
            room_schema = RoomSchema()
            new_room = room_schema.load(room, session=db.session, partial=True)
            db.session.add(new_room)
            db.session.commit()
            sio.emit('update room', room_schema.dump(new_room))
            return room_schema.dump(new_room), 200
        except Exception as e:
            traceback.print_exc()
            abort(404, 'internal server error: {}'.format(str(e)))


@api.route('/rooms/<string:room_id>')
class RoomApi(Resource):
    def delete(self, room_id):
        room = Room.query.filter(Room.id == room_id).one_or_none()

        # Did we find a room?
        if room is not None:
            db.session.delete(room)
            db.session.commit()
            return make_response(
                "room {room_id} deleted".format(room_id=room_id), 200
            )
        else:
            abort(
                404,
                "room not found for id: {room_id}".format(room_id=room_id),
            )

    @api.expect(room_json)
    def put(self, room_id):
        new_fields = request.get_json()
        room = Room.query.filter(Room.id == room_id).one_or_none()

        if room is None:
            abort(
                404,
                "room not found for id: {room_id}".format(room_id=room_id),
            )

        room_schema = RoomSchema()
        update = room_schema.load(new_fields, instance=Room().query.get(room_id), partial=True)

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()
        data = room_schema.dump(update)

        return data, 200


@api.route('/rooms/<string:room_id>/messages')
class MessageApi(Resource):
    def get(self, room_id):
        messages = Message.query.filter(Message.room_id == room_id).all()
        message_schema = MessageSchema(many=True)

        return message_schema.dump(messages)

    @api.expect(chat_message_json)
    def post(self, room_id):
        try:
            message = request.get_json()
            message_schema = MessageSchema()
            room_schema = RoomSchema()
            room = Room.query.filter(Room.id == room_id).one_or_none()
            room.message_count += 1
            requests.post('http://socket:5000/updateroom', json=room_schema.dump(room))
            new_message = message_schema.load(message, session=db.session, partial=True)
            new_message.room_id = room_id
            db.session.add(new_message)
            db.session.commit()
            return message_schema.dump(new_message), 200
        except Exception as e:
            traceback.print_exc()
            abort(404, 'internal server error: {}'.format(str(e)))


@api.route("/simplepush/<string:expo_id>")
class SimplePushApi(Resource):
    def post(self, expo_id):
        try:
            push_id = PushIds.query.filter(PushIds.id == expo_id).one_or_none()
            if push_id is not None:
                return 'id already exists', 200
            push_object = PushIds(id=expo_id)
            db.session.add(push_object)
            db.session.commit()
            return 'added id {} to database'.format(expo_id), 200
        except Exception as e:
            traceback.print_exc()
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


@api.route('/instagram/')
@api.route("/instagram/<string:candidate_name>")
class InstagramList(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of top_num instagram posts
        """
        redis_key = '{}_instagram'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/hotreddit/")
@api.route("/hotreddit/<string:candidate_name>")
class HotRedditList(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of top_num reddit posts
        """

        redis_key = '{}_reddit'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/news/")
@api.route("/news/<string:candidate_name>")
class NewsList(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of news posts
        """
        redis_key = '{}_news'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/tweets/")
@api.route("/tweets/<string:candidate_name>")
class TweetList(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of andrew yang tweets
        """
        redis_key = '{}_twitter'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/youtube/")
@api.route("/youtube/<string:candidate_name>")
class YoutubeList(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of recent andrew yang youtube videos
        """
        redis_key = '{}_youtube'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/youtube_day/")
@api.route("/youtube_day/<string:candidate_name>")
class YoutubeListDay(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of recent andrew yang youtube videos today
        """
        redis_key = '{}_youtube_day'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/youtube_3day/")
@api.route("/youtube_3day/<string:candidate_name>")
class YoutubeList3Day(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of recent andrew yang youtube videos today
        """
        redis_key = '{}_youtube_3day'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


@api.route("/youtube_all_time/")
@api.route("/youtube_all_time/<string:candidate_name>")
class YoutubeListAllTime(Resource):
    def get(self, candidate_name='andrew_yang'):
        """
        returns a list of recent andrew yang youtube videos all time
        """
        redis_key = '{}_youtube_all_time'.format(candidate_name)
        return json.loads(r.get(redis_key).decode('utf-8'))


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


class Message(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')
    room_id = db.Column(db.Integer)
    message = db.Column(db.Text())


class Room(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    owner_id = db.Column(db.Integer)
    title = db.Column(db.Text())
    link = db.Column(db.Text())
    tag = db.Column(db.Text())
    message_count = db.Column(db.Integer, default=0)


class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    username = db.Column(db.String(128))
    device_token = db.Column(db.String(100))
    avatar_color = db.Column(db.Text())


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        sqla_session = db.session


class RoomSchema(ma.ModelSchema):
    class Meta:
        model = Room
        sqla_session = db.session


class MessageSchema(ma.ModelSchema):
    class Meta:
        include_fk = True
        model = Message
        sqla_session = db.session

    user = ma.Nested(UserSchema(only=("username", "avatar_color")))


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
    num_followers_gabbard = db.Column(db.Integer)
    num_followers_trump = db.Column(db.Integer)

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
    num_followers_gabbard = db.Column(db.Integer)
    num_followers_trump = db.Column(db.Integer)

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
    num_followers_gabbard = db.Column(db.Integer)

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



