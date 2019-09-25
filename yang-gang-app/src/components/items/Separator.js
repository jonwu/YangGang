import React from "react";
import { View } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";

const generateStyles = theme => ({
  separator: {
    height: theme.spacing_5
  }
});

const Separator = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return <View style={styles.separator} />;
};

export default Separator;
