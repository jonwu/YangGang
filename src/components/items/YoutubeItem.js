import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({
  container: {
    flexDirection: "row",
    padding: theme.spacing_2
  },
  body: {
    flex: 1
  },
  thumbnail: {
    height: 96,
    flex: 1,
    marginRight: theme.spacing_2,
    backgroundColor: theme.bg2()
  }
});

const YoutubeItem = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} />
      <View style={styles.body}>
        <Text numberOfLines={3} style={[gstyles.p1_bold, gstyles.bottom_5]}>
          Incididunt non nulla incididunt amet enim ut do ipsum. Aliquip sint
          occaecat aliquip sint id. Id sit esse reprehenderit enim elit sint
          veniam.
        </Text>
        <Text style={[gstyles.caption_50]}>NBC News</Text>
        <Text style={[gstyles.caption_50]}>145K views - 1 day ago</Text>
      </View>
    </View>
  );
};

export default YoutubeItem;
