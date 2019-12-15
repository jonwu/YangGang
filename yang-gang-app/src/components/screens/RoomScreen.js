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
import { useSelector, useDispatch } from "react-redux";
import Loading from "components/utils/Loading";
import Separator from "components/items/Separator";
import Header from "./Header";
import OptionBars from "components/items/OptionsBar";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import RoomItem from "components/items/RoomItem";

const generateStyles = theme => ({});

const DummyRooms = [
  {
    id: 0,
    message_count: 45,
    title: "Yang @ 5% in New Hampshire MassINC/WBUR poll",
    link: "https://twitter.com/Politics_Polls/status/1204716978499289089",
    tag: "breaking",
    active: true
  },
  {
    id: 1,
    message_count: 15,
    title: "Yang @ 5% in New Hampshire MassINC/WBUR poll",
    link: "https://twitter.com/Politics_Polls/status/1204716978499289089",
    tag: "hype"
  },
  {
    id: 2,
    message_count: 11,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 3,
    message_count: 17,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 4,
    message_count: 8,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 5,
    message_count: 2,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 6,
    message_count: 10,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  },
  {
    id: 7,
    message_count: 10,
    tag: "minor",
    title:
      "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
    link:
      "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
  }
];

const RoomScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.chat.isConnected);
  const rooms = useSelector(state => state.chat.rooms);

  if (!isConnected) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <Header
        title={"The YG Club"}
        navigation={navigation}
        close
        btnColor={theme.text()}
        bgColor={theme.bg2()}
      />
      {/* <OptionBars navigation={navigation} /> */}
      <FlatList
        style={{ backgroundColor: theme.bg2(), flex: 1 }}
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: room, i }) => {
          return <RoomItem key={room.id} navigation={navigation} room={room} />;
        }}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default RoomScreen;
