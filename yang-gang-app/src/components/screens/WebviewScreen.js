import React from "react";
import {
  View,
  WebView,
  FlatList,
  TouchableOpacity,
  Linking
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WebviewScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const uri = navigation.getParam("uri");
  const title = navigation.getParam("title");

  return (
    <React.Fragment>
      <Header
        navigation={navigation}
        title={title}
        renderRight={
          <TouchableOpacity onPress={() => Linking.openURL(uri)}>
            <MaterialCommunityIcons
              name={"apple-safari"}
              size={24}
              color={theme.light()}
            />
          </TouchableOpacity>
        }
      />
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled
        source={{ uri }}
        useWebKit={true}
      />
    </React.Fragment>
  );
};

export default WebviewScreen;
