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
import { useDimensionStore } from "utils/DimensionUtils";

const NewsScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const news = useSelector(state => state.app.news);
  const loadingNews = useSelector(state => state.loading.news);
  const { deviceWidth } = useDimensionStore();
  const renderItem = ({ item }) => {
    return <NewsItem item={item} navigation={navigation} />;
  };

  const renderDuoItem = ({ item }) => {
    const itemOne = item[0];
    const itemTwo = item[1];
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          {itemOne && <NewsItem item={itemOne} navigation={navigation} />}
        </View>
        <View style={{ flex: 1 }}>
          {itemTwo && <NewsItem item={itemTwo} navigation={navigation} />}
        </View>
      </View>
    );
  };

  const fetch = () => {
    Amplitude.logEvent(EVENT_FETCH_NEWS);
    dispatch(updateNews());
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  React.useEffect(fetch, []);

  if (deviceWidth > 720) {
    return (
      <FlatList
        onRefresh={throttledFetch}
        refreshing={loadingNews.isRequesting}
        data={lodash.chunk(news, 2)}
        contentContainerStyle={{ paddingBottom: 72 }}
        renderItem={renderDuoItem}
        keyExtractor={(item, i) => i.toString()}
      />
    );
  }

  if (!loadingNews.isReceived) return <Loading />;
  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingNews.isRequesting}
      data={news}
      contentContainerStyle={{ paddingBottom: 72 }}
      renderItem={renderItem}
      // ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.url}
    />
  );
});

export default NewsScreen;
