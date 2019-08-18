import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import TwitterItem from "components/items/TwitterItem";
import ActionBarView from "components/items/ActionBarView";
import { updateTweets } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];

const TwitterScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.app.tweets);

  const renderItem = ({ item }) => {
    return <TwitterItem item={item} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateTweets());
  }, []);
  if (!tweets) return null;

  return (
    <FlatList
      data={tweets}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id_str}
    />
  );
};

export default TwitterScreen;
