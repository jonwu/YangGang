import React from "react";
import { View } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import { useDimensionStore } from "utils/DimensionUtils";
import { WebView } from "react-native-webview";

const YoutubeWebviewScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const uri = navigation.getParam("uri");
  const { deviceWidth } = useDimensionStore();

  return (
    <React.Fragment>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: theme.dark() }}>
        <View style={{ flex: 1 }} />
        <View style={{ width: deviceWidth, height: (deviceWidth * 9) / 16 }}>
          <WebView
            javaScriptEnabled
            source={{ uri }}
            bounces={false}
            scrollEnabled={false}
            useWebKit={true}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </React.Fragment>
  );
};

export default YoutubeWebviewScreen;
