from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, leave_room, send, emit


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db'
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'

socketio = SocketIO(app)


@socketio.on("send message")
def message(data):
    print(data)
    username = data['username']
    room = data['room']
    emit("broadcast message",  {"username": username, "message": message}, broadcast=True, room=room)


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


if __name__ == '__main__':
    socketio.run(app, port=5000)
