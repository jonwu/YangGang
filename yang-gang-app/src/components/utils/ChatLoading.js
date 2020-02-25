import React from "react";
import { View, Text, Animated, Easing } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const placeholderRowWidth = () => {
  const nStart = Math.floor(Math.random() * 10);
  const n = Math.sin(nStart) * 10000;
  return (n - Math.floor(n)) * 40 + 60;
};

const ChatLoading = ({ style }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const rows = new Array(21).fill(undefined);
  const rowOpacity = React.useRef(new Animated.Value(0.7));
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rowOpacity.current, {
          toValue: 0.3,
          duration: 1300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(rowOpacity.current, {
          toValue: 0.7,
          duration: 1300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  });

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.bg3(),
          paddingHorizontal: theme.spacing_2
        },
        style
      ]}
    >
      {rows.map((_, i) => {
        return (
          <Animated.View
            key={i}
            style={{
              height: 24,
              width: `${placeholderRowWidth()}%`,
              opacity: rowOpacity.current,
              marginVertical: theme.spacing_4,
              backgroundColor: theme.text(0.1),
              borderRadius: theme.borderRadius
            }}
          />
        );
      })}
    </View>
  );
};

export default ChatLoading;
