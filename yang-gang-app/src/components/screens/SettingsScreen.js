import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { updateTheme, updateCandidate } from "modules/app/actions";
import { StoreReview } from "expo";
import * as MailComposer from "expo-mail-composer";
import Constants from "expo-constants";
import { EVENT_SWAP, EVENT_OPEN_STATS } from "utils/AnalyticsUtils";
import * as Amplitude from "expo-analytics-amplitude";
import { useCandidateResources } from "utils/Utils";
import { connectActionSheet } from "@expo/react-native-action-sheet";

const generateStyles = theme => ({});

const SettingsRow = ({ Icon, label, onPress, removeSeparator }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: theme.spacing_2
          }}
        >
          <View style={{ width: 40 }}>{Icon}</View>
          <Text style={gstyles.p1_bold}>{label}</Text>
        </View>
      </TouchableOpacity>
      {!removeSeparator && (
        <View
          style={{
            marginLeft: 58,
            height: 1,
            backgroundColor: theme.borderColor
          }}
        />
      )}
    </View>
  );
};

const SettingsScreen = React.memo(
  ({ navigation, showActionSheetWithOptions }) => {
    const { theme, gstyles, styles } = useThemeKit(generateStyles);
    const themeLabel =
      theme.id === 0 ? "Enable dark mode" : "Enable light mode";
    const nextThemeId = theme.id === 0 ? 1 : 0;
    const dispatch = useDispatch();
    const resource = useCandidateResources();
    return (
      <ScrollView>
        <SettingsRow
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
          Icon={
            <Image
              source={resource.avatar}
              style={{ width: 24, height: 24, borderRadius: 12 }}
            />
          }
          label={"Swap Candidates"}
        />
        <SettingsRow
          onPress={() => {
            Amplitude.logEvent(EVENT_OPEN_STATS);
            navigation.navigate("Progress");
          }}
          Icon={
            <MaterialCommunityIcons
              name="chart-bar"
              size={26}
              color={theme.text()}
            />
          }
          label={"Stats"}
        />
        <SettingsRow
          onPress={() => dispatch(updateTheme(nextThemeId))}
          Icon={
            <MaterialCommunityIcons
              name="yin-yang"
              size={26}
              style={{ marginTop: 2 }}
              color={theme.text()}
            />
          }
          label={themeLabel}
        />

        <SettingsRow
          onPress={() =>
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
            })
          }
          Icon={
            <MaterialCommunityIcons
              name="email"
              size={24}
              color={theme.text()}
            />
          }
          label={"Send feedback"}
        />

        {/* <SettingsRow
        onPress={StoreReview.requestReview}
        Icon={<FontAwesome name="star" size={24} color={theme.text()} />}
        label={"Rate the app!"}
      /> */}
        {(Constants.installationId === "56ED3426-D29C-4B1C-AA98-16C5E0BCC08D" ||
          __DEV__) && (
          <SettingsRow
            onPress={() => navigation.navigate("PostEvent")}
            Icon={<MaterialIcons name="event" size={24} color={theme.text()} />}
            label={"Admin Dashboard"}
          />
        )}
        {/* <View style={[gstyles.top_2, { alignItems: "center" }]}>
        <Text selectable style={gstyles.footnote_50}>
          {Constants.installationId}
        </Text>
      </View> */}
      </ScrollView>
    );
  }
);

export default connectActionSheet(SettingsScreen);
