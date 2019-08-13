import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import RedditItem from "components/items/RedditItem";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];
const renderItem = () => {
  return <RedditItem />;
};
const RedditScreen = () => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  return (
    <FlatList
      data={dummy}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
    />
  );
};

export default RedditScreen;
