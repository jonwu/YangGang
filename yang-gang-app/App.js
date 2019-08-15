import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Root from "components/Root";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider } from "utils/ThemeUtils";
import * as Font from "expo-font";

const { store, persistor } = configureStore();

const onBeforeLift = () => {};

export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    Font.loadAsync({
      "brandon-light": require("assets/fonts/whitney-light.ttf"),
      "brandon-med": require("assets/fonts/whitney-medium.ttf"),
      "brandon-semibold": require("assets/fonts/whitney-semibold.ttf"),
      "brandon-bold": require("assets/fonts/whitney-bold.ttf"),
      "brandon-book": require("assets/fonts/whitney-book.ttf")
    }).then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={onBeforeLift}
        >
          {fontLoaded && <Root />}
        </PersistGate>
      </ThemeContextProvider>
    </Provider>
  );
}
