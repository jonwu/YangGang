import * as ActionTypes from "./actionTypes";

const FEATURES = [
  "reddit",
  "tweets",
  "youtube",
  "youtubeDay",
  "youtubeAllTime",
  "fetchYoutube",
  "news"
];
const defaultState = FEATURES.reduce(
  (previous, current) =>
    Object.assign({}, previous, {
      [current]: {
        feature: current,
        isRequesting: false,
        isReceived: false,
        error: null,
        lastUpdated: null
      }
    }),
  {}
);

function loading(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_DATA:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: true,
          error: null
        })
      });
    case ActionTypes.RECEIVED_DATA:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          isReceived: true,
          lastUpdated: new Date().toISOString()
        })
      });
    case ActionTypes.CATCH_ERROR:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          error: action.error
        })
      });
    case ActionTypes.RESET:
      return Object.assign({}, state, {
        [action.feature]: Object.assign({}, state[action.feature], {
          isRequesting: false,
          isReceived: false,
          error: null,
          lastUpdated: null
        })
      });
    default:
      return state;
  }
}

export default loading;
