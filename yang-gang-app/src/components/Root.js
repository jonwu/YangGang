import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import YoutubeWebviewScreen from "components/screens/YoutubeWebviewScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import { useThemeKit } from "utils/ThemeUtils";

const MainStack = createStackNavigator(
  {
    Tabs: TabScreen,
    Webview: WebviewScreen,
    YoutubeWebview: YoutubeWebviewScreen
    // Photo: PhotoScreen
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
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
const Root = () => {
  const App = createAppContainer(RootStack);

  return <App />;
};

export default Root;
