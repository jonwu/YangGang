import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import RedditScreen from "./RedditScreen";
import TwitterScreen from "./TwitterScreen";
import YoutubeScreen from "./YoutubeScreen";
import GoogleNewsScreen from "./GoogleNewsScreen";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import pngLogoYang from "assets/logo-yang.png";
import { updateTheme } from "modules/app/actions";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { useDimensionStore } from "utils/DimensionUtils";

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
    height: 26,
    width: 52
  },
  icon: {
    height: 24,
    width: 24
  }
});

const routes = [
  { key: "twitter", icon: "logo-twitter", color: "#00aced" },
  { key: "reddit", icon: "reddit", color: "#FF5700", iconType: "FontAwesome" },
  { key: "youtube", icon: "logo-youtube", color: "#FF0000" },
  { key: "google-news", icon: "logo-youtube", color: "#FF0000" }
];

const renderIcon = ({ route }) => {
  switch (route.iconType) {
    case "FontAwesome":
      return <FontAwesome name={route.icon} size={24} color={route.color} />;
    default:
      return <Ionicons name={route.icon} size={24} color={route.color} />;
  }
};

const TabScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const [index, setIndex] = React.useState(0);
  const { deviceWidth, deviceHeight } = useDimensionStore();

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "twitter":
        return <TwitterScreen navigation={navigation} />;
      case "reddit":
        return <RedditScreen navigation={navigation} />;
      case "youtube":
        return <YoutubeScreen navigation={navigation} />;
      case "google-news":
        return <GoogleNewsScreen navigation={navigation} />;
      default:
        return null;
    }
  };

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
      <StatusBar barStyle="light-content" />
      <Header
        renderTitle={<YangLogo />}
        renderRight={<ThemeIcon />}
        navigation={navigation}
      />
      {/* <Image source={header} style={{ width: "100%", height: 180 }} />
      <View
        style={{
          backgroundColor: theme.yang(0.5),
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: 180
        }}
      /> */}
      <TabView
        lazy
        style={{ backgroundColor: theme.bg2() }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: deviceWidth }}
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
      style={{ padding: 8 }}
      onPress={() => dispatch(updateTheme(nextThemeId))}
    >
      <MaterialCommunityIcons name="yin-yang" size={26} color={theme.light()} />
      {/* <Image source={pngYinYang} style={styles.icon} /> */}
    </TouchableOpacity>
  );
};

export default TabScreen;
