import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme, updateCandidate } from "modules/app/actions";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
import { StoreReview } from "expo";
import * as MailComposer from "expo-mail-composer";
import Constants from "expo-constants";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { useCandidateResources } from "utils/Utils";
import { EVENT_SWAP, EVENT_OPEN_STATS } from "utils/AnalyticsUtils";
import * as Amplitude from "expo-analytics-amplitude";

const OptionBars = connectActionSheet(
  ({ navigation, showActionSheetWithOptions }) => {
    const { theme, gstyles } = useThemeKit();
    const dispatch = useDispatch();
    const resource = useCandidateResources();
    const themeLabel = theme.id === 0 ? "DARK" : "LIGHT";
    const nextThemeId = theme.id === 0 ? 1 : 0;
    const onDismissAction = React.useRef(null);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: theme.bg2()
        }}
      >
        <Option
          onPress={() => {
            Amplitude.logEvent(EVENT_OPEN_STATS);
            navigation.navigate("Progress");
          }}
          icon={
            <MaterialCommunityIcons
              name="chart-bar"
              color={theme.text()}
              size={24}
            />
          }
        />
        <Option
          onPress={() => {
            dispatch(updateTheme(nextThemeId));
          }}
          icon={
            <MaterialCommunityIcons
              name="yin-yang"
              size={24}
              color={theme.text()}
            />
          }
        />

        {(Constants.installationId === "1EC08B77-806C-49A7-BDD6-7ED1C50F4446" ||
          __DEV__) && (
          <Option
            onPress={() => {
              navigation.navigate("PostEvent");
            }}
            icon={<MaterialIcons name="event" size={24} color={theme.text} />}
          />
        )}
        {/* <Option
          onPress={() => {
            StoreReview.requestReview();
          }}
          icon={<FontAwesome name="star" size={24} color={theme.text()} />}
        /> */}
        {/* <Option
          onPress={() => {
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
                    onPress: () => console.log("Ask me later pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            });
          }}
          icon={
            <MaterialCommunityIcons
              name="email"
              size={24}
              color={theme.text()}
            />
          }
        /> */}
        {/* {(Constants.installationId === "1EC08B77-806C-49A7-BDD6-7ED1C50F4446" ||
          __DEV__) && (
          <Option
            onPress={() => {
              navigation.navigate("PostEvent");
            }}
            icon={
              <MaterialIcons name="event" size={24} color={theme.text()} />
            }
          />
        )} */}

        {/* <Option
          onPress={() => {
            const cancelButtonIndex = 3;
            const options = [
              "Andrew Yang",
              "Bernie Sanders",
              "Donald Trump",
              "Cancel"
            ];
            const optionsKeys = [
              "andrew_yang",
              "bernie_sanders",
              "donald_trump"
            ];
            showActionSheetWithOptions(
              { options, cancelButtonIndex },
              buttonIndex => {
                if (buttonIndex !== cancelButtonIndex) {
                  Amplitude.logEventWithProperties(EVENT_SWAP, {
                    candidate: optionsKeys[buttonIndex]
                  });
                  dispatch(updateCandidate(optionsKeys[buttonIndex]));
                }
              }
            );
          }}
          icon={
            <Image
              source={resource.avatar}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
          }
        /> */}
      </View>
    );
  }
);

const Option = ({ onPress, label, icon }) => {
  const { theme, gstyles } = useThemeKit();
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <View
        style={{
          padding: theme.spacing_4,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 1
        }}
      >
        <View
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            backgroundColor: theme.bg2(),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {icon}
        </View>
        {label && (
          <Text
            style={[
              gstyles.caption_bold,
              gstyles.top_5,
              { color: theme.text(), fontFamily: "montserrat-extra-bold" }
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OptionBars;
