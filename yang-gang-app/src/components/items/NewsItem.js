import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import moment from "moment";
import ActionBarView from "./ActionBarView";
import { openWebBrowser } from "utils/Utils";

const generateStyles = theme => ({});

const NewsItemContainer = React.memo(({ item, navigation }) => {
  return (
    <ActionBarView
      openLabel={`Open in ${Platform.OS === "ios" ? "Safari" : "Browser"}`}
      openIcon={"safari"}
      link={item.url}
      message={`${item.title}`}
      navigation={navigation}
    >
      <NewsItem item={item} navigation={navigation} />
    </ActionBarView>
  );
});

const NewsItem = ({ item, navigation }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  const { title, source, author, url, urlToImage, publishedAt } = item;
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={() => openWebBrowser(url, theme)}
    >
      <View style={{ padding: theme.spacing_2 }}>
        <View style={[gstyles.bottom_2]}>
          {urlToImage != null && (
            <Image
              style={{
                borderRadius: 8,
                height: 200,
                width: "100%",
                backgroundColor: theme.text(0.1)
              }}
              source={{ uri: urlToImage }}
              resizeMode={"cover"}
            />
          )}
        </View>

        <Text
          style={[gstyles.h4, gstyles.bottom_4, { fontFamily: "brandon-med" }]}
        >
          {title}
        </Text>
        <Text style={[gstyles.caption_50]}>
          {source.name} - {moment(publishedAt).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItemContainer;
