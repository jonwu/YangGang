import React from "react";
import { View, WebView, FlatList, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import YoutubeItem from "components/items/YoutubeItem";
import YoutubeTinyItem from "components/items/YoutubeTinyItem";
import { useSelector, useDispatch } from "react-redux";
import {
  updateYoutube,
  updateYoutubeDay,
  updateYoutubeAllTime
} from "modules/app/actions";
import Separator from "components/items/TwitterSeparator";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import Loading from "components/utils/Loading";
import { load } from "modules/loading/actions";
import lodash from "lodash";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_FETCH_YOUTUBE } from "utils/AnalyticsUtils";

const styles = theme => {};

const DAYS_3 = "3 days";
const DAYS_7 = "7 days";
const DAYS_ALL = "All Time";
const options = [DAYS_3, DAYS_7, DAYS_ALL, "Cancel"];
const Header = connectActionSheet(
  ({ navigation, showActionSheetWithOptions, setFilter, filter }) => {
    const { theme, gstyles, styles } = useThemeKit(styles);
    const youtube_day = useSelector(state => state.app.youtubeDay);

    const renderItemTiny = ({ item: youtube, showActionSheetWithOptions }) => {
      return <YoutubeTinyItem item={youtube} navigation={navigation} />;
    };

    let title = "";
    if (filter === DAYS_3) title = "Last 3 days";
    if (filter === DAYS_7) title = "This Week";
    if (filter === DAYS_ALL) title = "All Time";
    const cancelButtonIndex = 3;

    return (
      <React.Fragment>
        {youtube_day && (
          <React.Fragment>
            <Text style={[gstyles.h4, { margin: theme.spacing_2 }]}>
              Most Viewed Today
            </Text>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingLeft: theme.spacing_2 }}
              ItemSeparatorComponent={() => (
                <View style={{ width: theme.spacing_4 }} />
              )}
              data={youtube_day}
              renderItem={renderItemTiny}
              keyExtractor={item => item.id}
            />
          </React.Fragment>
        )}
        <TouchableOpacity
          onPress={() => {
            showActionSheetWithOptions(
              { options, cancelButtonIndex },
              buttonIndex => {
                if (buttonIndex !== cancelButtonIndex) {
                  setFilter(options[buttonIndex]);
                }
              }
            );
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: theme.spacing_2
            }}
          >
            <Text style={[gstyles.h4]}>{title}</Text>
            <Ionicons
              name="ios-arrow-down"
              size={20}
              color={theme.text()}
              style={{ marginLeft: theme.spacing_4, marginTop: 4 }}
            />
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
);
const YoutubeScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const youtube = useSelector(state => state.app.youtube);
  const youtubeAllTime = useSelector(state => state.app.youtubeAllTime);

  const loadingFetchYoutube = useSelector(state => state.loading.fetchYoutube);

  const [filter, setFilter] = React.useState(DAYS_7);
  let data = youtube;
  switch (filter) {
    case DAYS_3:
      data = youtube;
      break;
    case DAYS_7:
      data = youtube;
      break;
    case DAYS_ALL:
      data = youtubeAllTime;
      break;
  }

  const renderItem = ({ item: youtube }) => {
    return <YoutubeItem item={youtube} navigation={navigation} />;
  };

  const fetch = () => {
    Amplitude.logEvent(EVENT_FETCH_YOUTUBE);
    dispatch(
      load(
        "fetchYoutube",
        Promise.all([
          dispatch(updateYoutube()),
          dispatch(updateYoutubeDay()),
          dispatch(updateYoutubeAllTime())
        ])
      )
    );
  };

  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  React.useEffect(fetch, []);

  if (!loadingFetchYoutube.isReceived) return <Loading />;
  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingFetchYoutube.isRequesting}
      ListHeaderComponent={
        <Header navigation={navigation} setFilter={setFilter} filter={filter} />
      }
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
});

export default YoutubeScreen;
