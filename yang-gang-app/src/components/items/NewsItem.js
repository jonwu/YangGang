import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { useDimensionStore } from "utils/DimensionUtils";
import moment from "moment";

const generateStyles = theme => ({});

const NewsItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, source, author, url, urlToImage, publishedAt } = item;
  return (
    <View style={{ padding: theme.spacing_2 }}>
      <View style={[{ borderRadius: 8, overflow: "hidden" }, gstyles.bottom_2]}>
        <Image
          style={{
            height: 200,
            width: "100%",
            backgroundColor: theme.text(0.1)
          }}
          source={{ uri: urlToImage }}
          resizeMode={"cover"}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: theme.spacing_4,
            backgroundColor: theme.dark(0.8),
            borderTopLeftRadius: 8
          }}
        >
          <Text style={[gstyles.p1, { color: theme.light() }]}>
            {source.name || author}
          </Text>
        </View>
      </View>

      <Text
        style={[gstyles.h4, gstyles.bottom_4, { fontFamily: "brandon-med" }]}
        // style={[gstyles.h4_bold, gstyles.bottom_4]}
      >
        {title}
      </Text>
      <Text style={[gstyles.caption_50]}>{moment(publishedAt).fromNow()}</Text>
    </View>
  );
};

export default NewsItem;
