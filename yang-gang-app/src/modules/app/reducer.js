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

function candidate(state = "andrew_yang", actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_CANDIDATE:
      return actions.candidate;
    default:
      return state;
  }
}
function reddit(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_REDDIT:
      return { ...state, [actions.candidate]: actions.reddit };
    default:
      return state;
  }
}
function tweets(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_TWEETS:
      return { ...state, [actions.candidate]: actions.tweets };
    default:
      return state;
  }
}
function youtube(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE:
      return { ...state, [actions.candidate]: actions.youtube };
    default:
      return state;
  }
}
function youtubeDay(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_DAY:
      return { ...state, [actions.candidate]: actions.youtube };
    default:
      return state;
  }
}
function youtube3Days(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_3_DAYS:
      return { ...state, [actions.candidate]: actions.youtube };
    default:
      return state;
  }
}
function youtubeAllTime(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_YOUTUBE_ALL_TIME:
      return { ...state, [actions.candidate]: actions.youtube };
    default:
      return state;
  }
}

function news(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_NEWS:
      return { ...state, [actions.candidate]: actions.news };
    default:
      return state;
  }
}
function instagram(state = {}, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_INSTAGRAM:
      return { ...state, [actions.candidate]: actions.instagram };
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

function modals(state = { username: false }, actions) {
  switch (actions.type) {
    case ActionTypes.UPDATE_MODAL:
      return { ...state, [actions.key]: actions.show };
    default:
      return state;
  }
}

function showUsernameModal(state = false, actions) {}

export default combineReducers({
  reddit,
  tweets,
  youtube,
  youtubeDay,
  youtube3Days,
  youtubeAllTime,
  news,
  showMoneyModal,
  instagram,
  candidate,
  modals
});
