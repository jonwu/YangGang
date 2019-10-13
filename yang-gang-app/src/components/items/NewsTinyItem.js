import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { XmlEntities as Entities } from "html-entities";
import { transformN } from "utils/Utils";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_WATCH_YOUTUBE } from "utils/AnalyticsUtils";
import moment from "moment";
import placeholder from "assets/news_placeholder.png";

const entities = new Entities();

const generateStyles = theme => ({});

const YoutubeTinyItem = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, source, author, url, urlToImage, publishedAt } = item;
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={() => {
        Amplitude.logEvent(EVENT_WATCH_YOUTUBE);
        navigation.navigate("Webview", {
          uri: url,
          title: title
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
          source={urlToImage ? { uri: urlToImage } : placeholder}
        />
        <View style={{ padding: theme.spacing_4 }}>
          <Text numberOfLines={2} style={[gstyles.p1_bold, gstyles.bottom_5]}>
            {entities.decode(title)}
          </Text>
          <Text numberOfLines={1} style={[gstyles.caption_50]}>
            {source.name}
          </Text>
          <Text style={[gstyles.caption_50]}>
            {/* {transformN(statistics.viewCount, 10)} -{" "} */}
            {moment(publishedAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default YoutubeTinyItem;
