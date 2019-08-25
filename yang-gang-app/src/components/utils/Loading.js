import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const Loading = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator
        size="large"
        color={theme.loadingColor}
        style={{ marginBottom: 100 }}
      />
    </View>
  );
};

export default Loading;
