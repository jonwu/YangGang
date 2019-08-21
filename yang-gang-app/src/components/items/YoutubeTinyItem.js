import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const YoutubeTinyItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return <View />;
};

export default YoutubeTinyItem;
