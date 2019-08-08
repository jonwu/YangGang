import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

function test(state = {}, actions) {
  return state;
}
export default combineReducers({ test });
