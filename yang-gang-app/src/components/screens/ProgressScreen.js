import React, { useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import {
  useStatsStore,
  useRefreshStats,
  useInstantRefreshStats
} from "utils/StoreUtils";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import moment, { max } from "moment-timezone";
import { transformN } from "utils/Utils";
import yangImg from "assets/yang.jpg";
import sandersImg from "assets/sanders.jpg";
import warrenImg from "assets/warren.jpg";
import buttigiegImg from "assets/buttigieg.jpg";
import bidenImg from "assets/biden.jpg";
import kamalaImg from "assets/kamala.jpg";
import { LinearGradient } from "expo-linear-gradient";
import instagramIcon from "assets/instagram.png";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import Loading from "components/utils/Loading";
import { useDimensionStore } from "utils/DimensionUtils";

const generateStyles = theme => ({});

const IMAGES = {
  yang: yangImg,
  sanders: sandersImg,
  warren: warrenImg,
  buttigieg: buttigiegImg,
  biden: bidenImg,
  kamala: kamalaImg
};
const CompareText = ({ value1, value2, label }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={[{ flexDirection: "row" }, gstyles.bottom_4]}>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text style={[gstyles.caption, { color: theme.light() }]}>
          {value1 ? transformN(value1) : "-"}
        </Text>
      </View>
      <Text
        style={[
          gstyles.caption_bold,
          { marginHorizontal: theme.spacing_2, color: theme.light(0.5) }
        ]}
      >
        {label}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={[gstyles.caption, { color: theme.light() }]}>
          {value2 ? transformN(value2) : "-"}
        </Text>
      </View>
    </View>
  );
};

