import * as ActionTypes from "./actionTypes";
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:5000", {
  transports: ["websocket"]
});

export const connectSocket = () => {
  return dispatch => {
    console.log("we are waiting for connect");
    dispatch(initializeChatListeners());
    socket.disconnect();
    socket.connect();
  };
};

export const initializeChatListeners = () => {
  return dispatch => {
    socket.on("after connect", rooms => {
      console.log("we have connected to the socket", rooms);
      dispatch({
        type: ActionTypes.CONNECTED,
        rooms
      });
    });

    socket.on("joined room", ({ room_id, messages }) => {
      console.log("Messages", messages, room_id);
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
      console.log("recieved the following message:", message);
      dispatch({
        type: ActionTypes.MESSAGE_RECEIVED,
        roomId: message.room_id,
        message
      });
    });
  };
};

export const connectRoom = roomId => {
  console.log("emitting the following payload:", { room_id: roomId });
  socket.emit("join", { room_id: roomId });
};

export const sendMessage = ({ userId, roomId, message }) => {
  socket.emit("send message", { user_id: userId, room_id: roomId, message });
};
