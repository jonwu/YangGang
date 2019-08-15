import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

function reddit(state = null, actions) {
  switch(actions.type) {
    case ActionTypes.UPDATE_REDDIT:
    return actions.reddit
  default:
    return state;
  }
}
export default combineReducers({ reddit });
