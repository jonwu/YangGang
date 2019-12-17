import * as ActionTypes from "./actionTypes";
import SocketIOClient from "socket.io-client";
import { ROOT_URL } from "utils/BackendUtils";

const socket = SocketIOClient(`${ROOT_URL}:5000`, {
  transports: ["websocket"]
});

export const connectSocket = () => {
  return dispatch => {
    dispatch(initializeChatListeners());
    socket.disconnect();
    socket.connect();
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
        messages
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

export const connectRoom = roomId => {
  socket.emit("join", { room_id: roomId });
};

export const sendMessage = ({ userId, roomId, message }) => {
  console.log("Send Message", userId, roomId, message)
  socket.emit("send message", { user_id: userId, room_id: roomId, message });
};
