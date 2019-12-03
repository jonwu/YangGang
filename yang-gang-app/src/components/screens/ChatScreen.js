import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import Header from "./Header";
import OptionBars from "components/items/OptionsBar";
import Loading from "components/utils/Loading";
import { sendMessage, connectRoom } from "modules/chat/actions";

const generateStyles = theme => ({});
/**
 * TODO:
 * 1. Create Users
 * 2. Hook up Rooms
 * 3. Hook up Chat
 * 4. Handle Errors
 */

const convertMessageToGifted = (message) => {
  return {
    _id: message.id,
    text: message.message,
    createdAt: new Date(message.created_date),
    user: {
      _id: message.user_id,
      name: null,
      avatar: null
    }
  }
}

const ChatScreen = ({ navigation }) => {
  const roomId = navigation.getParam("roomId");
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const user = useSelector(state => state.settings.user);
  let messages = useSelector(state => state.chat.messages[roomId])
  console.log("============== these are my converted messages", messages)

  React.useEffect(() => {
    connectRoom(roomId);
  }, []);

  if (!messages) return <Loading />;
  messages = messages.map(convertMessageToGifted);

  const onSend = (nextMessages = []) => {
    if (user) {
      console.log({ userId: user.id, roomId, message: nextMessages[0].text })
      sendMessage({ userId: user.id, roomId, message: nextMessages[0].text });
    } else {
      console.warn("user is null", user);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg() }}>
      <Header
        btnColor={theme.text()}
        bgColor={theme.bg2()}
        navigation={navigation}
        title={"General Chat"}
        close
      />
      <OptionBars navigation={navigation} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1
        }}
      />
    </View>
  );
};

export default ChatScreen;
