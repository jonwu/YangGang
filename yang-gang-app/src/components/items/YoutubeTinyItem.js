import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { XmlEntities as Entities } from "html-entities";
import { transformN } from "utils/Utils";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_WATCH_YOUTUBE } from "utils/AnalyticsUtils";

const entities = new Entities();

const generateStyles = theme => ({});

const YoutubeTinyItem = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { snippet, statistics, id } = item;
  const {
    title,
    description,
    thumbnails,
    channelTitle,
    publishedId,
    channelId,
    publishedAt
  } = snippet;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Amplitude.logEvent(EVENT_WATCH_YOUTUBE);
        navigation.navigate("Webview", {
          uri: `https://youtube.com/watch?v=${id}`,
          title: item.snippet.title
        });
      }}
    >
      <View style={{ width: 96 * (16 / 9) }}>
        <Image
          style={{
            height: 96,
            width: 96 * (16 / 9),
            marginRight: theme.spacing_2,
            backgroundColor: theme.bg2(),
            borderRadius: theme.borderRadius,
            backgroundColor: theme.text(0.1)
          }}
          source={{ uri: thumbnails.medium.url }}
        />
        <View style={{ padding: theme.spacing_4 }}>
          <Text numberOfLines={2} style={[gstyles.p1_bold, gstyles.bottom_5]}>
            {entities.decode(title)}
          </Text>
          <Text numberOfLines={1} style={[gstyles.caption_50]}>
            {transformN(statistics.viewCount, 10)} - {channelTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default YoutubeTinyItem;
