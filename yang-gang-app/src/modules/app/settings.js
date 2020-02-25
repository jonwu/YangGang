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
function openCount(state = 0, action) {
  switch (action.type) {
    case ActionTypes.ITERATE_OPEN_COUNT:
      return state + 1;
    default:
      return state;
  }
}

function onboards(state = { donation: false, source: false }, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_ONBOARD:
      return { ...state, [actions.key]: true };
    default:
      return state;
  }
}

function defaultCandidate(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CANDIDATE:
      return action.candidate;
    default:
      return state;
  }
}
export default combineReducers({
  theme,
  expoId,
  user,
  openCount,
  onboards,
  defaultCandidate
});
