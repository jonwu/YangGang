import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import imgYg from "assets/stickers/yg.png";
import imgMath from "assets/stickers/math.png";
import imgUbi from "assets/stickers/ubi.png";
import imgLit from "assets/stickers/lit.png";
import imgAndrew from "assets/stickers/andrew.png";
import ThemedSticker from "utils/ThemedSticker";
import lodash from "lodash";
import Button from "components/utils/Button";
import { updateModal } from "modules/app/actions";
import { sendMessage } from "modules/chat/actions";
import * as Amplitude from "expo-analytics-amplitude";
import { EVENT_CLICK_PATRON_PANDA } from "utils/AnalyticsUtils";

const generateStyles = theme => ({});

const data = [
  { id: "yg", sticker: imgYg, patrons: 3 },
  { id: "math", sticker: imgMath, patrons: 5 },
  { id: "ubi", sticker: imgUbi, patrons: 10 },
  { id: "andrew", sticker: imgAndrew, patrons: 15 },
  { id: "lit", sticker: imgLit, patrons: 20 }
];

const currentPatron = 3;

const PandaItem = React.memo(({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const disabled = item.patrons > currentPatron;
  const currentRoomId = useSelector(state => state.chat.currentRoomId);
  const user = useSelector(state => state.settings.user);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (!user.username) {
          dispatch(updateModal("panda", false));
          dispatch(updateModal("username", true));
          return;
        }

        dispatch(updateModal("panda", false));
        sendMessage({
          userId: user.id,
          roomId: currentRoomId,
          message: "{This is a sticker}",
          sticker: "yg"
        });
      }}
    >
      <View style={{ alignItems: "center" }}>
        <ThemedSticker source={item.sticker} disabled={disabled} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing_2,
            paddingHorizontal: theme.spacing_4,
            paddingVertical: theme.spacing_5,
            backgroundColor: null,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: disabled ? theme.text(0.1) : theme.blue(0.5)
          }}
        >
          {disabled && (
            <Ionicons
              name="ios-lock"
              size={12}
              color={theme.text(0.4)}
              style={{ marginRight: theme.spacing_5 }}
            />
          )}
          <Text
            style={[
              gstyles.caption_bold,

              { color: disabled ? theme.text(0.5) : theme.blue() }
            ]}
          >
            {item.patrons} patrons
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const Chunks = React.memo(({ chunks }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
      {chunks.map(chunk => {
        return <PandaItem item={chunk} key={chunk.id} />;
      })}
    </View>
  );
});
const renderSeparator = React.memo(() => {
  return <View style={{ width: 48 }} />;
});
const PandaList = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  // const chunks = lodash.chunk(data, 2);

  return (
    <>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          gstyles.bottom_2
        ]}
      >
        <MaterialCommunityIcons
          name="castle"
          size={36}
          color={theme.green()}
          style={gstyles.right_4}
        />

        <View style={[{ marginTop: -4 }]}>
          <Text style={[gstyles.caption_bold, { color: theme.green() }]}>
            <Text style={{ fontSize: 20 }}>{currentPatron} </Text>PATRONS
          </Text>
          <Text
            style={[
              gstyles.footnote,
              { color: theme.text(0.5), marginTop: -2 }
            ]}
          >
            updates every 24 hours*
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <Button
          text="Donate!"
          bgColor={theme.green()}
          buttonStyle={{
            paddingVertical: theme.spacing_5,
            paddingHorizontal: theme.spacing_2
          }}
          onPress={() => {
            Amplitude.logEvent(EVENT_CLICK_PATRON_PANDA);
            dispatch(updateModal("panda", false));
            dispatch(updateModal("donation", true));
          }}
          textStyle={gstyles.caption_bold}
        />
      </View>
      <FlatList
        horizontal
        style={{ marginHorizontal: -1 * theme.spacing_2 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: theme.spacing_2 }}
        data={data}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => <PandaItem item={item} />}
      />
    </>
  );
};

export default PandaList;
