import * as ActionTypes from "./actionTypes";
import BackendUtils from "utils/BackendUtils";
import { load } from "modules/loading/actions";
import lodash from "lodash";
import moment from "moment";
import * as Amplitude from "expo-analytics-amplitude";
import {
  EVENT_FETCH_YOUTUBE,
  EVENT_FETCH_REDDIT,
  EVENT_FETCH_TWITTER,
  EVENT_FETCH_INSTAGRAM,
  EVENT_FETCH_NEWS
} from "utils/AnalyticsUtils";

export function updateTheme(theme) {
  return {
    type: ActionTypes.UPDATE_THEME,
    theme
  };
}

export function updateAllYoutubes() {
  Amplitude.logEvent(EVENT_FETCH_YOUTUBE);
  return dispatch => {
    return dispatch(
      load(
        "fetchYoutube",
        Promise.all([
          dispatch(updateYoutube()),
          dispatch(updateYoutubeDay()),
          dispatch(updateYoutube3Days()),
          dispatch(updateYoutubeAllTime())
        ])
      )
    );
  };
}

export function updateReddit() {
  Amplitude.logEvent(EVENT_FETCH_REDDIT);
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "reddit",
        BackendUtils.getReddit(candidate).then(response => {
          const reddit = response.data.filter(item => {
            return !item.stickied || item.score > 100;
          });

          dispatch({
            type: ActionTypes.UPDATE_REDDIT,
            candidate,
            reddit
          });
          return reddit;
        })
      )
    );
  };
}

export function updateTweets() {
  Amplitude.logEvent(EVENT_FETCH_TWITTER);
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "tweets",
        BackendUtils.getTwitter(candidate).then(response => {
          const tweets = response.data;
          dispatch({
            type: ActionTypes.UPDATE_TWEETS,
            candidate,
            tweets
          });
          return tweets;
        })
      )
    );
  };
}
export function updateYoutube() {
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "youtube",
        BackendUtils.getYoutube(candidate).then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE,
            candidate,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutubeDay() {
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "youtubeDay",
        BackendUtils.getYoutubeDay(candidate).then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_DAY,
            candidate,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutube3Days() {
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "youtube3Days",
        BackendUtils.getYoutube3Days(candidate).then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_3_DAYS,
            candidate,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateYoutubeAllTime() {
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "youtubeAllTime",
        BackendUtils.getYoutubeAllTime(candidate).then(response => {
          const youtube = response.data;
          dispatch({
            type: ActionTypes.UPDATE_YOUTUBE_ALL_TIME,
            candidate,
            youtube
          });
          return youtube;
        })
      )
    );
  };
}
export function updateInstagram() {
  Amplitude.logEvent(EVENT_FETCH_INSTAGRAM);
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "instagram",
        BackendUtils.getInstagram(candidate).then(response => {
          const data = response.data;
          const instagram = data.filter(i => {
            if (i.actual_url != null) {
              return !i.actual_url.includes("null");
            }
            return true;
          });
          dispatch({
            type: ActionTypes.UPDATE_INSTAGRAM,
            candidate,
            instagram
          });
          return instagram;
        })
      )
    );
  };
}

export function updateNews() {
  Amplitude.logEvent(EVENT_FETCH_NEWS);
  return (dispatch, getState) => {
    const { candidate } = getState().app;
    return dispatch(
      load(
        "news",
        BackendUtils.getNews(candidate).then(response => {
          const news = lodash.uniqBy(response.data.articles, "title");
          news.sort((a, b) => {
            return (
              moment(a.publishedAt).format("Y-MM-DD") <
              moment(b.publishedAt).format("Y-MM-DD")
            );
          });
          dispatch({
            type: ActionTypes.UPDATE_NEWS,
            candidate,
            news
          });
          return news;
        })
      )
    );
  };
}

export function updateShowMoneyModal(show) {
  return { type: ActionTypes.UPDATE_MONEY_MODAL, show };
}

export function updateExpoId(id) {
  return (dispatch, getState) => {
    return BackendUtils.postNotifications(id).then(() => {
      dispatch({ type: ActionTypes.UPDATE_EXPO_ID, id });
      return id;
    });
    // if (getState().settings.expoId === id)
    //   return new Promise(resolve => resolve());
    // return BackendUtils.postNotifications(id)
    //   .then(() => {
    //     dispatch({ type: ActionTypes.UPDATE_EXPO_ID, id });
    //     return id;
    //   })
    //   .catch(() => {
    //     BackendUtils.getNotifications().then(response => {
    //       const hasData = response.data.find(data => data.id === id);
    //       if (hasData) {
    //         dispatch({ type: ActionTypes.UPDATE_EXPO_ID, id });
    //       }
    //     });
    //   });
  };
}

export function getLastUpdate() {
  return (dispatch, getState) => {
    return getState().loading.tweets.lastUpdated;
  };
}
export function updateCandidate(candidate) {
  return (dispatch, getState) => {
    return dispatch({ type: ActionTypes.UPDATE_CANDIDATE, candidate });
  };
}

export function postUser(device_token) {
  return (dispatch, getState) => {
    BackendUtils.postUser({ device_token })
      .then(response => {
        const user = response.data;
        return dispatch({ type: ActionTypes.UPDATE_USER, user });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateModal(key, show) {
  return { type: ActionTypes.UPDATE_MODAL, key, show };
}

export function updateUser(params) {
  return (dispatch, getState) => {
    const user = getState().settings.user;
    if (!user) return;
    BackendUtils.putUser(user.id, params)
      .then(response => {
        const user = response.data;
        console.log("PUT USER", user);
        return dispatch({ type: ActionTypes.UPDATE_USER, user });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function iterateCount() {
  return {
    type: ActionTypes.ITERATE_OPEN_COUNT
  };
}
