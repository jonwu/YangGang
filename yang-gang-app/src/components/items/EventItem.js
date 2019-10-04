import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_OPEN_FREE_MERCH } from "utils/AnalyticsUtils";
import moment from "moment-timezone";

const generateStyles = theme => ({});

const MerchItem = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View
      style={{
        padding: theme.spacing_4,
        backgroundColor: theme.yangBlue(),
        width: 120,
        height: 96,
        borderWidth: 1,
        borderColor: theme.text(0.1)
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          borderWidth: 1,
          borderColor: theme.light()
        }}
      >
        <Text style={[gstyles.h3_bold, { color: theme.light(), fontSize: 28 }]}>
          FREE
        </Text>
        <Text
          style={[
            gstyles.h4_bold,
            { color: theme.yangLightBlue(), marginTop: -10 }
          ]}
        >
          MERCH
        </Text>
        {/* <Text style={[gstyles.caption_50, { color: theme.light(0.5) }]}>
            MERCH
          </Text> */}
      </View>
    </View>
  );
};
const EventItem = React.memo(({ item, navigation, onPressEvent }) => {
  const {
    month,
    day,
    title,
    line1,
    line2,
    link,
    event_type,
    event_date
  } = item;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (event_type === "MERCH")
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          onPressEvent && onPressEvent(item);
          navigation && Amplitude.logEvent(EVENT_OPEN_FREE_MERCH);
          navigation && navigation.navigate("Merch");
        }}
      >
        <MerchItem navigation={navigation} />
      </TouchableOpacity>
    );

  if (!title) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onPressEvent && onPressEvent(item);
        navigation &&
          link &&
          navigation.navigate("Webview", { title, uri: link });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: theme.spacing_4,
          borderWidth: 1,
          borderColor: theme.borderColor2,
          width: 240,
          height: 96
        }}
      >
        <View
          style={{ paddingHorizontal: theme.spacing_4, alignItems: "center" }}
        >
          <Text style={gstyles.h4}>
            {moment(event_date)
              .tz("America/Los_Angeles")
              .format("D")}
          </Text>
          <Text style={gstyles.p1_50}>
            {moment(event_date)
              .tz("America/Los_Angeles")
              .format("MMM")}
          </Text>
          {/* <View
            style={[
              gstyles.top_5,
              {
                borderWidth: 1,
                borderColor: theme.borderColor2,
                borderRadius: 32,
                height: 32,
                width: 32,
                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >
            <Ionicons
              name={"ios-notifications-outline"}
              size={18}
              color={theme.text()}
            />
          </View> */}
        </View>
        <View style={{ paddingHorizontal: theme.spacing_4, flex: 1 }}>
          <Text numberOfLines={2} style={[gstyles.p1, { marginBottom: 2 }]}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={[gstyles.caption_50, { marginBottom: 2 }]}
          >
            {line1}
          </Text>
          <Text numberOfLines={1} style={[gstyles.caption_50]}>
            {line2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default EventItem;
