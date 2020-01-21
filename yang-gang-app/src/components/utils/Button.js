import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const Button = ({ style, textStyle, buttonStyle, text, bgColor, onPress }) => {
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
          },
          buttonStyle
        ]}
      >
        <Text style={[gstyles.h4_bold, textStyle, { color: theme.light() }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
