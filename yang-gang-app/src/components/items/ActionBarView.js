import React from "react";
import { View, Text, TouchableOpacity, Linking, Share } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { FontAwesome } from "@expo/vector-icons";
import * as Amplitude from "expo-analytics-amplitude";
import {
  EVENT_OPEN_YOUTUBE,
  EVENT_OPEN_REDDIT,
  EVENT_OPEN_TWITTER,
  EVENT_OPEN_NEWS_SAFARI,
  EVENT_SHARE_YOUTUBE,
  EVENT_SHARE_REDDIT,
  EVENT_SHARE_TWITTER,
  EVENT_SHARE_NEWS
} from "utils/AnalyticsUtils";
import * as WebBrowser from "expo-web-browser";

const generateStyles = theme => ({
  item: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: theme.spacing_4
  },
  container: {
    backgroundColor: theme.bg2(),
    flexDirection: "row"
  }
});

const ActionBarView = ({
  children,
  openLabel,
  openIcon,
  link,
  message,
  navigation
}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const actionBar = (
    <View style={styles.container}>
      <ActionBarItem
        label={"Share"}
        icon={"share-square"}
        onPress={() => {
          switch (openLabel) {
            case "Open in Youtube":
              Amplitude.logEvent(EVENT_SHARE_YOUTUBE);
              break;
            case "Open in Reddit":
              Amplitude.logEvent(EVENT_SHARE_REDDIT);
              break;
            case "Open in Twitter":
              Amplitude.logEvent(EVENT_SHARE_TWITTER);
              break;
            case "Open in Safari":
              Amplitude.logEvent(EVENT_SHARE_NEWS);
              break;
            default:
              break;
          }
          Share.share({
            message: `${message}${"\n\n"}${link}`
          });
        }}
      />
      <ActionBarItem
        label={openLabel}
        icon={openIcon}
        onPress={() => {
          switch (openLabel) {
            case "Open in Youtube":
              Amplitude.logEvent(EVENT_OPEN_YOUTUBE);
              break;
            case "Open in Reddit":
              Amplitude.logEvent(EVENT_OPEN_REDDIT);
              break;
            case "Open in Twitter":
              Amplitude.logEvent(EVENT_OPEN_TWITTER);
              break;
            case "Open in Safari":
              Amplitude.logEvent(EVENT_OPEN_NEWS_SAFARI);
              break;
            default:
              break;
          }
          // WebBrowser.openAuthSessionAsync(link);
          Linking.openURL(link);
        }}
      />
    </View>
  );

  return (
    <View>
      {children}
      {actionBar}
    </View>
  );
};

const ActionBarItem = ({ label, icon, onPress }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <View style={styles.item}>
        {icon && (
          <FontAwesome
            name={icon}
            size={16}
            style={gstyles.right_5}
            color={theme.text()}
          />
        )}
        {label && <Text style={gstyles.p1}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ActionBarView;
