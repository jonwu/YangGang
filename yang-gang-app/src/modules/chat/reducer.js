import * as ActionTypes from "./actionTypes";
import { combineReducers } from "redux";

function isConnected(state = false, action) {
  switch (action.type) {
    case ActionTypes.CONNECTED:
      return true;
    case ActionTypes.DISCONNECTED:
      return false;
    default:
      return state;
  }
}

function rooms(state = [], action) {
  switch (action.type) {
    case ActionTypes.CONNECTED:
      return action.rooms;
    case ActionTypes.UPDATE_ROOM:
      if (!state.find(room => room.id === action.room.id)) {
        return [action.room, ...state];
      }
      return state.map(room => {
        return room.id === action.room.id ? action.room : room;
      });
    case ActionTypes.DISCONNECTED:
      return [];
    default:
      return state;
  }
}

function currentRoomId(state = null, action) {
  switch (action.type) {
    case ActionTypes.ROOM_JOINED:
      return action.roomId;
    case ActionTypes.DISCONNECTED:
      return null;
    default:
      return state;
  }
}

function messages(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ROOM_CONNECTED:
      return {
        ...state,
        [action.roomId]: action.messages
      };
    case ActionTypes.MESSAGE_RECEIVED:
      return {
        ...state,
        [action.roomId]: [action.message, ...state[action.roomId]]
      };
    case ActionTypes.DISCONNECTED:
      return {};
    default:
      return state;
  }
}
export default combineReducers({
  isConnected,
  rooms,
  currentRoomId,
  messages
});
