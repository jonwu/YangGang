import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import configurePersistReducer from "./configurePersistReducer";
import middleware from "./middleware";

const middlewareEnhancers = applyMiddleware(thunk, middleware);
const persistedReducer = configurePersistReducer(rootReducer);
const enhancer = compose(middlewareEnhancers);

export default initialState => {
  let store = createStore(persistedReducer, initialState, enhancer);
  let persistor = persistStore(store); // .purge() to clear
  // persistor.purge();
  return { store, persistor };
};
