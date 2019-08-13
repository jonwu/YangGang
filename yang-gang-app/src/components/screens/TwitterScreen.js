import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import TwitterItem from "components/items/TwitterItem";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];
const renderItem = () => {
  return <TwitterItem />;
};
const TwitterScreen = () => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  return (
    <WebView
      allowsInlineMediaPlayback
      thirdPartyCookiesEnabled
      javaScriptEnabled
      source={{
        html:
          '<a class="twitter-timeline" href="https://twitter.com/AndrewYang?ref_src=twsrc%5Etfw">Tweets by AndrewYang</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
      }}
    />
  );
  return (
    <FlatList
      data={dummy}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
    />
  );
};

export default TwitterScreen;
