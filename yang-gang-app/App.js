import React from "react";
import { View, Image, Platform } from "react-native";
import Root from "components/Root";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider } from "utils/ThemeUtils";
import * as Font from "expo-font";
import { Audio } from "expo-av";
import {
  INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
  INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
} from "expo-av/build/Audio";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import silence from "assets/silence.mp3";
import splash from "assets/splash.png";
import { AppLoading } from "expo";
import * as Amplitude from "expo-analytics-amplitude";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { useDimensionStore } from "utils/DimensionUtils";

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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [resourcesReady, setReasourcesReady] = React.useState(false);
  const fetchSound = async () => {
    if (Platform.OS === "ios") {
      await Audio.setIsEnabledAsync(true);
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
      await Audio.Sound.createAsync(silence, {
        shouldPlay: true,
        pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
        volume: 1
      });
    }
  };

  React.useEffect(() => {
    fetchSound();
  }, []);

  const load = async () => {
    Amplitude.initialize(
      __DEV__
        ? "243dac9c72026a21c881e41673775405"
        : "c48375b7100d056fa0396c962ec218b0"
    );
    Amplitude.setUserId(Constants.installationId);
    console.log("Initialize ID", Constants.installationId);

    const fontAssets = Font.loadAsync({
      "brandon-light": require("assets/fonts/whitney-light.ttf"),
      "brandon-med": require("assets/fonts/whitney-medium.ttf"),
      "brandon-semibold": require("assets/fonts/whitney-semibold.ttf"),
      "brandon-bold": require("assets/fonts/whitney-bold.ttf"),
      "brandon-book": require("assets/fonts/whitney-book.ttf"),
      "montserrat-light": require("assets/fonts/montserrat/Montserrat-Light.otf"),
      "montserrat-med": require("assets/fonts/montserrat/Montserrat-Medium.otf"),
      "montserrat-semibold": require("assets/fonts/montserrat/Montserrat-SemiBold.otf"),
      "montserrat-bold": require("assets/fonts/montserrat/Montserrat-Bold.otf"),
      "montserrat-extra-bold": require("assets/fonts/montserrat/Montserrat-ExtraBold.otf")
    });
    const imageAssets = cacheImages([
      require("assets/yang.jpg"),
      require("assets/sanders.jpg"),
      require("assets/warren.jpg"),
      require("assets/buttigieg.jpg"),
      require("assets/biden.jpg"),
      require("assets/kamala.jpg"),
      require("assets/russia.png"),
      require("assets/bureaucracy.png"),
      require("assets/loan.png"),
      require("assets/lobby.png"),
      require("assets/wall.png")
    ]);

    cacheImages([
      require("assets/merch/hat.png"),
      require("assets/yanggangday.jpg")
    ]);
    await Promise.all([fontAssets, imageAssets]);
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
            <DimensionView>
              <Root />
            </DimensionView>
          </PersistGate>
        </ActionSheetProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

const DimensionView = ({ children }) => {
  const setDimensions = useDimensionStore(state => state.setDimensions);
  return (
    <View
      onLayout={e => {
        setDimensions(e.nativeEvent.layout);
      }}
      style={{ flex: 1 }}
    >
      {children}
    </View>
  );
};
