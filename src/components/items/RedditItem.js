import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  body: {
    padding: theme.spacing_2
  },
  thumbnail: {
    minHeight: 300,
    width: "100%",
    backgroundColor: theme.bg2()
  }
});

const TwitterItem = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);

  return (
    <View>
      <View style={styles.body}>
        <Text style={[gstyles.p1_50, gstyles.bottom_2]}>u/jonwuster - 23h</Text>
        <Text style={[gstyles.h4_bold, gstyles.bottom_5]}>
          r/YangForPresidentHQ
        </Text>
        <Text style={[gstyles.p1, gstyles.bottom_5]}>
          Incididunt non nulla incididunt amet enim ut do ipsum. Aliquip sint
          occaecat aliquip sint id. Id sit esse reprehenderit enim elit sint
          veniam.
        </Text>
      </View>
      <Image style={styles.thumbnail} />
    </View>
  );
};

export default TwitterItem;
