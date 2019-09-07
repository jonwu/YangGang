import React from "react";
import { TouchableOpacity, Linking, StatusBar } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { XmlEntities as Entities } from "html-entities";
import { WebView } from "react-native-webview";

const entities = new Entities();

const WebviewScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const uri = navigation.getParam("uri");
  const title = navigation.getParam("title");

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <Header
        navigation={navigation}
        title={entities.decode(title || uri)}
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
        mediaPlaybackRequiresUserAction
        allowsFullscreenVideo
        style={{ flex: 1 }}
        javaScriptEnabled
        source={{ uri }}
      />
    </React.Fragment>
  );
};

export default WebviewScreen;
