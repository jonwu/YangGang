import * as React from "react";
import { AppState, View } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import DescriptionScreen from "components/screens/DescriptionScreen";
import ProgressScreen from "components/screens/ProgressScreen";
import MerchScreen from "components/screens/MerchScreen";
import ChatScreen from "components/screens/ChatScreen";
import RoomScreen from "components/screens/RoomScreen";
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
  getLastUpdate,
  postUser,
  iterateCount
} from "modules/app/actions";
import moment from "moment";
import { EVENT_FETCH_ALL } from "utils/AnalyticsUtils";
import * as Amplitude from "expo-analytics-amplitude";
import { connectSocket, disconnectSocket } from "modules/chat/actions";
import Constants from "expo-constants";
import DonationModal from "./screens/DonationModal";
import RatingModal from "./screens/RatingModal";
import PandaModal from "./screens/PandaModal";
import UsernameModal from "./screens/UsernameModal";
import OnboardScreen from "./screens/OnboardScreen";
import ChatLoading from "./utils/ChatLoading";
import OnboardMainScreen from "./screens/OnboardMainScreen";

console.disableYellowBox = true;

const LoadingScreen = React.memo(({ navigation }) => {
  const candidate = useSelector(state => state.settings.defaultCandidate);
  React.useEffect(() => {
    navigation.navigate(candidate ? "App" : "Onboard");
  }, [candidate]);

  return <ChatLoading />;
});

const MainStack = createStackNavigator(
  {
    Tabs: TabScreen
  },
  {
    headerMode: "none"
  }
);

const ChatroomStack = createStackNavigator(
  {
    Room: RoomScreen,
    Chat: ChatScreen
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
    Room: {
      screen: ChatroomStack
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
    Merch: {
      screen: MerchScreen
    },
    PostEvent: {
      screen: PostEventsScreen
    },
    Onboard: {
      screen: OnboardMainScreen
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
  const candidate = useSelector(state => state.settings.defaultCandidate);
  console.log("candidate ----", candidate);
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
    dispatch(iterateCount());
    dispatch(registerForPushNotificationsAsync());
    dispatch(postUser(Constants.installationId));
    dispatch(connectSocket());
  }, []);

  React.useEffect(() => {
    fetchAll(candidate);
  }, [candidate]);

  const refresh = () => {
    const lastUpdate = dispatch(getLastUpdate());
    if (lastUpdate && moment().isAfter(moment(lastUpdate).add(1, "hours"))) {
      fetchAll(candidate);
    }
  };
  React.useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === "active") {
        refresh();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const App = createAppContainer(RootStack);
  return (
    <>
      <RatingModal />
      <DonationModal />
      <PandaModal />
      <UsernameModal />
      <App />
    </>
  );
});

const SwitchStack = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Onboard: OnboardScreen,
    App: Root
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(SwitchStack);
