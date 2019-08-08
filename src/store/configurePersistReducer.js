import { persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import collections from "utils/themes";

const transform = createTransform(
  (inboundState, key) => {
    return inboundState;
  },
  (outboundState, key) => {
    switch (key) {
      default:
        return outboundState;
    }
  }
);
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings"],
  transforms: [transform]
};

export default rootReducer => {
  return persistReducer(persistConfig, rootReducer);
};
