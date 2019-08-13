import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  item: {
    alignItems: "center",
    flexDirection: "row"
  }
});

const ActionBar = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return <View />;
};

const ActionBarItem = ({ label }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={styles.item}>
      <Text style={gstyles.p1}>{label}</Text>
    </View>
  );
};

export default ActionBar;
