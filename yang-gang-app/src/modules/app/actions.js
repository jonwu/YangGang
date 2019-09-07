import * as ActionTypes from "./actionTypes";
import BackendUtils from "utils/BackendUtils";
import { load } from "modules/loading/actions";
import lodash from "lodash";
import moment from "moment";

export function updateTheme(theme) {
  return {
    type: ActionTypes.UPDATE_THEME,
    theme
  };
}

export function updateReddit() {
  return dispatch => {
    return dispatch(
      load(
        "reddit",
        BackendUtils.getReddit().then(response => {
          const reddit = response.data;
          dispatch({
            type: ActionTypes.UPDATE_REDDIT,
            reddit
          });
          return reddit;
        })
      )
    );
  };
}
export function updateTweets() {
  return dispatch => {
    return dispatch(
      load(
        "tweets",
        BackendUtils.getTwitter().then(response => {
          const tweets = response.data;
          dispatch({
            type: ActionTypes.UPDATE_TWEETS,
            tweets
          });
          return tweets;
        })
      )
    );
  };
}
export function updateYoutube() {
  return dispatch => {
    return dispatch(
      load(
        "youtube",
        BackendUtils.getYoutube().then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutubeDay() {
  return dispatch => {
    return dispatch(
      load(
        "youtubeDay",
        BackendUtils.getYoutubeDay().then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_DAY,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutube3Days() {
  return dispatch => {
    return dispatch(
      load(
        "youtube3Days",
        BackendUtils.getYoutube3Days().then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_3_DAYS,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutubeAllTime() {
  return dispatch => {
    return dispatch(
      load(
        "youtubeAllTime",
        BackendUtils.getYoutubeAllTime().then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_ALL_TIME,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateNews() {
  return dispatch => {
    return dispatch(
      load(
        "news",
        BackendUtils.getNews().then(response => {
          const news = lodash.uniqBy(response.data.articles, "title");
          news.sort((a, b) => {
            return (
              moment(a.publishedAt).format("Y-M-D") <
              moment(b.publishedAt).format("Y-M-D")
            );
          });
          dispatch({
            type: ActionTypes.UPDATE_NEWS,
            news
          });
          return news;
        })
      )
    );
  };
}
