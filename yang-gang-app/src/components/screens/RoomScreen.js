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
import ChatLoading from "components/utils/ChatLoading";

const generateStyles = theme => ({});

const DummyRooms = [
  {
    id: "Daily",
    tag: "hype",
    message_count: 15,
    title: "Daily Events &amp; Discussions Thread (Dec 17, 2019)"
  },
  {
    id: "ALL",
    tag: "hype",
    message_count: 15,
    title: "ALL HANDS ON DECK IN IOWA IN JANUARY 2020"
  },
  {
    id: "Emerson",
    tag: "hype",
    message_count: 15,
    title: "Emerson Polling has Yang at 6% (+2)!"
  },
  { id: "Drop", tag: "hype", message_count: 15, title: "Drop the MATH on em" },
  {
    id: "“We",
    tag: "hype",
    message_count: 15,
    title:
      "“We did it! @AndrewYang has been certified by the @vademocrats to be on the ballot in Virginia! 8,300+ signatures submitted with ALL OF THEM collected by over 100 unpaid #yanggang volunteers across the state.”"
  },
  {
    id: "National",
    tag: "hype",
    message_count: 15,
    title: "National Poll of College Students (Yang +3)!"
  },
  {
    id: "Yang",
    tag: "hype",
    message_count: 15,
    title: "Yang lookin suave af here"
  },
  {
    id: "“Meanwhile",
    tag: "hype",
    message_count: 15,
    title:
      "“Meanwhile...in #Iowa...the neighborhood is getting #Yanged. No way in hell would I allow this to happen for anyone other than @AndrewYang.”"
  },
  {
    id: "Don’t",
    tag: "hype",
    message_count: 15,
    title: "Don’t Forget the Witcher Too"
  },
  {
    id: "Don’t",
    tag: "hype",
    message_count: 15,
    title: "Don’t Forget the Witcher Too"
  },
  {
    id: "10",
    tag: "hype",
    message_count: 15,
    title:
      "10 Reasons why Andrew Yang will become the next president of the USA"
  },
  {
    id: "There",
    tag: "hype",
    message_count: 15,
    title:
      "There is no doubt that the freedom dividend would be an absolute game changer for rural-America"
  },
  {
    id: "Shout",
    tag: "hype",
    message_count: 15,
    title:
      "Shout-out to whomever cleaned my hotel room today and left me the best note next to one of my two hats in the room 😂🧢"
  },
  {
    id: "I’m",
    tag: "hype",
    message_count: 15,
    title: "I’m a Trump Supporter, sell me on Andrew Yang"
  },
  {
    id: "My",
    tag: "hype",
    message_count: 15,
    title:
      "My first YANG GANG sighting in the wild happened on the top of a mountain."
  },
  {
    id: "Common",
    tag: "hype",
    message_count: 15,
    title: "Common criticism of Yang (Meme)"
  },
  {
    id: "Yang",
    tag: "hype",
    message_count: 15,
    title:
      "Yang left off CNN scroll bar listing Democrats attending Thursday's debate"
  },
  {
    id: "This",
    tag: "hype",
    message_count: 15,
    title: "This high school teacher made TWONP part of his curriculum"
  },
  {
    id: "This",
    tag: "hype",
    message_count: 15,
    title: "This system needs an update. It's not 1995 any more."
  },
  { id: "A", tag: "hype", message_count: 15, title: "A skeptic's view of UBI" },
  {
    id: "Finally",
    tag: "hype",
    message_count: 15,
    title: "Finally got polled and Yang wasnt even on the list!"
  },
  {
    id: "Tomorrow",
    tag: "hype",
    message_count: 15,
    title: "Tomorrow is my first child's due date and I'm simply excited."
  },
  {
    id: "The",
    tag: "hype",
    message_count: 15,
    title: "The UNOFFICIAL PBS Democratic Debate promo video."
  },
  { id: "90K", tag: "hype", message_count: 15, title: "90K!" },
  {
    id: "Wore",
    tag: "hype",
    message_count: 15,
    title:
      "Wore my new MATH hat into Starbucks. Immediately got 3 comments. “YANGGANG”, “Go Andrew Yang!”, and “Nice Hat!” — Our grassroots support is VASTLY underestimated."
  },
  {
    id: "Freedom",
    tag: "hype",
    message_count: 15,
    title:
      "Freedom Dividend recipients share their life changing experiences- fantastic way to show how impactful the FD can be"
  },
  {
    id: "If",
    tag: "hype",
    message_count: 15,
    title: "If Kerry managed to get the nomination, so could Yang!"
  },
  {
    id: "Truckers",
    tag: "hype",
    message_count: 15,
    title:
      "Truckers For Yang Puts Next Semi-Truck on the Road for Presidential Candidate Andrew Yang"
  }
];

const RoomScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  // const isConnected = useSelector(state => state.chat.isConnected);
  const rooms = useSelector(state => state.chat.rooms);

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <Header
        title={"Andrew Yang Alerts"}
        navigation={navigation}
        close
        btnColor={theme.text()}
        bgColor={theme.bg3()}
      />
      {!rooms || rooms.length === 0 ? (
        <ChatLoading />
      ) : (
        <FlatList
          style={{ backgroundColor: theme.bg(), flex: 1 }}
          data={rooms}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item: room, i }) => {
            return (
              <RoomItem key={room.id} navigation={navigation} room={room} />
            );
          }}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

export default RoomScreen;
