import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { DotsLoader } from "react-native-indicator";

const generateStyles = theme => ({});

const Loading = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginBottom: 80
      }}
    >
      <DotsLoader color={theme.yang()} />
    </View>
  );
};

export default Loading;
