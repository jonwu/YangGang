import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import HomeItem from "components/items/HomeItem";
import ActionBarView from "components/items/ActionBarView";
import { updateTweets } from "modules/app/actions";
import Separator from "components/items/Separator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_TWITTER } from "utils/AnalyticsUtils";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];

const HomeScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const data = [0, 1];

  const renderItem = ({ item }) => {
    return <HomeItem item={item} navigation={navigation} />;
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={{ paddingBottom: 72 }}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.toString()}
    />
  );
});

export default HomeScreen;
