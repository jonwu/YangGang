import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView
} from "react-native";
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
// import { SafeAreaView } from "react-navigation";

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
  },
  headerSafeArea: {
    backgroundColor: theme.bgHeader()
  },
  header: {
    height: 54,
    backgroundColor: theme.bgHeader(),
    alignItems: "center",
    flexDirection: "row"
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
    <React.Fragment>
      <Header />
      <TabView
        lazy
        style={{ backgroundColor: theme.bg() }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => setIndex(index)}
      />
    </React.Fragment>
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

const Header = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.header}>
        <View style={gstyles.flex} />
        <View style={[gstyles.flex, { alignItems: "center" }]}>
          <YangLogo />
        </View>
        <View style={[gstyles.flex, { alignItems: "flex-end" }]}>
          <ThemeIcon />
        </View>
      </View>
    </SafeAreaView>
  );
};
TabScreen.navigationOptions = {
  /* Your custom header */
  header: <Header />
  // headerTitle: <YangLogo />,
  // headerRight: <ThemeIcon />,
  // headerStyle: {
  //   backgroundColor: theme.bgHeader(),
  //   elevation: 0,
  //   borderBottomWidth: 0
  // }
};
export default TabScreen;
