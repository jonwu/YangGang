import React from "react";
import { View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import Header from "./Header";
import OptionBars from "components/items/OptionsBar";

const generateStyles = theme => ({});

const ChatScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        },
        image:
          "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY4NDE5Nzc2NjQzNzM3NTQ2/andrew-yang-gettyimages-1092084782-cropped.jpg"
        // You can also add a video prop:
        // video:
        //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      }
    ]);
  }, []);

  const onSend = (nextMessages = []) => {
    const updatedMessages = GiftedChat.append(messages, nextMessages);
    setMessages(updatedMessages);
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
