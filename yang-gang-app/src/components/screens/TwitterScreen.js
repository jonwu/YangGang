import React from "react";
import { View, FlatList, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import TwitterItem from "components/items/TwitterItem";
import ActionBarView from "components/items/ActionBarView";
import { updateTweets } from "modules/app/actions";
import Separator from "components/items/Separator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import EventItem from "components/items/EventItem";
import moment from "moment";
import { useEventsStore } from "utils/StoreUtils";

const styles = theme => {};
const dummy = [1, 2, 3, 4, 5];

// const events = [
//   {
//     day: 30,
//     month: "Sep",
//     title: "Andrew Yang in Los Angeles at MacArthur Park",
//     description: "Monday at 6PM - 8PM PST",
//     location: "2230 W 6th St, Los Angeles, CA",
//     link: "https://www.facebook.com/events/1516380701837141/",
//     expiration: "2019-10-01T00:00:00.000Z"
//   },
//   {
//     day: 30,
//     month: "Sep",
//     title: "Watch Los Angeles Rally Live!",
//     description: "Monday at 6PM - 8PM PST",
//     location: "www.yang2020.com/live",
//     link: "https://www.facebook.com/events/2153298011637525/",
//     expiration: "2019-10-01T00:00:00.000Z"
//   },
//   {
//     id: "MERCH",
//     day: 5,
//     month: "Oct",
//     title: "#NationalYangGangDay",
//     description: "Monday at 6PM - 8PM PST",
//     location: "2230 W 6th St, Los Angeles, CA",
//     expiration: "2019-10-06T00:00:00.000Z"
//   },
//   {
//     day: 2,
//     month: "Oct",
//     title: "Town Hall with Andrew Yang! (Las Vegas)",
//     description: "Wednesday at 6:30 - 8:30 PST",
//     location: "Plumbers and Pipefitters Union Hall",
//     link: "https://www.mobilize.us/yang2020/event/129976/",
//     expiration: "2019-10-03T04:00:00.000Z"
//   },
//   {
//     day: 5,
//     month: "Oct",
//     title: "National Yang Gang Day (Everywhere)",
//     description: "Find Local Events and Canvas",
//     location: "Tweet #YoutubeAndrewYang",
//     link:
//       "https://docs.google.com/document/d/1M241M2Sd3k_evIvAwvRfjIIipS1K5cmQBD7KDP0fc5o/edit",
//     expiration: "2019-10-06T00:00:00.000Z"
//   },
//   {
//     day: 10,
//     month: "Oct",
//     title: "Andrew Yang in Whitefield, NH!",
//     description: "Thursday 5PM - 8PM EDT",
//     location: "101 Mt. View Road, Whitefield, New Hampshire",
//     link: "https://www.facebook.com/events/464736124254412/",
//     expiration: "2019-10-11T12:00:00.000Z"
//   }
// ];
const events = [];
export const EventList = React.memo(({ navigation, events, onPressEvent }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  if (events.length === 0) return null;
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={events}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing_3,
        paddingVertical: theme.spacing_3
      }}
      renderItem={({ item }) => (
        <EventItem
          item={item}
          navigation={navigation}
          onPressEvent={onPressEvent}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ width: theme.spacing_4 }} />}
      keyExtractor={(item, i) => i.toString()}
    />
  );
});
const TwitterScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.app.tweets[state.app.candidate]);
  const loadingTweets = useSelector(state => state.loading.tweets);
  const events = useEventsStore(state => state.events);
  const fetchEvents = useEventsStore(state => state.fetchEvents);

  const renderItem = ({ item }) => {
    return <TwitterItem item={item} navigation={navigation} />;
  };

  const filteredEvents = events.filter(e => {
    return moment().isBefore(moment(e.event_date));
  });

  const fetch = () => {
    if (!loadingTweets.isRequesting) dispatch(updateTweets());
    fetchEvents();
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  // React.useEffect(fetch, []);

  if (!tweets)
    return (
      <Loading
        error={loadingTweets.error}
        errorKey={"russia"}
        errorRefresh={fetch}
      />
    );

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <EventList navigation={navigation} events={filteredEvents} />
          </>
        }
        onRefresh={throttledFetch}
        refreshing={loadingTweets.isRequesting}
        data={tweets}
        contentContainerStyle={{ paddingBottom: 88 }}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item, i) => i.toString()}
      />
    </>
  );
});

export default TwitterScreen;
