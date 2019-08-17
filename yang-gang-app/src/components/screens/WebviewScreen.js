import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Header from './Header';

const WebviewScreen = ({navigation}) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const uri = navigation.getParam('uri');
  console.log(navigation)
  return (
    <React.Fragment>
      <Header navigation={navigation} />
      <WebView
        style={{flex: 1}}
        javaScriptEnabled
        source={{uri}}
      />
    </React.Fragment>
  );
};

export default WebviewScreen;
