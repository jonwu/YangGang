import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
const { width: DEVICE_WIDTH } = Dimensions.get("window");

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

const TwitterItem = ({ item }) => {
  const { title, selftext, preview, thumbnail } = item;
  const isEnabled = preview != null && preview.enabled;

  if (isEnabled) {
    return <TwitterImage item={item} />;
  } else if (thumbnail !== "self") {
    return <TwitterThumbnail item={item} />;
  } else {
    return <TwitterDescription item={item} />;
  }
  return null;
};

const TwitterImage = ({ item }) => {
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

const TwitterThumbnail = ({ item }) => {
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

const TwitterDescription = ({ item }) => {
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

export default TwitterItem;
