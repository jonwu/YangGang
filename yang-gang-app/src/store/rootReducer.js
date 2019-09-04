import { combineReducers } from "redux";
import app from "modules/app";
import loading from "modules/loading";

const reducers = combineReducers({
  settings: app.settings,
  app: app.reducer,
  loading: loading.reducer
});

export default reducers;
