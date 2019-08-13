import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  container: {
    flexDirection: "row",
    padding: theme.spacing_2
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: theme.bg2(),
    marginRight: theme.spacing_3
  },
  header: {
    flexDirection: "row",
    marginBottom: theme.spacing_5
  },
  body: {
    flex: 1
  }
});

const TwitterItem = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[gstyles.p1_bold, gstyles.right_5]}>Andrew Yang</Text>
          <Text style={gstyles.p1_50}>@Andrew Yang - Aug 8</Text>
        </View>
        <Text style={gstyles.p1}>
          Incididunt non nulla incididunt amet enim ut do ipsum. Aliquip sint
          occaecat aliquip sint id. Id sit esse reprehenderit enim elit sint
          veniam.
        </Text>
      </View>
    </View>
  );
};

export default TwitterItem;
