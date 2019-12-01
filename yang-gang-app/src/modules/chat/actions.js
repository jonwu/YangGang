import * as ActionTypes from "./actionTypes";

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
    socket.on("joined room", (roomId, messages) => {
      dispatch({
        type: ActionTypes.ROOM_CONNECTED,
        roomId,
        messages
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

export const connectRoom = (userId, roomId) => {
  socket.emit("join", { userId, roomId });
};

export const sendMessage = ({ userId, roomId, message }) => {
  socket.emit("send message", { userId, roomId, message });
};
