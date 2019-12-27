import * as ActionTypes from "./actionTypes";
import SocketIOClient from "socket.io-client";
import { ROOT_URL } from "utils/BackendUtils";

let socket = null;
export const connectSocket = () => {
  return dispatch => {
    socket = SocketIOClient(`${ROOT_URL}:5000`, {
      transports: ["websocket"]
    });
    dispatch(initializeChatListeners(socket));
  };
};
export const disconnectSocket = () => {
  socket.disconnect();
  socket.removeAllListeners();
};

export const initializeChatListeners = () => {
  console.log("Initialize Chat Listeners");
  return (dispatch, getStore) => {
    socket.on("connect_timeout", timeout => {
      console.log("Connect Timeout", timeout);
    });
    socket.on("connect_error", error => {
      console.log("Connect Error", error);
    });

    socket.on("reconnect_error", error => {
      console.log("Reconnect Error", error);
    });

    socket.on("error", error => {
      console.log("Error", error);
    });

    socket.on("reconnect", attemptNumber => {
      console.log("on reconnect!", attemptNumber);
    });

    socket.on("connect", () => {
      const roomId = getStore().chat.currentRoomId;
      console.log("on connect roomId", roomId);
      if (roomId) connectRoom(roomId);
    });

    socket.on("after connect", rooms => {
      console.log("after connect rooms length", rooms.length);
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

export const connectRoom = roomId => {
  if (socket.connected) socket.emit("join", { room_id: roomId });
};

export const setCurrentRoomId = roomId => {
  return {
    type: ActionTypes.ROOM_JOINED,
    roomId
  };
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
