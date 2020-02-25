import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

import yangImg from "assets/yang.jpg";
import sandersImg from "assets/sanders.jpg";
import warrenImg from "assets/warren.jpg";
import buttigiegImg from "assets/buttigieg.jpg";
import bidenImg from "assets/biden.jpg";
import gabbardImg from "assets/gabbard.jpg";
import trumpImg from "assets/trump.jpg";
import white_house from "assets/white_house.png";

import lodash from "lodash";
import { useDimensionStore } from "utils/DimensionUtils";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import { updateCandidate } from "modules/app/actions";

const generateStyles = theme => ({});

const Candidate = ({ candidate, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { name, image, key } = candidate;
  const { deviceWidth } = useDimensionStore();
  const dispatch = useDispatch();
  const imageWidth = deviceWidth / 2 - 24;

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(updateCandidate(key));
        navigation.navigate("App");
      }}
    >
      <View
        style={{
          borderRadius: 4,
          // borderWidth: 1,
          // borderColor: theme.borderColor,
          overflow: "hidden",
          backgroundColor: theme.dark()
        }}
      >
        <Image
          source={image}
          style={{ width: imageWidth, height: (imageWidth * 3) / 4 }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />

        <Text
          style={[
            gstyles.p1_bold,
            { bottom: 8, left: 8, position: "absolute", color: theme.light() }
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DuoCandidate = ({ item, navigation }) => {
  const c1 = item[0];
  const c2 = item[1];

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        {c1 && <Candidate candidate={c1} navigation={navigation} />}
      </View>
      <View style={{ width: 16 }} />
      <View style={{ flex: 1 }}>
        {c2 && <Candidate candidate={c2} navigation={navigation} />}
      </View>
    </View>
  );
};

export const data = [
  {
    name: "Andrew Yang",
    image: yangImg,
    key: "andrew_yang"
  },
  {
    name: "Bernie Sanders",
    image: sandersImg,
    key: "bernie_sanders"
  },
  {
    name: "Elizabeth Warren",
    image: warrenImg,
    key: "elizabeth_warren"
  },
  {
    name: "Pete Buttigieg",
    image: buttigiegImg,
    key: "pete_buttigieg"
  },
  {
    name: "Joe Biden",
    image: bidenImg,
    key: "joe_biden"
  },
  {
    name: "Tulsi Gabbard",
    image: gabbardImg,
    key: "tulsi_gabbard"
  },
  {
    name: "Donald Trump",
    image: trumpImg,
    key: "donald_trump"
  }
];

const renderHeader = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing_1,
        paddingTop: 0
      }}
    >
      <View
        style={{
          height: 160,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={white_house}
          style={{ width: 220, height: 220, tintColor: theme.light(0.5) }}
        />
      </View>
      <Text style={[gstyles.h3_bold, { color: theme.light() }]}>
        Choose a Candidate
      </Text>
      <Text
        style={[gstyles.p1, { color: theme.light(0.5), textAlign: "center" }]}
      >
        Get quick access to their social networks including twitter, reddit,
        instagram, and google news!
      </Text>
    </View>
  );
};
const renderSeparator = () => {
  return <View style={{ height: 16 }} />;
};
const OnboardScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const chunks = lodash.chunk(data, 2);
  return (
    <View style={{ flex: 1, backgroundColor: theme.dark() }}>
      <SafeAreaView />
      <StatusBar barStyle="light-content" />
      <FlatList
        data={chunks}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={{ paddingHorizontal: theme.spacing_2 }}
        renderItem={({ item }) => (
          <DuoCandidate item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default OnboardScreen;
