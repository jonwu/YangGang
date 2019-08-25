import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import RedditItem from "components/items/RedditItem";
import { updateReddit } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";

const styles = theme => {};

const keyExtractor = item => item.id;
const RedditScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const reddit = useSelector(state => state.app.reddit);
  const renderItem = ({ item: reddit }) => {
    return <RedditItem item={reddit} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateReddit());
  }, []);

  if (!reddit) return <Loading />;
  return (
    <FlatList
      data={reddit}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id}
    />
  );
};

export default RedditScreen;
