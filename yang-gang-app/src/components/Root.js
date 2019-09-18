import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import DescriptionScreen from "components/screens/DescriptionScreen";
import ProgressScreen from "components/screens/ProgressScreen";
import { useRefreshStats } from "utils/StoreUtils";

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
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
const Root = React.memo(() => {
  const refreshStats = useRefreshStats();
  React.useEffect(() => {
    refreshStats();
  }, []);

  const App = createAppContainer(RootStack);
  return <App />;
});

export default Root;
