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
      console.log("DISPATHC TO ME!!!!", action.id);
      return action.id;
    default:
      return state;
  }
}

export default combineReducers({
  theme,
  expoId
});
