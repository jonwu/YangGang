import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.borderColor
  }
});

const Separator = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return <View style={styles.separator} />;
};

export default Separator;
