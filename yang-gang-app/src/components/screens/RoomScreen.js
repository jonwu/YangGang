import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Loading from "components/utils/Loading";
import Separator from "components/items/Separator";
import Header from "./Header";
import OptionBars from "components/items/OptionsBar";

const generateStyles = theme => ({});

const DummyRooms = [
  {
    id: 0,
    messageCount: 45,
    title: "Yang @ 5% in New Hampshire MassINC/WBUR poll",
    link: "https://twitter.com/Politics_Polls/status/1204716978499289089",
    tag: "breaking"
  },
  {
    id: 1,
    messageCount: 15,
    title: "Yang @ 5% in New Hampshire MassINC/WBUR poll",
    link: "https://twitter.com/Politics_Polls/status/1204716978499289089",
    tag: "hype"
  },
  {
    id: 2,
    messageCount: 11,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 3,
    messageCount: 17,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 4,
    messageCount: 8,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 5,
    messageCount: 2,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 6,
    messageCount: 10,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 7,
    messageCount: 10,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  }
];

const Room = React.memo(({ room, navigation }) => {
  const { id, title, owner_id, created_date, tag, messageCount } = room;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  console.log("id in room is:", id);

  const COLORS = {
    breaking: theme.red(),
    hype: theme.yangGold(),
    minor: theme.text(0.4)
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { roomId: id })}
    >
      <View style={[{ padding: theme.spacing_2 }]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center"
              // borderRadius: theme.borderRadius,
              // padding: theme.spacing_5,
              // backgroundColor: COLORS[tag],
              // alignSelf: "flex-start"
            },
            gstyles.bottom_4
          ]}
        >
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 3,
              backgroundColor: COLORS[tag],
              marginRight: theme.spacing_4
            }}
          ></View>
          <Text style={[gstyles.caption_bold, { color: COLORS[tag] }]}>
            {tag.toUpperCase()}
          </Text>
        </View>
        <Text style={gstyles.h5_bold}>{title}</Text>
        <View
          style={[
            { flexDirection: "row", justifyContent: "space-between" },
            gstyles.top_4
          ]}
        >
          <Text
            style={[
              gstyles.p1_bold_50,
              { color: theme.green(), alignItems: "center" }
            ]}
          >
            {messageCount} messages
          </Text>
          <Text style={[gstyles.p1_50]}>5 hours ago</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const RoomScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.chat.isConnected);
  const rooms = useSelector(state => state.chat.rooms);

  if (!isConnected) return <Loading />;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Header title={"The YG Club"} navigation={navigation} close />
      <OptionBars navigation={navigation} />
      <FlatList
        style={{ backgroundColor: theme.bg2() }}
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: room, i }) => {
          return <Room key={room.id} navigation={navigation} room={room} />;
        }}
        ItemSeparatorComponent={Separator}
      />
    </>
  );
};

export default RoomScreen;
