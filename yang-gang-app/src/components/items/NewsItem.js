import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import moment from "moment";
import ActionBarView from "./ActionBarView";

const generateStyles = theme => ({});

const NewsItemContainer = React.memo(({ item, navigation }) => {
  return (
    <ActionBarView
      openLabel="Open in Safari"
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
      onPress={() => navigation.navigate("Webview", { uri: url, title })}
    >
      <View style={{ padding: theme.spacing_2 }}>
        <View
          style={[
            {
              // shadowColor: theme.cardShadow,
              // shadowOffset: { width: 2, height: 2 },
              // shadowOpacity: 1,
              // shadowRadius: 2
            },
            gstyles.bottom_2
          ]}
        >
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
          {/* <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: theme.spacing_4,
              backgroundColor: theme.dark(0.9),
              borderTopLeftRadius: 8,
              borderBottomRightRadius: 8
            }}
          >
            <Text style={[gstyles.caption, { color: theme.light() }]}>
              {author ? `${author} / ` : ""}
              {source.name}
            </Text>
          </View> */}
        </View>

        <Text
          style={[gstyles.h4, gstyles.bottom_4, { fontFamily: "brandon-med" }]}
          // style={[gstyles.h4_bold, gstyles.bottom_4]}
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
