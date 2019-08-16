import React from "react";
import { View, Text, Image, Dimensions, WebView } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
import { Video } from "expo-av";

const generateStyles = theme => ({
  body: {
    padding: theme.spacing_2,
    backgroundColor: theme.bg2()
  },
  thumbnail: {
    backgroundColor: theme.bg2()
  },
  thumbnailContainer: {
    flexDirection: "row"
  }
});

const RedditItem = ({ item }) => {
  const { title, selftext, preview, thumbnail, media } = item;
  const isEnabled = preview != null && preview.enabled;
  const isRedditVideo = media && media.reddit_video != null;
  const isYoutube = media && media.type === "youtube.com";

  if (isYoutube) {
    return <RedditYoutube item={item} />;
  } else if (isRedditVideo) {
    return <RedditVideo item={item} />;
  } else if (isEnabled) {
    return <RedditImage item={item} />;
  } else if (thumbnail !== "self") {
    return <RedditThumbnail item={item} />;
  } else {
    return <RedditDescription item={item} />;
  }
  return null;
};

const RedditImage = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, preview } = item;
  const source = preview != null && preview.images[0].source;

  return (
    <View>
      <View style={styles.body}>
        <Text style={[gstyles.p1_50, gstyles.bottom_5]}>u/jonwuster - 23h</Text>
        <Text style={[gstyles.h4_bold]}>{title}</Text>
      </View>
      {source && (
        <Image
          style={[
            styles.thumbnail,
            {
              width: DEVICE_WIDTH,
              height: (DEVICE_WIDTH * source.height) / source.width
            }
          ]}
          source={{ uri: source.url }}
        />
      )}
    </View>
  );
};

const RedditYoutube = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, secure_media_embed, url } = item;

  return (
    <View>
      <View style={styles.body}>
        <Text style={[gstyles.p1_50, gstyles.bottom_5]}>u/jonwuster - 23h</Text>
        <Text style={[gstyles.h4_bold]}>{title}</Text>
      </View>
      <WebView
        style={{
          width: DEVICE_WIDTH,
          height:
            (DEVICE_WIDTH * secure_media_embed.height) /
            secure_media_embed.width
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w" }}
      />
    </View>
  );
};
const RedditVideo = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, secure_media } = item;
  const source = secure_media.reddit_video;

  return (
    <View>
      <View style={styles.body}>
        <Text style={[gstyles.p1_50, gstyles.bottom_5]}>u/jonwuster - 23h</Text>
        <Text style={[gstyles.h4_bold]}>{title}</Text>
      </View>
      <Video
        source={{ uri: source.hls_url }}
        useNativeControls
        style={{
          width: DEVICE_WIDTH,
          height: (DEVICE_WIDTH * source.height) / source.width
        }}
      />
    </View>
  );
};

const RedditThumbnail = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const {
    title,
    selftext,
    preview,
    thumbnail,
    thumbnail_height,
    thumbnail_width
  } = item;

  return (
    <View style={styles.body}>
      <Text style={[gstyles.p1_50, gstyles.bottom_5]}>u/jonwuster - 23h</Text>
      <View style={styles.thumbnailContainer}>
        <Text style={[gstyles.h4_bold, gstyles.right_2, gstyles.flex]}>
          {title}
        </Text>
        <Image
          source={{ uri: thumbnail }}
          style={{ height: thumbnail_height, width: thumbnail_width }}
        />
      </View>
    </View>
  );
};

const RedditDescription = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, preview } = item;
  const source = preview != null && preview.images[0].source;

  return (
    <View style={styles.body}>
      <Text style={[gstyles.p1_50, gstyles.bottom_5]}>u/jonwuster - 23h</Text>
      <Text style={[gstyles.h4_bold]}>{title}</Text>
      {selftext != "" && (
        <Text numberOfLines={4} style={[gstyles.caption, gstyles.bottom_5]}>
          {selftext}
        </Text>
      )}
    </View>
  );
};

export default RedditItem;
