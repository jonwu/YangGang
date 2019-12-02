import { combineReducers } from "redux";
import app from "modules/app";
import loading from "modules/loading";
import chat from "modules/chat";

const reducers = combineReducers({
  settings: app.settings,
  app: app.reducer,
  loading: loading.reducer,
  chat: chat.reducer
});

export default reducers;
