import React from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const generateStyles = theme => ({
  headerSafeArea: {
    backgroundColor: theme.bgHeader(),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  header: {
    minHeight: 40,
    paddingHorizontal: 8,
    backgroundColor: theme.bgHeader(),
    alignItems: "center",
    flexDirection: "row"
  }
});

const Back = ({ navigation, btnColor }) => {
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
const Close = ({ navigation, btnColor }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (navigation.isFirstRouteInParent()) return null;

  return (
    <TouchableOpacity
      style={{ padding: 8, height: 40, overflow: "hidden" }}
      onPress={() => navigation.goBack()}
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

const Header = ({
  bgColor,
  renderLeft,
  renderTitle,
  renderRight,
  navigation,
  title,
  close,
  btnColor
}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <SafeAreaView
      style={[styles.headerSafeArea, bgColor && { backgroundColor: bgColor }]}
    >
      <View style={[styles.header, bgColor && { backgroundColor: bgColor }]}>
        <View style={gstyles.flex}>
          {renderLeft ||
            (!close && <Back navigation={navigation} btnColor={btnColor} />)}
          {close && <Close navigation={navigation} btnColor={btnColor} />}
        </View>
        {renderTitle ||
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
          ))}
        <View style={[gstyles.flex, { alignItems: "flex-end" }]}>
          {renderRight}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Header;
