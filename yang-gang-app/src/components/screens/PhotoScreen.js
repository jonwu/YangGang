import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  PanResponder,
  Animated
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import { duration } from "moment";

const generateStyles = theme => ({});

const PhotoScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  uri = navigation.getParam("uri");
  height = navigation.getParam("height");
  width = navigation.getParam("width");
  title = navigation.getParam("title");
  const images = [{ url: uri }];
  const translateY = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log(evt);
      translateY.setValue(gestureState.dy);
      translateX.setValue(gestureState.dx);
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 150) {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: Dimensions.get("window").height,
            duration: 100
          })
        ]).start(() => {
          navigation.goBack();
        });
      } else {
        Animated.parallel([
          Animated.spring(translateY, { toValue: 0 }),
          Animated.spring(translateX, { toValue: 0 })
        ]).start();
      }

      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Header
        close
        bgColor={"black"}
        navigation={navigation}
        title={title || uri}
      />
      <View
        {...panResponder.panHandlers}
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Animated.Image
          source={{ uri }}
          resizeMode={"contain"}
          style={[
            {
              width: "100%",
              flex: 1
            },
            { transform: [{ translateY }, { translateX }] }
          ]}
        />
      </View>
    </View>
  );
};

export default PhotoScreen;
