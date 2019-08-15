import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  separator: {
    height: theme.spacing_2
  }
});

const Separator = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return <View style={styles.separator} />;
};

export default Separator;
