import * as ActionTypes from "./actionTypes";
import SocketIOClient from "socket.io-client";
import { ROOT_URL } from "utils/BackendUtils";

const socket = SocketIOClient(`${ROOT_URL}:5000`, {
  transports: ["websocket"]
});

export const connectSocket = () => {
  return dispatch => {
    return new Promise(resolve => {
      socket.disconnect();
      socket.removeAllListeners();
      socket.connect();
      dispatch(initializeChatListeners());
      socket.on("connect", () => {
        resolve();
      });
    });
  };
};

export const initializeChatListeners = () => {
  return dispatch => {
    socket.on("after connect", rooms => {
      dispatch({
        type: ActionTypes.CONNECTED,
        rooms: rooms
      });
    });

    socket.on("joined room", ({ room_id, messages }) => {
      dispatch({
        type: ActionTypes.ROOM_CONNECTED,
        roomId: room_id,
        messages: messages.reverse()
      });
    });

    socket.on("update room", room => {
      dispatch({
        type: ActionTypes.UPDATE_ROOM,
        room
      });
    });

    socket.on("broadcast message", message => {
      dispatch({
        type: ActionTypes.MESSAGE_RECEIVED,
        roomId: message.room_id,
        message
      });
    });
  };
};

export const connectRoom = roomId => (dispatch, getState) => {
  if (socket.connected) {
    socket.emit("join", { room_id: roomId });
  } else {
    dispatch(connectSocket()).then(() => {
      socket.emit("join", { room_id: roomId });
    });
  }
};

export const sendMessage = ({ userId, roomId, message }) => {
  socket.emit("send message", { user_id: userId, room_id: roomId, message });
};

export const updateRoom = room => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_ROOM,
    room
  });
  return Promise.resolve();
};
