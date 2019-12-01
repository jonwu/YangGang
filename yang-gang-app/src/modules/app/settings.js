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

function user(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
export default combineReducers({
  theme,
  expoId,
  user
});
