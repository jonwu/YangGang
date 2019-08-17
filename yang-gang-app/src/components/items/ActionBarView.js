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
    padding: theme.spacing_4,
    flex: 1,
  },
  container: {
    backgroundColor: theme.bg2(),
    flexDirection: "row"
  },
});

const ActionBarView = ({children}) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const actionBar = (<View style={styles.container}>
    {/* <ActionBarItem label={'Message'}/> */}
    <ActionBarItem label={'Share'} icon={"ios-share"} />
    <ActionBarItem label={'Open in Reddit'} icon={'logo-reddit'}/>
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
      {icon && <Ionicons name={icon} color={theme.text(0.5)} size={20} style={gstyles.right_4}/>}
      {label && <Text style={gstyles.p1}>{label}</Text>}
    </View>
  );
};

export default ActionBarView;
