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
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { openWebBrowser } from "utils/Utils";
import { onboard } from "modules/app/actions";
import { useDispatch } from "react-redux";

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
          backgroundColor: theme.blue(0.7)
        }}
      />
    </View>
  );
};

const RoomItem = React.memo(
  ({ room, navigation, style, showSource, active }) => {
    const {
      id,
      title,
      owner_id,
      created_date,
      tag,
      message_count,
      link
    } = room;
    const { theme, gstyles, styles } = useThemeKit(generateStyles);
    const dispatch = useDispatch();
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
        <View
          style={[
            { padding: theme.spacing_2, backgroundColor: theme.bg3() },
            style
          ]}
        >
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
              color={COLORS[tag] || theme.text(0.3)}
              size={12}
              style={gstyles.right_5}
            />
            <Text
              style={[
                gstyles.caption_bold,
                { color: COLORS[tag] || theme.text(0.3) }
              ]}
            >
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
          <Text style={[gstyles.h5_bold, { fontFamily: "brandon-med" }]}>
            {title}
          </Text>
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
                  {
                    color: theme.blue(0.7),
                    alignItems: "center",
                    fontFamily: "brandon-med"
                  }
                ]}
              >
                {message_count > 0
                  ? `${message_count} messages`
                  : "No messages"}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            {showSource && link != "" && (
              <TouchableOpacity
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={() => {
                  dispatch(onboard("source"));
                  openWebBrowser(link, theme);
                }}
              >
                <Octicons
                  name="link-external"
                  color={theme.text(0.6)}
                  style={gstyles.right_5}
                />
                <Text style={gstyles.footnote_bold_50}>SOURCE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default RoomItem;
