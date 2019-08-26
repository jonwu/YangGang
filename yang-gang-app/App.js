import React from "react";
import { StyleSheet, Text, View, Image, LayoutAnimation } from "react-native";
import Root from "components/Root";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider } from "utils/ThemeUtils";
import * as Font from "expo-font";
import { Audio } from "expo-av";
import {
  INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
} from "expo-av/build/Audio";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import silence from "assets/silence.mp3";
import splash from "assets/splash.png";
import { AppLoading } from "expo";

const { store, persistor } = configureStore();

const onBeforeLift = () => {};

const Splash = ({}) => {
  return (
    <View
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <Image
        source={splash}
        resizeMode={"cover"}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};
export default function App() {
  const [resourcesReady, setReasourcesReady] = React.useState(false);
  const fetchSound = async () => {
    await Audio.setIsEnabledAsync(true);
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });

    await Audio.Sound.createAsync(silence, {
      shouldPlay: true,
      pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
      volume: 1,
      isLooping: true
    });
  };
  React.useEffect(() => {
    fetchSound();
  }, []);

  // var CustomFade = {
  //   duration: 5000,
  //   update: {
  //     type: LayoutAnimation.Types.easeOut,
  //     property: LayoutAnimation.Properties.opacity
  //   }
  // };

  // LayoutAnimation.configureNext(CustomFade);

  const load = async () => {
    await Font.loadAsync({
      "brandon-light": require("assets/fonts/whitney-light.ttf"),
      "brandon-med": require("assets/fonts/whitney-medium.ttf"),
      "brandon-semibold": require("assets/fonts/whitney-semibold.ttf"),
      "brandon-bold": require("assets/fonts/whitney-bold.ttf"),
      "brandon-book": require("assets/fonts/whitney-book.ttf"),
      "montserrat-thin": require("assets/fonts/montserrat/Montserrat-Thin.otf"),
      "montserrat-extra-light": require("assets/fonts/montserrat/Montserrat-ExtraLight.otf"),
      "montserrat-light": require("assets/fonts/montserrat/Montserrat-Light.otf"),
      "montserrat-medium": require("assets/fonts/montserrat/Montserrat-Medium.otf"),
      "montserrat-bold": require("assets/fonts/montserrat/Montserrat-Bold.otf")
    });
  };

  if (!resourcesReady)
    return (
      <AppLoading
        startAsync={load}
        onFinish={() => setReasourcesReady(true)}
        onError={console.warn}
      />
    );
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ActionSheetProvider>
          <PersistGate
            loading={<Splash />}
            persistor={persistor}
            onBeforeLift={onBeforeLift}
          >
            <Root />
          </PersistGate>
        </ActionSheetProvider>
      </ThemeContextProvider>
    </Provider>
  );
}
