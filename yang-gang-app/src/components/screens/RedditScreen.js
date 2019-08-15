import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import RedditItem from "components/items/RedditItem";
import { updateReddit } from "modules/app/actions";
import Separator from "components/items/Separator";

const styles = theme => {};
const renderItem = ({ item: reddit }) => {
  return <RedditItem item={reddit} />;
};
const RedditScreen = () => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const reddit = useSelector(state => state.app.reddit);

  React.useEffect(() => {
    dispatch(updateReddit());
  }, []);

  if (!reddit) return null;
  return (
    <FlatList
      data={reddit}
      renderItem={renderItem}
      ListHeaderComponent={Separator}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.created}
    />
  );
};

export default RedditScreen;
