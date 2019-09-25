import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import yanggangday from "assets/yanggangday.jpg";
import family from "assets/family.jpg";

const generateStyles = theme => ({});

const HomeItem = React.memo(({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View>
      <Image
        resizeMode="cover"
        source={item === 0 ? yanggangday : family}
        style={{ height: 512, width: "100%" }}
      />
      <View
        style={{ position: "absolute", bottom: 0, padding: theme.spacing_1 }}
      >
        <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
          Coming 10.5 Saturday
        </Text>
        <Text
          style={[
            gstyles.h1_bold,
            { fontFamily: "montserrat-extra-bold", color: theme.light() }
          ]}
        >
          #NATIONAL
        </Text>
        <Text
          style={[
            gstyles.h1_bold,
            {
              fontFamily: "montserrat-extra-bold",
              color: theme.light(),
              marginTop: -8
            }
          ]}
        >
          YANGGANG DAY
        </Text>
        <View
          style={[
            {
              alignSelf: "flex-start",
              paddingVertical: theme.spacing_3,
              paddingHorizontal: theme.spacing_1,
              backgroundColor: theme.light(),
              borderRadius: 40
            },
            gstyles.top_3
          ]}
        >
          <Text style={[gstyles.p1_bold, { color: theme.dark() }]}>
            Notify Me
          </Text>
        </View>
      </View>
    </View>
  );
});

export default HomeItem;
