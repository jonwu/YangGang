from flask import Flask
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import traceback


app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db'

db = SQLAlchemy(app)
ma = Marshmallow(app)
print("server started")
headers = {'Content-type': 'application/json'}


@app.route('/ping')
def ping():
    return 'hello', 200


@socketio.on('connect')
def connect():
    try:
        print("somebody is trying to connect")
        rooms = Room.query.order_by(Room.created_date.desc()).limit(15).all()
        room_schema = RoomSchema(many=True)
        emit('after connect',  room_schema.dump(rooms))
    except:
        # TODO: figure out best practice for handling exceptions with emit
        traceback.print_exc()


@socketio.on("send message")
def send_message(data):
    try:
        room_id = data['room_id']
        message = {'user_id': data['user_id'], 'message': data['message']}
        try:
            message_schema = MessageSchema()
            room_schema = RoomSchema()
            room = Room.query.filter(Room.id == room_id).one_or_none()
            room.message_count += 1
            emit("update room", room_schema.dump(room), broadcast=True)
            new_message = message_schema.load(message, session=db.session, partial=True)
            new_message.room_id = room_id
            db.session.add(new_message)
            db.session.commit()
            emit("broadcast message", message_schema.dump(new_message), broadcast=True, room=room_id)
        except Exception:
            traceback.print_exc()
    except:
        traceback.print_exc()


@socketio.on("update room")
def update_room(data):
    try:
        print("emitting: {} to all".format(data))
        emit("update room", data, broadcast=True)
    except:
        traceback.print_exc()


@socketio.on('join')
def on_join(data):
    try:
        room_id = data['room_id']
        messages = Message.query.filter(Message.room_id == room_id).all()
        message_schema = MessageSchema(many=True)
        payload = {'room_id': room_id, 'messages': message_schema.dump(messages)}
        join_room(room_id)
        emit("joined room", payload, broadcast=True, room=room_id)
    except:
        traceback.print_exc()


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


@socketio.on('disconnect')
def disconnect():
    print('jon has disconnected')


class Message(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime(), server_default=db.func.current_timestamp())
    user_id = db.Column(db.Integer)
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
        model = Message
        sqla_session = db.session


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
