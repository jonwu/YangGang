import * as ActionTypes from './actionTypes';
import BackendUtils from 'utils/BackendUtils';

export function updateTheme(theme) {
  return {
    type: ActionTypes.UPDATE_THEME,
    theme,
  }
}

export function updateReddit() {
  return (dispatch) => {
    return BackendUtils.getReddit().then(response => {
      const reddit = response.data;
      dispatch({
        type: ActionTypes.UPDATE_REDDIT,
        reddit,
      })
    })
  }
  
}