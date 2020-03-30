import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import OnboardScreen from "./OnboardScreen";

const generateStyles = theme => ({});

const OnboardMainScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} close bgColor={theme.black()} />
      <OnboardScreen navigation={navigation} nosafe />
    </View>
  );
};

export default OnboardMainScreen;
