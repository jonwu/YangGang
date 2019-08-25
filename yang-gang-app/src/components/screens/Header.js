import React from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const generateStyles = theme => ({
  headerSafeArea: {
    backgroundColor: theme.bgHeader()
  },
  header: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: theme.bgHeader(),
    alignItems: "center",
    flexDirection: "row"
  }
});

const Back = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (navigation.isFirstRouteInParent()) return null;

  return (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name={"ios-arrow-back"} color={theme.light()} size={24} />
    </TouchableOpacity>
  );
};

const Header = ({
  bgColor,
  renderLeft,
  renderTitle,
  renderRight,
  navigation,
  title
}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <SafeAreaView
      style={[styles.headerSafeArea, bgColor && { backgroundColor: bgColor }]}
    >
      <View style={[styles.header, bgColor && { backgroundColor: bgColor }]}>
        <View style={gstyles.flex}>
          {renderLeft || <Back navigation={navigation} />}
        </View>
        <View style={[gstyles.flex, { alignItems: "center" }]}>
          {renderTitle}
          {title && !renderTitle && (
            <Text
              numberOfLines={1}
              style={[gstyles.p1_bold, { color: theme.light(), width: 200 }]}
            >
              {title}
            </Text>
          )}
        </View>
        <View style={[gstyles.flex, { alignItems: "flex-end" }]}>
          {renderRight}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Header;
