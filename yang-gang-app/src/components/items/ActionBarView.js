import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

const generateStyles = theme => ({
  item: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: theme.spacing_4,
    flex: 1
  },
  container: {
    backgroundColor: theme.bg2(),
    flexDirection: "row"
  }
});

const ActionBarView = ({ children, openLabel, openIcon }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const actionBar = (
    <View style={styles.container}>
      <ActionBarItem label={"Share"} icon={"share-square"} />
      <ActionBarItem label={openLabel} icon={openIcon} />
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

const ActionBarItem = ({ label, icon }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
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
  );
};

export default ActionBarView;
