import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "components/items/NewsItem";
import { updateNews } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_NEWS } from "utils/AnalyticsUtils";

const NewsScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const news = useSelector(state => state.app.news);
  const loadingNews = useSelector(state => state.loading.news);
  const renderItem = ({ item }) => {
    return <NewsItem item={item} navigation={navigation} />;
  };

  const fetch = () => {
    Amplitude.logEvent(EVENT_FETCH_NEWS);
    dispatch(updateNews());
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  React.useEffect(fetch, []);

  if (!loadingNews.isReceived) return <Loading />;
  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingNews.isRequesting}
      data={news}
      contentContainerStyle={{ paddingBottom: 16 }}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ height: theme.spacing_1 }} />
      )}
      keyExtractor={item => item.url}
    />
  );
});

export default NewsScreen;
