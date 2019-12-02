import * as ActionTypes from "./actionTypes";
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:5000");

export const connectSocket = () => {
  return dispatch => {
    socket.on("connect", rooms => {
      dispatch({
        type: ActionTypes.CONNECTED,
        rooms
      });
      dispatch(initializeChatListeners());
    });
  };
};

export const initializeChatListeners = () => {
  return dispatch => {
    socket.on("joined room", ({ room_id, messages }) => {
      dispatch({
        type: ActionTypes.ROOM_CONNECTED,
        roomId: room_id,
        messages
      });
    });

    socket.on("broadcast message", ({ message }) => {
      dispatch({
        type: ActionTypes.MESSAGE_RECEIVED,
        roomId: message.room_id,
        message
      });
    });
  };
};

export const connectRoom = roomId => {
  socket.emit("join", { room_id: roomId });
};

export const sendMessage = ({ userId, roomId, message }) => {
  socket.emit("send message", { user_id: userId, room_id: roomId, message });
};