const BarGraph = ({ value1, value2, Icon, label }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  value1 = Number(value1);
  value2 = Number(value2);
  const total = Math.max(value1 + value2, 1);
  const pct1 = Math.floor((value1 / total) * 100);
  const pct2 = Math.floor((value2 / total) * 100);
  return (
    <View style={[{ alignItems: "center" }, gstyles.bottom_2]}>
      {/* <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Text
          style={[gstyles.p1_bold, gstyles.left_3, { color: theme.light() }]}
        >
          {label}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        <View
          style={{
            width: 56,
            alignItems: "center"
          }}
        >
          <Text style={[gstyles.caption, { color: theme.light() }]}>
            {value1 ? value1 : "--"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderRadius: 4,
            overflow: "hidden",
            justifyContent: "flex-end",
            flex: 1
          }}
        >
          <View
            style={{
              width: `${pct1}%`,
              borderRadius: 4,
              backgroundColor:
                pct1 >= pct2 ? theme.blue(0.6) : theme.light(0.5),
              height: 8
            }}
          />
        </View>
        <View style={{ marginHorizontal: theme.spacing_4 }}>{Icon}</View>
        <View
          style={{
            flexDirection: "row",
            overflow: "hidden",
            flex: 1
          }}
        >
          <View
            style={{
              borderRadius: 4,
              width: `${pct2}%`,
              height: 8,
              backgroundColor: pct1 <= pct2 ? theme.red(0.6) : theme.light(0.5)
            }}
          />
        </View>

        <View
          style={{
            width: 56,
            alignItems: "center"
          }}
        >
          <Text style={[gstyles.caption, { color: theme.light() }]}>
            {value2 ? value2 : "--"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const generateDelta = data => {
  const startYesterday = moment()
    .tz("America/New_York")
    .subtract(1, "day")
    .set({ hour: 9, minute: 30 });

  const startToday = moment()
    .tz("America/New_York")
    .set({ hour: 9, minute: 30 });

  const start = moment().isSameOrAfter(startToday)
    ? startToday
    : startYesterday;
  const points = data.reduce(
    (points, stats) => {
      if (moment(stats.id).isBefore(start)) {
        return { today: stats, yesterday: stats };
      } else if (moment(stats.id).isSameOrAfter(start)) {
        return { ...points, today: stats };
      }
    },
    { yesterday: null, latest: null }
  );
  return {
    biden:
      Number(points.today.num_followers_biden) -
      Number(points.yesterday.num_followers_biden),
    buttigieg:
      Number(points.today.num_followers_buttigieg) -
      Number(points.yesterday.num_followers_buttigieg),
    sanders:
      Number(points.today.num_followers_sanders) -
      Number(points.yesterday.num_followers_sanders),
    warren:
      Number(points.today.num_followers_warren) -
      Number(points.yesterday.num_followers_warren),
    kamala:
      Number(points.today.num_followers_kamala) -
      Number(points.yesterday.num_followers_kamala),
    yang:
      Number(points.today.num_followers_yang) -
      Number(points.yesterday.num_followers_yang),
    ...points
  };
};

const ConnectedHeader = connectActionSheet(
  ({ navigation, showActionSheetWithOptions, setCandidate }) => {
    const { theme, gstyles, styles } = useThemeKit(generateStyles);
    const options = [
      "Bernie Sanders",
      "Joe Biden",
      "Elizabeth Warren",
      "Pete Buttigieg",
      "Kamala Harris",
      "Cancel"
    ];
    const optionsKeys = ["sanders", "biden", "warren", "buttigieg", "kamala"];
    const cancelButtonIndex = 5;
    return (
      <Header
        close
        bgColor={"black"}
        navigation={navigation}
        renderRight={
          <TouchableOpacity
            style={{ marginRight: theme.spacing_3 }}
            onPress={() =>
              showActionSheetWithOptions(
                { options, cancelButtonIndex },
                buttonIndex => {
                  if (buttonIndex !== cancelButtonIndex) {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    setCandidate(optionsKeys[buttonIndex]);
                  }
                }
              )
            }
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
                Choose Candidate
              </Text>
              <Ionicons
                name={"ios-arrow-round-down"}
                size={16}
                color={theme.light()}
                style={[gstyles.left_4, { marginTop: 1 }]}
              />
            </View>
          </TouchableOpacity>
        }
      />
    );
  }
);
const Screen = ({ navigation }) => {
  const loadingStats = useSelector(state => state.loading.stats);
  const refreshStats = useRefreshStats();
  const fetch = useInstantRefreshStats();
  React.useEffect(() => {
    refreshStats();
  }, []);
  if (!loadingStats.isReceived) {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Header close bgColor={"black"} navigation={navigation} />
        <Loading
          error={loadingStats.error}
          errorKey={"loan"}
          errorRefresh={fetch}
          forceLight
        />
      </View>
    );
  } else {
    return <ProgressScreen navigation={navigation} />;
  }
};
const ProgressScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const twitterStats = useStatsStore(state => state.twitterStats);
  const redditStats = useStatsStore(state => state.redditStats);
  const instagramStats = useStatsStore(state => state.instagramStats);
  const [candidate, setCandidate] = React.useState("sanders");
  const { deviceHeight } = useDimensionStore();
  const twitterDelta = generateDelta(twitterStats);
  const redditDelta = generateDelta(redditStats);
  const instagramDelta = generateDelta(instagramStats);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <ConnectedHeader navigation={navigation} setCandidate={setCandidate} />
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image
                source={IMAGES.yang}
                style={{
                  backgroundColor: theme.light(0.1),
                  height: deviceHeight * 0.35,
                  width: "100%"
                }}
                resizeMode={"cover"}
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
            </View>
            <View style={{ flex: 1 }}>
              <Image
                source={IMAGES[candidate]}
                style={{
                  backgroundColor: theme.light(0.1),
                  height: deviceHeight * 0.35,
                  width: "100%"
                }}
                resizeMode={"cover"}
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
            </View>
          </View>

          <View style={{ padding: theme.spacing_2, alignItems: "center" }}>
            <View style={[{ alignItems: "center" }, gstyles.bottom_1]}>
              <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
                Today's Growth
              </Text>
              <Text style={[gstyles.caption_bold, { color: theme.light(0.5) }]}>
                Begins 9:30 a.m. Eastern Time
              </Text>
            </View>
            <BarGraph
              value1={twitterDelta.yang}
              value2={twitterDelta[candidate]}
              Icon={
                <Ionicons name={"logo-twitter"} size={16} color={"#00aced"} />
              }
            />
            <BarGraph
              value1={redditDelta.yang}
              value2={redditDelta[candidate]}
              Icon={<FontAwesome name={"reddit"} size={16} color={"#FF5700"} />}
            />
            <BarGraph
              value1={instagramDelta.yang}
              value2={instagramDelta[candidate]}
              Icon={
                <Image
                  source={instagramIcon}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
          </View>
          <View
            style={[
              { alignItems: "center", padding: theme.spacing_2 },
              gstyles.bottom_1
            ]}
          >
            <Text
              style={[
                gstyles.p1_bold,
                { color: theme.light() },
                gstyles.bottom_3
              ]}
            >
              Total Subscribers
            </Text>
            <BarGraph
              value1={twitterDelta.today.num_followers_yang}
              value2={twitterDelta.today[`num_followers_${candidate}`]}
              Icon={
                <Ionicons name={"logo-twitter"} size={16} color={"#00aced"} />
              }
            />
            <BarGraph
              value1={redditDelta.today.num_followers_yang}
              value2={redditDelta.today[`num_followers_${candidate}`]}
              Icon={<FontAwesome name={"reddit"} size={16} color={"#FF5700"} />}
            />
            <BarGraph
              value1={instagramDelta.today.num_followers_yang}
              value2={instagramDelta.today[`num_followers_${candidate}`]}
              Icon={
                <Image
                  source={instagramIcon}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Screen;
