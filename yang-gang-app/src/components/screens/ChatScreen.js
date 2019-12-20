import React from "react";
import { View, Text, SafeAreaView, Keyboard, ScrollView } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  GiftedChat,
  Bubble,
  Time,
  InputToolbar,
  Composer,
  Send,
  Actions
} from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header, { Back } from "./Header";
import Loading from "components/utils/Loading";
import { sendMessage, connectRoom } from "modules/chat/actions";
import RoomItem from "components/items/RoomItem";
import UsernameModal from "./UsernameModal";
import { updateModal } from "modules/app/actions";
import ChatLoading from "components/utils/ChatLoading";
import * as Haptics from "expo-haptics";

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
    _id: 2,
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
      name: message.user.username
      // avatar: null
    }
  };
};

const ChatScreen = ({ navigation }) => {
  const roomId = navigation.getParam("roomId");
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const room = useSelector(state =>
    state.chat.rooms.find(room => room.id === roomId)
  );
  let messages = useSelector(state => state.chat.messages[roomId]);

  React.useEffect(() => {
    dispatch(connectRoom(roomId));
  }, []);

  const renderHeader = (
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
            <RoomItem
              showSource
              room={room}
              style={{ padding: theme.spacing_4 }}
            />
          </View>
        </View>
      }
      title={"General Chat"}
    />
  );

  return (
    <>
      <UsernameModal />
      <View style={{ flex: 1, backgroundColor: theme.bg3() }}>
        {renderHeader}
        {!messages ? <Loading /> : <Chat messages={messages} roomId={roomId} />}
      </View>
    </>
  );
};

const Chat = React.memo(({ messages, roomId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.settings.user);
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  // messages = messages.reverse().slice(0, 15);
  messages = messages.map(convertMessageToGifted);
  const [text, setText] = React.useState("");
  const onSend = (nextMessages = []) => {
    if (!user) {
      Keyboard.dismiss();
      // setTimeout(() => setText(nextMessages[0].text), 50);
      return;
    }

    if (!user.username) {
      Keyboard.dismiss();
      dispatch(updateModal("username", true));
      setTimeout(() => setText(nextMessages[0].text), 50);
      return;
    }

    Haptics.selectionAsync();
    sendMessage({ userId: user.id, roomId, message: nextMessages[0].text });
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
        textInputStyle={[gstyles.h5]}
        placeholderTextColor={theme.text(0.5)}
      />
    );
  };

  const renderSend = props => {
    return <Send {...props} textStyle={{ fontFamily: "brandon-semibold" }} />;
  };

  const renderActions = props => {
    return (
      <Actions
        icon={() => (
          <MaterialCommunityIcons
            name={"face-profile"}
            color={theme.text(0.3)}
            size={24}
          />
        )}
        {...props}
        onPressActionButton={() => {
          Keyboard.dismiss();
          dispatch(updateModal("username", true));
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderActions={renderActions}
      renderUsernameOnMessage
      renderChatEmpty={() => <ScrollView style={{ flex: 1 }} />}
      user={{
        _id: user.id
      }}
      text={text}
      onInputTextChanged={text => setText(text)}
    />
  );
});
export default ChatScreen;
