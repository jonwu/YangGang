import * as React from "react";
import { AppState } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import DescriptionScreen from "components/screens/DescriptionScreen";
import ProgressScreen from "components/screens/ProgressScreen";
import MerchScreen from "components/screens/MerchScreen";
import ChatScreen from "components/screens/ChatScreen";
import { useRefreshStats, useEventsStore } from "utils/StoreUtils";
import PostEventsScreen from "./screens/PostEventsScreen";
import { registerForPushNotificationsAsync } from "utils/PushNotificationsUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTweets,
  updateNews,
  updateReddit,
  updateInstagram,
  updateAllYoutubes,
  getLastUpdate
} from "modules/app/actions";
import moment from "moment";
import { EVENT_FETCH_ALL } from "utils/AnalyticsUtils";
import * as Amplitude from "expo-analytics-amplitude";
import SocketIOClient from "socket.io-client";

const MainStack = createStackNavigator(
  {
    Tabs: TabScreen,
    Webview: WebviewScreen
  },
  {
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    Photo: {
      screen: PhotoScreen
    },
    Description: {
      screen: DescriptionScreen
    },
    Progress: {
      screen: ProgressScreen
    },
    Chat: {
      screen: ChatScreen
    },
    Merch: {
      screen: MerchScreen
    },
    PostEvent: {
      screen: PostEventsScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const Root = React.memo(() => {
  const refreshStats = useRefreshStats();
  const dispatch = useDispatch();
  const fetchEvents = useEventsStore(state => state.fetchEvents);
  const candidate = useSelector(state => state.app.candidate);

  const fetchAll = candidate => {
    Amplitude.logEvent(EVENT_FETCH_ALL);
    fetchEvents();
    refreshStats();
    dispatch(updateTweets());
    dispatch(updateNews());
    dispatch(updateReddit());
    dispatch(updateInstagram());
    dispatch(updateAllYoutubes());
  };

  React.useEffect(() => {
    dispatch(registerForPushNotificationsAsync());
    // const socket = SocketIOClient("http://localhost:3000");
    // console.log("----SOCKET", socket);
  }, []);

  React.useEffect(() => {
    fetchAll(candidate);
  }, [candidate]);

  React.useEffect(() => {
    console.log("Initialize App Change Listener");

    const handleAppStateChange = nextAppState => {
      if (nextAppState === "active") {
        const lastUpdate = dispatch(getLastUpdate());
        if (
          lastUpdate &&
          moment().isAfter(moment(lastUpdate).add(1, "hours"))
        ) {
          fetchAll(candidate);
        }
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const App = createAppContainer(RootStack);
  return <App />;
});

export default Root;
