import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  GiftedChat,
  Bubble,
  Time,
  InputToolbar,
  Composer,
  Send
} from "react-native-gifted-chat";
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
  },
  {
    _id: 1,
    text: "Hello developer",
    createdAt: new Date(),
    user: {
      _id: 2,
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
  /** render the chat bubble */
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: theme.text(0.1)
          }
        }}
        textStyle={{
          right: { ...gstyles.h5, color: theme.light() },
          left: gstyles.h5
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        containerStyle={{
          backgroundColor: theme.bg3(),
          borderTopColor: theme.text(0.3)
        }}
        {...props}
      />
    );
  };
  const renderComposer = props => {
    return (
      <Composer
        {...props}
        textInputStyle={gstyles.h5}
        placeholderTextColor={theme.text(0.5)}
      />
    );
  };

  const renderSend = props => {
    return <Send {...props} textStyle={{ fontFamily: "brandon-semibold" }} />;
  };

  // /** render the time labels in the bubble */
  // const renderTime = () => {
  //   return (
  //     <Time
  //       textStyle={{
  //         right: {
  //           color: theme.text(),
  //           fontFamily: "brandon-book",
  //           fontSize: 14
  //         },
  //         left: {
  //           color: theme.text(),
  //           fontFamily: "brandon-book",
  //           fontSize: 14
  //         }
  //       }}
  //     />
  //   );
  // };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg3() }}>
      <Header
        btnColor={theme.text()}
        bgColor={theme.bg3()}
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
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        showUserAvatar
        user={{
          _id: 1
        }}
      />
    </View>
  );
};

export default ChatScreen;
