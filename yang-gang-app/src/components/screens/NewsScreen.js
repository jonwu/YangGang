import React from "react";
import { View, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "components/items/NewsItem";
import { updateNews } from "modules/app/actions";
import Separator from "components/items/Separator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import { useDimensionStore } from "utils/DimensionUtils";

const NewsScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const news = useSelector(state => state.app.news[state.app.candidate]);
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
    if (!loadingNews.isRequesting) {
      dispatch(updateNews());
    }
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  // React.useEffect(fetch, []);

  if (!news)
    return (
      <Loading
        error={loadingNews.error}
        errorKey={"lobby"}
        errorRefresh={fetch}
      />
    );

  if (deviceWidth > 720) {
    return (
      <FlatList
        onRefresh={throttledFetch}
        refreshing={loadingNews.isRequesting}
        data={lodash.chunk(news, 2)}
        contentContainerStyle={{ paddingBottom: 88 }}
        renderItem={renderDuoItem}
        keyExtractor={(item, i) => i.toString()}
      />
    );
  }
  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingNews.isRequesting}
      data={news}
      contentContainerStyle={{ paddingBottom: 88 }}
      renderItem={renderItem}
      // ItemSeparatorComponent={Separator}
      keyExtractor={item => item.url}
    />
  );
});

export default NewsScreen;
