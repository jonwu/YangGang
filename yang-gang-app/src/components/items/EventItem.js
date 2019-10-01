import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_OPEN_FREE_MERCH } from "utils/AnalyticsUtils";

const generateStyles = theme => ({});

const MerchItem = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity
      onPress={() => {
        Amplitude.logEvent(EVENT_OPEN_FREE_MERCH);
        navigation.navigate("Merch");
      }}
    >
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
          <Text
            style={[gstyles.h3_bold, { color: theme.light(), fontSize: 28 }]}
          >
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
    </TouchableOpacity>
  );
};
const EventItem = React.memo(({ item, navigation }) => {
  const {
    month,
    day,
    title,
    description,
    location,
    link,
    id,
    expiration
  } = item;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (id === "MERCH") return <MerchItem navigation={navigation} />;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Webview", { title, uri: link })}
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
          <Text style={gstyles.h4}>{day}</Text>
          <Text style={gstyles.p1_50}>{month}</Text>
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
            {description}
          </Text>
          <Text numberOfLines={1} style={[gstyles.caption_50]}>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default EventItem;
