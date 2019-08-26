import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import TwitterItem from "components/items/TwitterItem";
import ActionBarView from "components/items/ActionBarView";
import { updateTweets } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];

const TwitterScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.app.tweets);
  const loadingTweets = useSelector(state => state.loading.tweets);
  const renderItem = ({ item }) => {
    return <TwitterItem item={item} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateTweets());
  }, []);

  if (!loadingTweets.isReceived) return <Loading />;

  return (
    <FlatList
      onRefresh={() => {
        dispatch(updateTweets());
      }}
      refreshing={loadingTweets.isRequesting}
      data={tweets}
      contentContainerStyle={{ paddingBottom: 16 }}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id.toString()}
    />
  );
});

export default TwitterScreen;
