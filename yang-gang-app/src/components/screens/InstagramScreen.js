import React from "react";
import { FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import InstagramItem from "components/items/InstagramItem";
import { updateInstagram } from "modules/app/actions";
import TwitterSeparator from "components/items/TwitterSeparator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_INSTAGRAM } from "utils/AnalyticsUtils";

const styles = theme => {};

const keyExtractor = item => item.id;
const InstagramScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  // const dispatch = useDispatch();
  // const instagram = useSelector(state => state.app.instagram);
  // const loadingInstagram = useSelector(state => state.loading.instagram);
  const instagram = [1,2,3,4,5,6]
  const renderItem = ({ item: instagram }) => {
    return <InstagramItem item={instagram} navigation={navigation} />;
  };

  // const fetch = () => {
  //   Amplitude.logEvent(EVENT_FETCH_INSTAGRAM);
  //   dispatch(updateInstagram());
  // };
  // const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
  //   .current;
  // React.useEffect(fetch, []);

  // if (!loadingInstagram.isReceived)
  //   return (
  //     <Loading
  //       error={loadingInstagram.error}
  //       errorKey={"wall"}
  //       errorRefresh={fetch}
  //     />
  //   );
  return (
    <FlatList
      // onRefresh={throttledFetch}
      // refreshing={loadingInstagram.isRequesting}
      data={instagram}
      renderItem={renderItem}
      ItemSeparatorComponent={TwitterSeparator}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 88 }}
    />
  );
});

export default InstagramScreen;
