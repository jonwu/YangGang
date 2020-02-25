import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import YoutubeItem from "components/items/YoutubeItem";
import YoutubeTinyItem from "components/items/YoutubeTinyItem";
import { useSelector, useDispatch } from "react-redux";
import { updateAllYoutubes } from "modules/app/actions";
import Separator from "components/items/Separator";
import { Ionicons } from "@expo/vector-icons";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import Loading from "components/utils/Loading";
import { load } from "modules/loading/actions";
import lodash from "lodash";
import { useDimensionStore } from "utils/DimensionUtils";

const styles = theme => {};

const DAYS_3 = "3 days";
const DAYS_7 = "7 days";
const DAYS_ALL = "All Time";
const options = [DAYS_3, DAYS_7, DAYS_ALL, "Cancel"];
const Header = connectActionSheet(
  ({ navigation, showActionSheetWithOptions, setFilter, filter }) => {
    const { theme, gstyles, styles } = useThemeKit(styles);
    const youtube_day = useSelector(
      state => state.app.youtubeDay[state.settings.defaultCandidate]
    );

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
              showsHorizontalScrollIndicator={false}
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
  const youtube = useSelector(
    state => state.app.youtube[state.settings.defaultCandidate]
  );
  const youtubeAllTime = useSelector(
    state => state.app.youtubeAllTime[state.settings.defaultCandidate]
  );
  const youtube3Days = useSelector(
    state => state.app.youtube3Days[state.settings.defaultCandidate]
  );
  const { deviceWidth } = useDimensionStore();
  const loadingFetchYoutube = useSelector(state => state.loading.fetchYoutube);

  const [filter, setFilter] = React.useState(DAYS_3);
  let data = youtube;
  switch (filter) {
    case DAYS_3:
      data = youtube3Days;
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
  const renderDuoItem = ({ item }) => {
    const itemOne = item[0];
    const itemTwo = item[1];
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          {itemOne && <YoutubeItem item={itemOne} navigation={navigation} />}
        </View>
        <View style={{ flex: 1 }}>
          {itemTwo && <YoutubeItem item={itemTwo} navigation={navigation} />}
        </View>
      </View>
    );
  };

  const fetch = () => {
    if (!loadingFetchYoutube.isRequesting) {
      dispatch(updateAllYoutubes());
    }
  };

  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  // React.useEffect(fetch, []);

  if (!youtube)
    return (
      <Loading
        error={loadingFetchYoutube.error}
        errorKey={"bureaucracy"}
        errorRefresh={fetch}
      />
    );

  if (deviceWidth > 720) {
    return (
      <FlatList
        ListHeaderComponent={
          <Header
            navigation={navigation}
            setFilter={setFilter}
            filter={filter}
          />
        }
        onRefresh={throttledFetch}
        refreshing={loadingFetchYoutube.isRequesting}
        data={lodash.chunk(data, 2)}
        contentContainerStyle={{ paddingBottom: 88 }}
        renderItem={renderDuoItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item, i) => i.toString()}
      />
    );
  }

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
      contentContainerStyle={{ paddingBottom: 88 }}
    />
  );
});

export default YoutubeScreen;
