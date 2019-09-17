import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import DescriptionScreen from "components/screens/DescriptionScreen";
import ProgressScreen from "components/screens/ProgressScreen";
import { useStatsStore } from "utils/StoreUtils";

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
      screen: ProgressScreen
    },
    Photo: {
      screen: PhotoScreen
    },
    Description: {
      screen: DescriptionScreen
    },
    Progress: {
      screen: ProgressScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
const Root = React.memo(() => {
  const updateTwitterStats = useStatsStore(state => state.updateTwitterStats);
  const updateRedditStats = useStatsStore(state => state.updateRedditStats);
  const getInstagramStats = useStatsStore(state => state.getInstagramStats);

  React.useEffect(() => {
    updateTwitterStats();
    updateRedditStats();
    getInstagramStats();
  }, []);

  const App = createAppContainer(RootStack);
  return <App />;
});

export default Root;
