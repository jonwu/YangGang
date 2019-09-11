import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";
import {
  newsPayload,
  youtubeAllTimePayload,
  youtubeDayPayload,
  redditPayload,
  tweetPayload
} from "utils/PayloadUtils";

function reddit(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_REDDIT:
      return redditPayload || actions.reddit;
    default:
      return state;
  }
}
function tweets(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_TWEETS:
      return tweetPayload || actions.tweets;
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
function youtubeDay(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_DAY:
      return youtubeDayPayload || actions.youtube;
    default:
      return state;
  }
}
function youtube3Days(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_3_DAYS:
      return actions.youtube;
    default:
      return state;
  }
}
function youtubeAllTime(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_ALL_TIME:
      return youtubeAllTimePayload || actions.youtube;
    default:
      return state;
  }
}

function news(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_NEWS:
      return newsPayload || actions.news;
    default:
      return state;
  }
}
export default combineReducers({
  reddit,
  tweets,
  youtube,
  youtubeDay,
  youtube3Days,
  youtubeAllTime,
  news
});
