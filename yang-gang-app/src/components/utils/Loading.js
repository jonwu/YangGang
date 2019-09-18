import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
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
      {Platform.OS === "ios" ? (
        <DotsLoader color={theme.red()} />
      ) : (
        <ActivityIndicator size="large" color={theme.red()} />
      )}
    </View>
  );
};

export default Loading;
