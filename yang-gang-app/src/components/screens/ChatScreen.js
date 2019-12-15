import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import Header, { Back } from "./Header";
import Loading from "components/utils/Loading";
import { sendMessage, connectRoom } from "modules/chat/actions";
import RoomItem from "components/items/RoomItem";

const dummy = [
  {
    _id: 1,
    text: "Hello developer",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  }
];

const dummyRoom = {
  id: 2,
  message_count: 11,
  tag: "minor",
  title:
    "USA Today Article Includes Yang Among Three Candidates Most Likely to Win General Election",
  link:
    "https://www.usatoday.com/story/opinion/2019/12/11/democratic-primary-joe-biden-elizabeth-warren-column/4388481002/"
};

const generateStyles = theme => ({});
/**
 * TODO:
 * 1. Create Users
 * 2. Hook up Rooms
 * 3. Hook up Chat
 * 4. Handle Errors
 */

const convertMessageToGifted = message => {
  return {
    _id: message.id,
    text: message.message,
    createdAt: new Date(message.created_date),
    user: {
      _id: message.user_id,
      name: null,
      avatar: null
    }
  };
};

const ChatScreen = ({ navigation }) => {
  const roomId = navigation.getParam("roomId");
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const user = useSelector(state => state.settings.user);
  let messages = useSelector(state => state.chat.messages[roomId]);
  console.log("============== these are my converted messages", messages);

  React.useEffect(() => {
    connectRoom(roomId);
  }, []);

  // if (!messages) return <Loading />;
  // messages = messages.map(convertMessageToGifted);

  const onSend = (nextMessages = []) => {
    if (user) {
      console.log({ userId: user.id, roomId, message: nextMessages[0].text });
      sendMessage({ userId: user.id, roomId, message: nextMessages[0].text });
    } else {
      console.warn("user is null", user);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        btnColor={theme.text()}
        bgColor={theme.bg2()}
        navigation={navigation}
        renderTitle={
          <View style={{ flexDirection: "row" }}>
            <View style={{ height: 40, justifyContent: "center" }}>
              <Back navigation={navigation} btnColor={theme.text()} />
            </View>
            <View style={{ flex: 1 }}>
              <RoomItem room={dummyRoom} style={{ padding: theme.spacing_4 }} />
            </View>
          </View>
        }
        title={"General Chat"}
      />
      <GiftedChat
        messages={dummy}
        onSend={onSend}
        showUserAvatar
        user={{
          _id: 1
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
