import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function reddit(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_REDDIT:
      return actions.reddit;
    default:
      return state;
  }
}
function tweets(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_TWEETS:
      return actions.tweets;
    default:
      return state;
  }
}
function youtube(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE:
      return actions.youtube;
    default:
      return state;
  }
}
export default combineReducers({ reddit, tweets, youtube });
