import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const SIZE = 100;
const ThemedSticker = ({ source, disabled }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (theme.id === 1) {
    return (
      <View
        style={{
          height: SIZE,
          width: SIZE,
          opacity: disabled ? 0.2 : 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={source}
          style={{
            height: SIZE,
            width: SIZE,
            tintColor: theme.light()
          }}
        />
        <Image
          source={source}
          style={{ height: SIZE - 4, width: SIZE - 4, position: "absolute" }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          height: SIZE,
          width: SIZE,
          opacity: disabled ? 0.2 : 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image source={source} style={{ height: SIZE, width: SIZE }} />
      </View>
    );
  }
};

export default ThemedSticker;
