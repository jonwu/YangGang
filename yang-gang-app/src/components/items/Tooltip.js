import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Animated, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";

class ToolTip extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    opacity: new Animated.Value(0),
    top: new Animated.Value(0)
  };

  handleFadeIn = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        delay: 500
      }),
      this.bounce()
    ]).start();
  };

  bounce = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.top, {
          toValue: 4,
          duration: 500
        }),
        Animated.timing(this.state.top, {
          toValue: 0,
          duration: 500
        })
      ])
    );
  };

  componentDidMount() {
    this.handleFadeIn();
  }

  render() {
    const { opacity, top } = this.state;
    const { gstyles, theme, right, tipRight, text, onPress } = this.props;

    return (
      <Animated.View
        style={{
          position: "absolute",
          opacity,
          top,
          right: right || 8,
          zIndex: 99
        }}
      >
        <View
          style={{
            width: 0,
            height: 0,
            alignSelf: "flex-end",
            marginRight: tipRight || 32,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderBottomWidth: 8,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: theme.red()
          }}
        />
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              backgroundColor: theme.red(),
              padding: theme.spacing_4,
              borderRadius: theme.borderRadius
            }}
          >
            <Text style={[gstyles.caption_bold, { color: theme.light() }]}>
              {text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const TooltipContainer = props => {
  const { theme, gstyles } = useThemeKit();
  return <ToolTip theme={theme} gstyles={gstyles} {...props} />;
};

export default TooltipContainer;
