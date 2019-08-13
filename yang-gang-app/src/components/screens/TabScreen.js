import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import RedditScreen from "./RedditScreen";
import TwitterScreen from "./TwitterScreen";
import YoutubeScreen from "./YoutubeScreen";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import pngLogoYang from "assets/logo-yang.png";
import pngYinYang from "assets/yin.png";
import { updateTheme } from "modules/app/actions";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  tabbar: {
    backgroundColor: theme.bgTabs()
  },
  indicator: {
    backgroundColor: theme.yang()
  },
  label: {
    color: theme.text()
  },
  tabStyle: {
    // width: "auto"
  },
  logo: {
    height: 30,
    width: 60
  },
  icon: {
    height: 24,
    width: 24
  }
});

const routes = [
  { key: "twitter", icon: "logo-twitter", color: "#00aced" },
  { key: "reddit", icon: "reddit", color: "#FF5700", iconType: "FontAwesome" },
  { key: "youtube", icon: "logo-youtube", color: "#FF0000" }
];

const renderScene = SceneMap({
  reddit: RedditScreen,
  twitter: TwitterScreen,
  youtube: YoutubeScreen
});

const renderIcon = ({ route }) => {
  switch (route.iconType) {
    case "FontAwesome":
      return <FontAwesome name={route.icon} size={24} color={route.color} />;
    default:
      return <Ionicons name={route.icon} size={24} color={route.color} />;
  }
};

const TabScreen = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const [index, setIndex] = React.useState(0);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={renderIcon}
        style={styles.tabbar}
      />
    );
  };

  return (
    <TabView
      lazy
      style={{ backgroundColor: theme.bg() }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={index => setIndex(index)}
    />
  );
};

const YangLogo = () => {
  const { styles } = useThemeKit(generateStyles);
  return <Image source={pngLogoYang} style={styles.logo} />;
};
const ThemeIcon = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const themeId = useSelector(state => state.settings.theme);
  const nextThemeId = themeId === 0 ? 1 : 0;
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={[gstyles.right_2, gstyles.top_5]}
      onPress={() => dispatch(updateTheme(nextThemeId))}
    >
      <Image source={pngYinYang} style={styles.icon} />
    </TouchableOpacity>
  );
};
TabScreen.navigationOptions = ({ navigation }) => {
  const { theme } = navigation.getScreenProps();
  return {
    headerTitle: <YangLogo />,
    headerRight: <ThemeIcon />,
    headerStyle: {
      backgroundColor: theme.bgHeader(),
      elevation: 0,
      borderBottomWidth: 0
    }
  };
};
export default TabScreen;
