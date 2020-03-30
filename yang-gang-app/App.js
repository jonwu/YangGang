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
import { AppLoading } from "expo";
import * as Amplitude from "expo-analytics-amplitude";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { useDimensionStore } from "utils/DimensionUtils";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Octicons,
  Ionicons
} from "@expo/vector-icons";

const { store, persistor } = configureStore();

const onBeforeLift = () => {};

const Splash = ({}) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black"
      }}
    ></View>
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

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
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
      require("assets/gabbard.jpg"),
      require("assets/trump.jpg"),
      require("assets/russia.png"),
      require("assets/amy.jpg"),
      require("assets/bloomberg.jpg"),
      require("assets/obama.jpg"),
      require("assets/bureaucracy.png"),
      require("assets/loan.png"),
      require("assets/lobby.png"),
      require("assets/wall.png"),
      require("assets/treasure.png"),
      require("assets/modalbg.jpg"),
      require("assets/icYang.jpg"),
      require("assets/icBernie.png"),
      require("assets/icTrump.jpg"),
      require("assets/party.png"),
      require("assets/instagram.png"),
      require("assets/stickers/yg.png"),
      require("assets/stickers/math.png"),
      require("assets/stickers/ubi.png"),
      require("assets/stickers/lit.png"),
      require("assets/stickers/andrew.png"),
      require("assets/white_house.png"),
      require("assets/transparent-logo.png"),
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/83746795_178533293367951_5905284615559446528_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=pp1hqOAXAqgAX_0qMah&oh=95b0d5e3acccfd32d5b4be3b4ca0c528&oe=5E894AEC",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/51662345_553471575157171_318595189344043008_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=V4AoGK6p8GQAX9KCUIf&oh=015bb1e14e2019707cb76625d1e5c324&oe=5E85D7C3",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/23823676_515039535523575_7479748231031685120_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=18-BdVJD-JcAX9wdlPa&oh=d6cb946e16dd25ce52387b050dd3accb&oe=5E8015F5",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/80842301_496254071023747_5420149689901121536_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=mum9XSfE1Z0AX9rBHT9&oh=efacb00a5c0d0efc55450630d3dec7d5&oe=5E833234",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/81478153_779322202547330_1405455484143534080_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=i5RX6tIMFoEAX8psJNT&oh=9f06ec4a5be9d0d1d2a5b260ae8ce77d&oe=5E81A4BE",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/81941969_493924511236410_2499232037794217984_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=wDNTX1GPF58AX9dtZKM&oh=1962d3aaa0dd8f92611afa76c59678f4&oe=5E878854",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/87542407_190013032223132_6612337159917535232_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=R7dtXNUGEFUAX89DkEN&oh=929c6bdcd3db0540e9a4d7f08134ab56&oe=5E86E4F1",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/43913743_1939021533069790_3412901903846080512_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=nnbfTPVvBD8AX-zWeLu&oh=cb7aeb337374193d3f1ae5386a5ad6d9&oe=5E89F88A",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/82337838_608363853283387_4829352031820972032_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=BdCVi9AQq2YAX_f_qCv&oh=59c5c58d96ab34638c5d462371c95cf2&oe=5E8DD85C",
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s150x150/16123627_1826526524262048_8535256149333639168_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=SNBjZ24HCBUAX-QPNe_&oh=6cf7b6f8669c1fac0486357c3a43f100&oe=5E8F77A8"
    ]);

    const expoIcons = cacheFonts([
      AntDesign.font,
      MaterialCommunityIcons.font,
      FontAwesome.font,
      Octicons.font,
      Ionicons.font
    ]);

    cacheImages([
      require("assets/merch/hat.png"),
      require("assets/yanggangday.jpg"),
      require("assets/boba.png")
    ]);
    await Promise.all([fontAssets, ...imageAssets]);
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
