import * as ActionTypes from "./actionTypes";
import BackendUtils from "utils/BackendUtils";

export function updateTheme(theme) {
  return {
    type: ActionTypes.UPDATE_THEME,
    theme
  };
}

export function updateReddit() {
  return dispatch => {
    return BackendUtils.getReddit().then(response => {
      const reddit = response.data.filter(item => !item.stickied);
      dispatch({
        type: ActionTypes.UPDATE_REDDIT,
        reddit
      });
    });
  };
}
export function updateTweets() {
  return dispatch => {
    return BackendUtils.getTwitter().then(response => {
      const tweets = response.data;
      dispatch({
        type: ActionTypes.UPDATE_TWEETS,
        tweets
      });
    });
  };
}
export function updateYoutube() {
  return dispatch => {
    return BackendUtils.getYoutube().then(response => {
      const youtube = response.data;
      dispatch({
        type: ActionTypes.UPDATE_YOUTUBE,
        youtube
      });
    });
  };
}
export function updateYoutubeDay() {
  return dispatch => {
    return BackendUtils.getYoutubeDay().then(response => {
      const youtube = response.data;
      dispatch({
        type: ActionTypes.UPDATE_YOUTUBE_DAY,
        youtube
      });
    });
  };
}
export function updateYoutubeAllTime() {
  return dispatch => {
    return BackendUtils.getYoutubeAllTime().then(response => {
      const youtube = response.data;
      dispatch({
        type: ActionTypes.UPDATE_YOUTUBE_ALL_TIME,
        youtube
      });
    });
  };
}
