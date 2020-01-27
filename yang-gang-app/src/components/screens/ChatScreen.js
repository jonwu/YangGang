import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  GiftedChat,
  Bubble,
  Time,
  InputToolbar,
  Composer,
  Send,
  Actions,
  MessageText
} from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header, { Back } from "./Header";
import Loading from "components/utils/Loading";
import {
  sendMessage,
  connectRoom,
  setCurrentRoomId
} from "modules/chat/actions";
import RoomItem from "components/items/RoomItem";
import { updateModal, onboard } from "modules/app/actions";
import ChatLoading from "components/utils/ChatLoading";
import * as Haptics from "expo-haptics";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Tooltip from "components/items/Tooltip";

import imgYg from "assets/stickers/yg.png";
import imgMath from "assets/stickers/math.png";
import imgUbi from "assets/stickers/ubi.png";
import imgLit from "assets/stickers/lit.png";
import imgAndrew from "assets/stickers/andrew.png";
import ThemedSticker from "utils/ThemedSticker";

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
    sticker: message.sticker,
    user: {
      _id: message.user_id,
      name:
        message.user.username.toLowerCase().includes("andrew yang") ||
        message.user.username.toLowerCase().includes("andrewyang")
          ? "#HumanityFirst"
          : message.user.username
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
  const onboardedSource = useSelector(
    state => state.settings.onboards && state.settings.onboards.source
  );

  React.useEffect(() => {
    dispatch(setCurrentRoomId(roomId));
    connectRoom(roomId);
  }, [roomId]);

  React.useEffect(() => {
    return () => {
      dispatch(setCurrentRoomId(null));
    };
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
      <View style={{ flex: 1, backgroundColor: theme.bg3() }}>
        {renderHeader}
        {!onboardedSource && room.link != "" && (
          <View style={{ zIndex: 1 }}>
            <Tooltip
              text={"Read it or watch it!"}
              onPress={() => {
                Haptics.selectionAsync();
                dispatch(onboard("source"));
              }}
            />
          </View>
        )}
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
      setTimeout(() => setText(nextMessages[0].text), 500);
      return;
    }

    Haptics.selectionAsync();
    sendMessage({
      userId: user.id,
      roomId,
      message: nextMessages[0].text
    });
  };
  /** render the chat bubble */
  const renderBubble = props => {
    const { sticker } = props.currentMessage;
    switch (sticker) {
      case "yg":
        return <ThemedSticker source={imgYg} />;
      case "math":
        return <ThemedSticker source={imgMath} />;
      case "ubi":
        return <ThemedSticker source={imgUbi} />;
      case "lit":
        return <ThemedSticker source={imgLit} />;
      case "andrew":
        return <ThemedSticker source={imgAndrew} />;
      default:
        break;
    }

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

  const renderMessageText = props => {
    return (
      <MessageText
        {...props}
        linkStyle={{
          left: { color: theme.text(), textDecorationLine: "underline" },
          right: { color: theme.light(), textDecorationLine: "underline" }
        }}
      />
    );
  };

  const renderSend = props => {
    return <Send {...props} textStyle={{ fontFamily: "brandon-semibold" }} />;
  };

  const renderActions = props => {
    return (
      <>
        {/* <Actions
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
        /> */}
        <Actions
          icon={() => (
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={24}
              color={theme.blue()}
            />
          )}
          {...props}
          onPressActionButton={() => {
            Keyboard.dismiss();
            dispatch(updateModal("panda", true));
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderActions={renderActions}
        renderUsernameOnMessage
        renderChatEmpty={() => (
          <View
            style={{
              flex: 1,
              transform: [{ scaleY: -1 }],
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1 }} />
            <View style={{ paddingBottom: 48 }}>
              <Text style={[gstyles.h4_bold, gstyles.bottom_4]}>
                Ready... Set...
              </Text>
              <Text style={gstyles.p1}>
                This is the beginning of a chat room.
              </Text>
              <Text style={gstyles.p1}>Type something to kick it off!</Text>
            </View>
          </View>
        )}
        user={{
          _id: user.id
        }}
        text={text}
        isKeyboardInternallyHandled={!(Platform.OS === "android")}
        onInputTextChanged={text => setText(text)}
        renderMessageText={renderMessageText}
      />
      {Platform.OS === "android" && <KeyboardSpacer />}
    </View>
  );
});
export default ChatScreen;
