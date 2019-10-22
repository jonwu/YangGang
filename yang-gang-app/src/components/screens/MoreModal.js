import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Alert
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import modalBg from "assets/modalbg.jpg";
import { updateShowMoneyModal, updateTheme } from "modules/app/actions";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { StoreReview } from "expo";
import * as MailComposer from "expo-mail-composer";
import Constants from "expo-constants";

const MoreModal = ({ navigation }) => {
  const { theme, gstyles } = useThemeKit();
  // const [modalVisible, setModalVisible] = React.useState(true);
  const dispatch = useDispatch();
  const modalVisible = useSelector(state => state.app.showMoneyModal);
  const setModalVisible = show => dispatch(updateShowMoneyModal(show));
  const themeLabel = theme.id === 0 ? "DARK" : "LIGHT";
  const nextThemeId = theme.id === 0 ? 1 : 0;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: theme.black(0.75)
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <ImageBackground
              source={modalBg}
              style={{
                height: 120,
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Option
                  label={"STATS"}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Progress");
                  }}
                  icon={
                    <MaterialCommunityIcons
                      name="chart-bar"
                      color={theme.light(0.75)}
                      size={24}
                    />
                  }
                />
                <Option
                  onPress={() => {
                    setModalVisible(false);
                    dispatch(updateTheme(nextThemeId));
                  }}
                  label={themeLabel}
                  icon={
                    <MaterialCommunityIcons
                      name="yin-yang"
                      size={24}
                      color={theme.light(0.75)}
                    />
                  }
                />
                <Option
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      StoreReview.requestReview();
                    }, 1200);
                  }}
                  label={"RATE"}
                  icon={
                    <FontAwesome
                      name="star"
                      size={24}
                      color={theme.light(0.75)}
                    />
                  }
                />

                <Option
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      MailComposer.composeAsync({
                        recipients: ["theyangapp@gmail.com"],
                        subject: "My thoughts on Yang: Humanity First app..."
                      }).catch(() => {
                        Alert.alert(
                          "Mail Error",
                          `The mail composer cannot be opened. You likely have not configured your email account on your device yet.${"\n\n"}Please don't hesitate to say hi to me at theyangapp@gmail.com!`,
                          [
                            {
                              text: "OK",
                              onPress: () =>
                                console.log("Ask me later pressed"),
                              style: "cancel"
                            }
                          ],
                          { cancelable: false }
                        );
                      });
                    }, 1200);
                  }}
                  label={"EMAIL"}
                  icon={
                    <MaterialCommunityIcons
                      name="email"
                      size={24}
                      color={theme.light(0.75)}
                    />
                  }
                />
                {(Constants.installationId ===
                  "56ED3426-D29C-4B1C-AA98-16C5E0BCC08D" ||
                  __DEV__) && (
                  <Option
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("PostEvent");
                    }}
                    label={"Events"}
                    icon={
                      <MaterialIcons
                        name="event"
                        size={24}
                        color={theme.light(0.75)}
                      />
                    }
                  />
                )}
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Option = ({ onPress, label, icon }) => {
  const { theme, gstyles } = useThemeKit();
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <View style={{ padding: theme.spacing_3, alignItems: "center" }}>
        <View
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            backgroundColor: theme.black(0.7),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {icon}
        </View>
        <Text
          style={[
            gstyles.caption_bold,
            gstyles.top_5,
            { color: theme.light(0.75), fontFamily: "montserrat-extra-bold" }
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MoreModal;
