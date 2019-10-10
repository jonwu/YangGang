import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function theme(state = 0, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_THEME:
      return action.theme;
    default:
      return state;
  }
}

function expoId(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_EXPO_ID:
      return action.id;
    default:
      return state;
  }
}

function notifications(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTIFICATIONS:
      return action.notifications;
    default:
      return state;
  }
}

export default combineReducers({
  theme,
  expoId,
  notifications
});
