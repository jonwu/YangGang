from flask import Flask
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import requests
import traceback
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'

socketio = SocketIO(app)
print("server started")
headers = {'Content-type': 'application/json'}


@app.route('/ping')
def ping():
    return 'hello', 200


@socketio.on('connect')
def connect():
    try:
        rooms = requests.get('http://web/rooms').json()
        emit('after connect',  rooms)
    except:
        # TODO: figure out best practice for handling exceptions with emit
        traceback.print_exc()


@socketio.on("send message")
def send_message(data):
    try:
        room_id = data['room_id']
        payload = {'user_id': data['user_id'], 'message': data['message']}
        requests.post('http://web/rooms/{}/messages'.format(room_id), data=json.dumps(payload), headers=headers)
        emit("broadcast message", data, broadcast=True, room=room_id)
    except:
        traceback.print_exc()


@socketio.on('join')
def on_join(data):
    try:
        room_id = data['room_id']
        messages = requests.get('http://web/rooms/{}/messages'.format(room_id)).json()
        payload = {'room_id': room_id, 'messages': messages}
        join_room(room_id)
        print(payload)
        emit("joined room", payload, broadcast=True, room=room_id)
    except:
        traceback.print_exc()


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
