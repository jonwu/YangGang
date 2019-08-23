import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { XmlEntities as Entities } from "html-entities";
import { transformN } from "utils/Utils";
const entities = new Entities();

const generateStyles = theme => ({});

const YoutubeTinyItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { snippet, statistics } = item;
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
    <View style={{ width: 96 * (16 / 9) }}>
      <Image
        style={{
          height: 96,
          width: 96 * (16 / 9),
          marginRight: theme.spacing_2,
          backgroundColor: theme.bg2()
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
  );
};

export default YoutubeTinyItem;
