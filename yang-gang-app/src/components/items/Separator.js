import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";

const generateStyles = theme => ({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.borderColor
  }
});

const Separator = () => {
  const { styles } = useThemeKit(generateStyles);
  return <View style={styles.separator} />;
};

export default Separator;
