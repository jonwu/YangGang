import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import YoutubeWebviewScreen from "components/screens/YoutubeWebviewScreen";
import PhotoScreen from "components/screens/PhotoScreen";
import { useThemeKit } from "utils/ThemeUtils";

const Root = () => {
  const StackNavigator = createStackNavigator(
    {
      Tabs: TabScreen,
      Webview: WebviewScreen,
      YoutubeWebview: YoutubeWebviewScreen,
      Photo: PhotoScreen
    },
    {
      headerMode: "none"
    }
  );
  const App = createAppContainer(StackNavigator);

  return <App />;
};

export default Root;
