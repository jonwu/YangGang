import * as React from "react";
import {
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  View
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import RedditScreen from "./RedditScreen";
import TwitterScreen from "./TwitterScreen";
import YoutubeScreen from "./YoutubeScreen";
import NewsScreen from "./NewsScreen";
import SettingsScreen from "./SettingsScreen";
import { TabView, TabBar } from "react-native-tab-view";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import pngLogoYang from "assets/logo-yang.png";
import { updateTheme } from "modules/app/actions";
import { useSelector, useDispatch } from "react-redux";
import * as Haptics from "expo-haptics";

const generateStyles = theme => ({
  tabbar: {
    backgroundColor: theme.bgTabs()
  },
  indicator: {
    backgroundColor: theme.indicatorColor
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

const renderIcon = ({ route }) => {
  switch (route.iconType) {
    case "Entypo":
      return <Entypo name={route.icon} size={24} color={route.color} />;
    case "FontAwesome":
      return <FontAwesome name={route.icon} size={24} color={route.color} />;
    default:
      return <Ionicons name={route.icon} size={24} color={route.color} />;
  }
};

const TabScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: "twitter", icon: "logo-twitter", color: "#00aced" },
    {
      key: "reddit",
      icon: "reddit",
      color: "#FF5700",
      iconType: "FontAwesome"
    },
    { key: "youtube", icon: "logo-youtube", color: "#FF0000" },
    {
      key: "news",
      icon: "newspaper-o",
      iconType: "FontAwesome",
      color: theme.darkGreen()
    },
    {
      key: "settings",
      icon: "md-settings",
      // iconType: "FontAwesome",
      color: theme.text()
    }
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "twitter":
        return <TwitterScreen navigation={navigation} />;
      case "reddit":
        return <RedditScreen navigation={navigation} />;
      case "youtube":
        return <YoutubeScreen navigation={navigation} />;
      case "news":
        return <NewsScreen navigation={navigation} />;
      case "settings":
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    return (
      <SafeAreaView style={{ backgroundColor: theme.bgTabs() }}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          renderIcon={renderIcon}
          style={styles.tabbar}
        />
      </SafeAreaView>
    );
  };

  let statusBar = <StatusBar barStyle="light-content" />;
  if (Platform.OS === "ios" && theme.id === 0) {
    statusBar = <StatusBar barStyle="dark-content" />;
  }

  return (
    <React.Fragment>
      {statusBar}
      {/* <Header
        renderTitle={<YangLogo />}
        // renderRight={<ThemeIcon />}
        navigation={navigation}
      /> */}
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
        tabBarPosition={"top"}
        style={{ backgroundColor: theme.bg2() }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ height: 0, width: Dimensions.get("window").width }}
      />
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate("Progress");
        }}
        style={{
          position: "absolute",
          bottom: theme.spacing_2,
          right: theme.spacing_2
        }}
      >
        <SafeAreaView>
          <View
            style={{
              height: 56,
              width: 56,
              borderRadius: 56,
              backgroundColor: theme.fab,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              name="chart-bar"
              color={theme.light()}
              size={24}
            />
          </View>
        </SafeAreaView>
      </TouchableOpacity>
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
    </TouchableOpacity>
  );
};

export default TabScreen;
