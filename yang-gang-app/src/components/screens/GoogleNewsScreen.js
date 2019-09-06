import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import { useDimensionStore } from "utils/DimensionUtils";

const generateStyles = theme => ({});
// https://news.google.com/search?q=andrew%20yang&hl=en-US&gl=US&ceid=US%3Aen
const GoogleNewsScreen = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { deviceHeight } = useDimensionStore();
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;
  return (
    <WebView
      style={{ height: deviceHeight }}
      javaScriptEnabled={false}
      // injectedJavaScript={INJECTED_JAVASCRIPT}
      // onMessage={event => {
      //   console.log("MESSAGE >>>>" + event.nativeEvent.data);
      // }}
      onNavigationStateChange={navState => {
        console.log("navState", navState.url);
      }}
      source={{
        uri:
          "https://news.google.com/search?q=andrew%20yang&hl=en-US&gl=US&ceid=US%3Aen"
      }}
    />
  );
};

export default GoogleNewsScreen;
