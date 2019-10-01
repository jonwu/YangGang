import React from "react";
import {
  TouchableOpacity,
  Linking,
  StatusBar,
  View,
  Share
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { XmlEntities as Entities } from "html-entities";
import { WebView } from "react-native-webview";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_SHARE_WEBVIEW } from "utils/AnalyticsUtils";

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => {
                Amplitude.logEvent(EVENT_SHARE_WEBVIEW);
                Share.share({
                  message: `${title}${"\n\n"}${uri}`
                });
              }}
            >
              <FontAwesome
                name={"share-square"}
                size={20}
                color={theme.light()}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => Linking.openURL(uri)}
            >
              <MaterialCommunityIcons
                name={"apple-safari"}
                size={24}
                color={theme.light()}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <WebView
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        style={{ flex: 1 }}
        source={{ uri }}
        showsVerticalScrollIndicator={false}
      />
    </React.Fragment>
  );
};

export default WebviewScreen;
