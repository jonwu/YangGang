import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { XmlEntities as Entities } from "html-entities";
import ActionBarView from "./ActionBarView";
import { FontAwesome } from "@expo/vector-icons";
import { transformN } from "utils/Utils";
import moment from "moment";

const entities = new Entities();

const generateStyles = theme => ({
  container: {
    flexDirection: "row",
    padding: theme.spacing_2,
    backgroundColor: theme.bg2()
  },
  body: {
    flex: 1
  },
  thumbnail: {
    height: 96,
    flex: 1,
    marginRight: theme.spacing_2,
    backgroundColor: theme.bg2()
  }
});

const YoutubeItemContainer = React.memo(({ item, navigation }) => {
  const { id } = item;
  return (
    <ActionBarView
      openLabel="Open in Youtube"
      openIcon={"youtube-square"}
      link={`https://youtube.com/watch?v=${id}`}
      message={`${item.snippet.title}`}
    >
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("Webview", {
            // uri: `https://youtube.com/embed/${id}?autoplay=1`
            // uri: `https://youtube.com/embed/${id.videoId}`
            uri: `https://youtube.com/watch?v=${id}`
          })
        }
      >
        <YoutubeItem item={item} />
      </TouchableHighlight>
    </ActionBarView>
  );
});
const YoutubeItem = ({ item }) => {
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
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: thumbnails.medium.url }} />
      <View style={styles.body}>
        <Text numberOfLines={3} style={[gstyles.p1_bold, gstyles.bottom_5]}>
          {entities.decode(title)}
        </Text>
        <Text style={[gstyles.caption_50]}>{channelTitle}</Text>
        <Text style={[gstyles.caption_50]}>
          {transformN(statistics.viewCount, 10)} -{" "}
          {moment(publishedAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default YoutubeItemContainer;
