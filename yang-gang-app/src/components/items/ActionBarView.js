import React from "react";
import { View, Text, TouchableOpacity, Linking, Share } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

const generateStyles = theme => ({
  item: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: theme.spacing_4
  },
  container: {
    backgroundColor: theme.bg2(),
    flexDirection: "row"
  }
});

const ActionBarView = ({ children, openLabel, openIcon, link, message }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const actionBar = (
    <View style={styles.container}>
      <ActionBarItem
        label={"Share"}
        icon={"share-square"}
        onPress={() => {
          Share.share({
            message: `${message}${"\n\n"}${link}`
          });
        }}
      />
      <ActionBarItem
        label={openLabel}
        icon={openIcon}
        onPress={() => Linking.openURL(link)}
      />
    </View>
  );

  return (
    <View
    // style={{
    //   marginHorizontal: theme.spacing_2,
    //   marginVertical: theme.spacing_4,
    //   borderRadius: 8,
    //   overflow: "hidden"
    // }}
    >
      {children}
      {actionBar}
    </View>
  );
};

const ActionBarItem = ({ label, icon, onPress }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <View style={styles.item}>
        {icon && (
          <FontAwesome
            name={icon}
            size={16}
            style={gstyles.right_5}
            color={theme.text()}
          />
        )}
        {label && <Text style={gstyles.p1}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ActionBarView;
