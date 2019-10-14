import React from "react";
import { FlatList, Text, View } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import RedditItem from "components/items/RedditItem";
import { updateReddit, updateNews } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_REDDIT } from "utils/AnalyticsUtils";
import NewsTinyItem from "components/items/NewsTinyItem";

const styles = theme => {};

const keyExtractor = item => item.id;

export const NewsList = React.memo(({ navigation, news }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  if (!news || news.length === 0) return null;
  return (
    <>
      <Text style={[gstyles.h4, { margin: theme.spacing_2 }]}>Latest News</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={news}
        contentContainerStyle={{ paddingLeft: theme.spacing_2 }}
        renderItem={({ item }) => (
          <NewsTinyItem item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: theme.spacing_4 }} />
        )}
        keyExtractor={(item, i) => i.toString()}
      />
    </>
  );
});

const RedditScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const reddit = useSelector(state => state.app.reddit);
  const news = useSelector(state => state.app.news);
  const loadingReddit = useSelector(state => state.loading.reddit);
  const renderItem = ({ item: reddit }) => {
    return <RedditItem item={reddit} navigation={navigation} />;
  };
  const fetch = () => {
    Amplitude.logEvent(EVENT_FETCH_REDDIT);
    dispatch(updateReddit());
    // dispatch(updateNews());
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  React.useEffect(fetch, []);
  if (!loadingReddit.isReceived)
    return (
      <Loading
        error={loadingReddit.error}
        errorKey={"lobby"}
        errorRefresh={fetch}
      />
    );
  return (
    <FlatList
      // ListHeaderComponent={<NewsList navigation={navigation} news={news} />}
      onRefresh={throttledFetch}
      refreshing={loadingReddit.isRequesting}
      data={reddit}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id}
      extraData={news}
      contentContainerStyle={{ paddingBottom: 88 }}
    />
  );
});

export default RedditScreen;
