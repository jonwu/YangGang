import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";
import {
  newsPayload,
  youtubeAllTimePayload,
  youtubeDayPayload,
  redditPayload,
  tweetPayload
} from "utils/PayloadUtils";

// function reddit(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_REDDIT:
//       return redditPayload;
//     default:
//       return state;
//   }
// }
// function tweets(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_TWEETS:
//       return tweetPayload;
//     default:
//       return state;
//   }
// }
// function youtube(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_YOUTUBE:
//       return actions.youtube;
//     default:
//       return state;
//   }
// }
// function youtubeDay(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_YOUTUBE_DAY:
//       return youtubeDayPayload;
//     default:
//       return state;
//   }
// }
// function youtube3Days(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_YOUTUBE_3_DAYS:
//       return actions.youtube;
//     default:
//       return state;
//   }
// }
// function youtubeAllTime(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_YOUTUBE_ALL_TIME:
//       return youtubeAllTimePayload;
//     default:
//       return state;
//   }
// }
// function news(state = null, actions) {
//   switch (actions.type) {
//     case ActionTypes.UPDATE_NEWS:
//       return newsPayload;
//     default:
//       return state;
//   }
// }

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
function youtubeDay(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_DAY:
      return actions.youtube;
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
      return actions.youtube;
    default:
      return state;
  }
}

function news(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_NEWS:
      return actions.news;
    default:
      return state;
  }
}
function instagram(state = null, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_INSTAGRAM:
      return actions.instagram;
    default:
      return state;
  }
}

function showMoneyModal(state = false, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_MONEY_MODAL:
      return actions.show;
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
  news,
  showMoneyModal,
  instagram
});
