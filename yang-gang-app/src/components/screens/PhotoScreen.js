import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
import ImageViewer from "react-native-image-zoom-viewer";

const generateStyles = theme => ({});

const PhotoScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  uri = navigation.getParam("uri");
  height = navigation.getParam("height");
  width = navigation.getParam("width");
  title = navigation.getParam("title");
  const images = [{ url: uri }];

  return (
    <View style={{ flex: 1 }}>
      <Header
        close
        bgColor={"black"}
        navigation={navigation}
        title={title || uri}
      />
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
          resizeMode={"contain"}
          style={{
            width: "100%",
            flex: 1
          }}
        />
      </View>
    </View>
  );
};

export default PhotoScreen;
