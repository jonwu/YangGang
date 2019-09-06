import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { useDimensionStore } from "utils/DimensionUtils";

const generateStyles = theme => ({});

const NewsItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, author, url, urlToImage, publishedAt } = item;
  return (
    <View style={{ padding: theme.spacing_2 }}>
      <Image
        style={{ height: 240, width: "100%" }}
        source={{ uri: urlToImage }}
        resizeMode={"cover"}
      />
      <Text style={gstyles.h4_bold}>{title}</Text>
    </View>
  );
};

export default NewsItem;
