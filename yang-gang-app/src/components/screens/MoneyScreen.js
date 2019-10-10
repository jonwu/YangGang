import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  StatusBar,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import mathHat from "assets/merch/hat.png";
import yangGangDay from "assets/yanggangday.jpg";
import Header from "./Header";
import { useDimensionStore } from "utils/DimensionUtils";
import { LinearGradient } from "expo-linear-gradient";
import cartoonSrc from "assets/cartoon.png";

const generateStyles = theme => ({});

const Title = ({ title }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View>
      <Text
        style={[
          gstyles.h2_bold,
          {
            color: "white",
            fontFamily: "montserrat-extra-bold",
            marginHorizontal: theme.spacing_2,
            zIndex: 2
          }
        ]}
      >
        {title}
      </Text>
      <View
        style={{
          height: 20,
          backgroundColor: theme.yangRed(),
          marginTop: -20
        }}
      />
    </View>
  );
};

const StepTitle = ({ title }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <Text
      style={[
        gstyles.p1,
        { color: theme.light(), marginVertical: theme.spacing_2 }
      ]}
    >
      {title}
    </Text>
  );
};
const MerchScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { deviceWidth } = useDimensionStore();
  const size = deviceWidth;
  LayoutAnimation.easeInEaseOut();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Header
        close
        bgColor={"black"}
        navigation={navigation}
        title={"Donating Math Hats!"}
      />
      <ScrollView
        style={{
          background: "black",
          flex: 1
          // paddingHorizontal: theme.spacing_2
        }}
      >
        <LinearGradient
          colors={[
            theme.yangLightBlue(),
            theme.yangBlue(),
            theme.yangDarkBlue()
          ]}
          style={{ padding: theme.spacing_2, alignItems: "center" }}
        >
          <Title title={"FREE MONEY"} />
          <View
            style={{
              paddingTop: 50,
              height: 300,
              overflow: "hidden"
            }}
          >
            <Image source={cartoonSrc} style={{ width: 200, height: 200 }} />
          </View>
        </LinearGradient>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: theme.spacing_2,
            paddingVertical: 64,
            paddingBottom: 80
          }}
        >
          <Text style={[gstyles.h3_bold, { color: theme.dark() }]}>
            We want to buy
          </Text>
          <Text
            style={[gstyles.h3_bold, { color: theme.dark() }, gstyles.bottom_1]}
          >
            your next coffee
          </Text>
          <Text style={[gstyles.h4, { color: theme.dark() }]}>
            We will select 5 people at random on Oct. 15 and pay through venmo!
            To participate, follow us on twitter and retweet our post.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: theme.spacing_2,
            paddingVertical: 64
          }}
        >
          <Text style={[gstyles.h3_bold, { color: theme.dark() }]}>
            How To Enter
          </Text>
          <Text
            style={[gstyles.h3_bold, { color: theme.dark() }, gstyles.bottom_1]}
          >
            Into The Giveaway
          </Text>
          <Text style={[gstyles.h4, { color: theme.dark() }]}>
            1. Follow us on twitter{" "}
            <Text
              onPress={() => Linking.openURL("https://twitter.com/TheYangApp")}
              style={[gstyles.h4, { color: theme.blue() }]}
            >
              @TheYangApp
            </Text>
          </Text>
          <Text style={[gstyles.h4, { color: theme.dark() }]}>
            2. Retweet our{" "}
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://twitter.com/TheYangApp/status/1178546068964818944"
                )
              }
              style={[gstyles.h4, { color: theme.blue() }]}
            >
              post!
            </Text>
          </Text>
          <Text style={[gstyles.h4, { color: theme.dark() }]}>
            3. No Twitter? Download the image and share to your favorite social
            platform. Tag #TheYangApp
          </Text>
          <View style={gstyles.top_1}>
            <Text
              onPress={() => Linking.openURL("https://twitter.com/TheYangApp")}
              style={[gstyles.h4, { color: theme.blue() }]}
            >
              Follow us on Twitter
            </Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://twitter.com/TheYangApp/status/1178546068964818944"
                )
              }
              style={[gstyles.h4, { color: theme.blue() }]}
            >
              Retweet this post
            </Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://i.imgur.com/NZZGgVu_d.jpg?maxwidth=640&shape=thumb&fidelity=medium"
                )
              }
              style={[gstyles.h4, { color: theme.blue() }]}
            >
              Download & share on Instagram or FB
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://twitter.com/TheYangApp/status/1178546068964818944"
              )
            }
          >
            <View
              style={{
                backgroundColor: "black",
                paddingVertical: theme.spacing_4,
                borderRadius: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 64
              }}
            >
              <Text style={[gstyles.h4_bold, { color: theme.light() }]}>
                Retweet this post
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[{ alignItems: "center" }, gstyles.top_4]}>
            <Text style={[gstyles.caption_bold, { color: theme.dark() }]}>
              We will announce winner on Oct. 6
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MerchScreen;
