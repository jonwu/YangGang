import * as ActionTypes from './actionTypes';

export function updateTheme(theme) {
  return {
    type: ActionTypes.UPDATE_THEME,
    theme,
  }
}