import React from "react";
import { FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import RedditItem from "components/items/RedditItem";
import { updateReddit } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_REDDIT } from "utils/AnalyticsUtils";

const styles = theme => {};

const keyExtractor = item => item.id;
const RedditScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const reddit = useSelector(state => state.app.reddit);
  const loadingReddit = useSelector(state => state.loading.reddit);
  const renderItem = ({ item: reddit }) => {
    return <RedditItem item={reddit} navigation={navigation} />;
  };

  const fetch = () => {
    Amplitude.logEvent(EVENT_FETCH_REDDIT);
    dispatch(updateReddit());
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  React.useEffect(fetch, []);

  if (!loadingReddit.isReceived) return <Loading />;
  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingReddit.isRequesting}
      data={reddit}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 72 }}
    />
  );
});

export default RedditScreen;
