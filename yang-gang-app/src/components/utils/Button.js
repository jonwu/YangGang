import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const Button = ({ style, textStyle, text, bgColor, onPress }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: bgColor || theme.blue(),
            paddingVertical: theme.spacing_2,
            paddingHorizontal: theme.spacing_1,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center"
          }
        ]}
      >
        <Text style={[gstyles.h4_bold, { color: theme.light() }, textStyle]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
