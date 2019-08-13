import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import YoutubeItem from "components/items/YoutubeItem";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];
const renderItem = () => {
  return <YoutubeItem />;
};
const Youtubecreen = () => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  return (
    <FlatList
      data={dummy}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
    />
  );
};

export default Youtubecreen;
