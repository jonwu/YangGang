import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
const { width: DEVICE_WIDTH } = Dimensions.get("window");

const generateStyles = theme => ({});

const PhotoScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  uri = navigation.getParam("uri");
  height = navigation.getParam("height");
  width = navigation.getParam("width");
  title = navigation.getParam("title");

  return (
    <View style={{ flex: 1 }}>
      <Header bgColor={"black"} navigation={navigation} title={title || uri} />
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: DEVICE_WIDTH,
            height: (DEVICE_WIDTH * height) / width
          }}
        />
      </View>
    </View>
  );
};

export default PhotoScreen;
