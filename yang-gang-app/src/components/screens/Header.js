import React from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";

const generateStyles = theme => ({});

export const Back = ({ navigation, btnColor }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (navigation.isFirstRouteInParent()) return null;

  return (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons
        name={"ios-arrow-back"}
        color={btnColor || theme.light()}
        size={24}
      />
    </TouchableOpacity>
  );
};
export const Close = ({ navigation, btnColor }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  // if (navigation.isFirstRouteInParent()) return null;

  return (
    <TouchableOpacity
      style={{ padding: 8, height: 40, overflow: "hidden" }}
      onPress={() => navigation.dispatch(NavigationActions.back())}
    >
      <Ionicons
        name={"ios-close"}
        color={btnColor || theme.light()}
        size={36}
        style={{ marginTop: -6 }}
      />
    </TouchableOpacity>
  );
};

const Navigator = ({
  bgColor,
  renderLeft,
  renderTitle,
  renderRight,
  navigation,
  title,
  close,
  btnColor,
  children
}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const Left = (
    <View style={gstyles.flex}>
      {renderLeft ||
        (!close && <Back navigation={navigation} btnColor={btnColor} />)}
      {close && <Close navigation={navigation} btnColor={btnColor} />}
    </View>
  );

  const Middle =
    renderTitle ||
    (title && (
      <View style={[gstyles.flex, { alignItems: "center" }]}>
        {renderTitle}
        {title && !renderTitle && (
          <Text
            numberOfLines={1}
            style={[
              gstyles.p1_bold,
              {
                color: btnColor || theme.light(),
                width: 200,
                textAlign: "center"
              }
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    ));

  const Right = (
    <View style={[gstyles.flex, { alignItems: "flex-end" }]}>
      {renderRight}
    </View>
  );

  const Header = (
    <View
      style={[
        {
          minHeight: 40,
          paddingHorizontal: 8,
          backgroundColor: theme.bgHeader(),
          alignItems: "center",
          flexDirection: "row"
        },
        bgColor && { backgroundColor: bgColor }
      ]}
    >
      {Left}
      {Middle}
      {Right}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 1
        },
        bgColor && { backgroundColor: bgColor }
      ]}
    >
      {Header}
    </SafeAreaView>
  );
};
export default Navigator;
