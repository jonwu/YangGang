import * as React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import TabScreen from "components/screens/TabScreen";
import { useThemeKit } from "utils/ThemeUtils";

const Root = () => {
  const { theme, gstyles } = useThemeKit();
  const StackNavigator = createStackNavigator({
    Tabs: TabScreen
  });
  const App = createAppContainer(StackNavigator);

  return <App screenProps={{ theme, gstyles }} />;
};

export default Root;
