import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import WebviewScreen from "components/screens/WebviewScreen";
import { useThemeKit } from "utils/ThemeUtils";

const Root = () => {
  const StackNavigator = createStackNavigator(
    {
      Tabs: TabScreen,
      Webview: WebviewScreen
    },
    {
      headerMode: "none"
    }
  );
  const App = createAppContainer(StackNavigator);

  return <App />;
};

export default Root;
