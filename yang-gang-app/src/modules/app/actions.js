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
      const tweets = response.data.filter(
        item =>
          item.in_reply_to_status_id === null ||
          item.in_reply_to_screen_name === "AndrewYang"
      );

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
      console.log(response.data);
      const youtube = response.data.items;
      dispatch({
        type: ActionTypes.UPDATE_YOUTUBE,
        youtube
      });
    });
  };
}
