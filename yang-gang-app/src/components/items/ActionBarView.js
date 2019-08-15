import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const generateStyles = theme => ({
  item: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  container: {
    flexDirection: "row"
  },
});

const ActionBarView = ({children}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const actionBar = (<View style={styles.container}>
    <ActionBarItem label={'Message'}/>
    <ActionBarItem label={'Share'}/>
    <ActionBarItem label={'Open'}/>
  </View>)

  return <View>
    {children}
    {actionBar}
  </View>
};

const ActionBarItem = ({ label, icon }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={styles.item}>
      {icon && <Ionicons name={icon} size={24}/>}
      {label && <Text style={gstyles.caption}>{label}</Text>}
    </View>
  );
};

export default ActionBarView;
