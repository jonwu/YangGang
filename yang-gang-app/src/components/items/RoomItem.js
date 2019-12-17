import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

const generateStyles = theme => ({});

const MessageStatus = ({ active }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const sizeValue = React.useRef(new Animated.Value(0));
  const borderRadiusValue = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    if (active) {
      const startState = Animated.parallel([
        Animated.timing(sizeValue.current, {
          toValue: 0,
          duration: 500
        }),
        Animated.timing(borderRadiusValue.current, {
          toValue: 0,
          duration: 500
        })
      ]);

      const endState = Animated.parallel([
        Animated.timing(sizeValue.current, {
          toValue: 16,
          duration: 1000,
          ease: Easing.sin
        }),
        Animated.timing(borderRadiusValue.current, {
          toValue: 8,
          duration: 1000,
          ease: Easing.sin
        })
      ]);

      Animated.loop(Animated.sequence([endState, startState])).start();
    }
  }, active);
  return (
    <View
      style={{
        width: 20,
        marginLeft: -6,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          height: sizeValue.current,
          width: sizeValue.current,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: borderRadiusValue.current,
          backgroundColor: theme.blue(0.2)
        }}
      ></Animated.View>
      <View
        style={{
          height: 8,
          width: 8,
          borderRadius: 4,
          backgroundColor: theme.blue()
        }}
      />
    </View>
  );
};

const RoomItem = React.memo(({ room, navigation, style }) => {
  const {
    id,
    title,
    owner_id,
    created_date,
    tag,
    message_count,
    active
  } = room;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);

  const COLORS = {
    breaking: theme.red(),
    hype: theme.yangGold(),
    minor: theme.text(0.3)
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { roomId: id })}
      disabled={!navigation}
    >
      <View style={[{ padding: theme.spacing_2 }, style]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center"
            },
            gstyles.bottom_4
          ]}
        >
          <FontAwesome
            name="bell"
            color={COLORS[tag]}
            size={12}
            style={gstyles.right_5}
          />

          <Text style={[gstyles.caption_bold, { color: COLORS[tag] }]}>
            {tag.toUpperCase()}
          </Text>
          <View
            style={{
              height: 4,
              width: 4,
              borderRadius: 2,
              marginHorizontal: theme.spacing_4,
              backgroundColor: theme.text(0.3)
            }}
          />
          <Text style={[gstyles.caption_50]}>
            {moment.utc(created_date).fromNow(true)}
          </Text>
        </View>
        <Text style={gstyles.p1}>{title}</Text>
        <View
          style={[
            { flexDirection: "row", justifyContent: "space-between" },
            gstyles.top_4
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MessageStatus active={active} />
            <Text
              style={[
                gstyles.p1,
                { color: theme.blue(), alignItems: "center" }
              ]}
            >
              {message_count} messages
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EvilIcons
              color={theme.blue()}
              name="external-link"
              size={20}
              style={{ marginTop: 2 }}
            />
            <Text
              style={[
                gstyles.caption,
                { color: theme.blue(), alignItems: "center" }
              ]}
            >
              LINK
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default RoomItem;
