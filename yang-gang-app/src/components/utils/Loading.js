import React from "react";
import {
  View,
  ActivityIndicator,
  Platform,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { DotsLoader } from "react-native-indicator";
import russiaSrc from "assets/russia.png";
import bureaucracySrc from "assets/bureaucracy.png";
import loanSrc from "assets/loan.png";
import lobbySrc from "assets/lobby.png";
import wallSrc from "assets/wall.png";
import ChatLoading from "./ChatLoading";

const generateStyles = theme => ({});
const empties = {
  russia: {
    source: russiaSrc,
    text: `The russians hi-jacked our computers. We can't connect to your Wi-Fi at the moment...`
  },
  bureaucracy: {
    source: bureaucracySrc,
    text: `There's too much bureaucracy in health care that's weighing us down. We can't connect to your Wi-Fi at the moment...`
  },
  loan: {
    source: loanSrc,
    text: `Our student loans are eating our budget. We can't connect to your Wi-Fi at the moment...`
  },
  lobby: {
    source: lobbySrc,
    text: `The lobbyists are forcing our hands. We can't connect to your Wi-Fi at the moment...`
  },
  wall: {
    source: wallSrc,
    text: `Trump built a wall between us. We can't connect to your Wi-Fi at the moment...`
  }
};

const Loading = ({ error, errorKey, errorRefresh, forceLight }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (error != null && empties[errorKey]) {
    const color = forceLight ? theme.light() : theme.text();
    const empty = empties[errorKey];
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          marginBottom: 100
        }}
      >
        <Image
          source={empty.source}
          style={{ width: 200, height: 200, tintColor: color }}
        />
        <Text
          style={[
            gstyles.p1,
            gstyles.top_5,
            { width: 300, textAlign: "center", color }
          ]}
        >
          {empty.text}
        </Text>
        <TouchableOpacity onPress={errorRefresh}>
          <View
            style={[
              {
                alignItems: "center",
                paddingVertical: theme.spacing_4,
                paddingHorizontal: theme.spacing_2,
                borderRadius: theme.borderRadius,
                backgroundColor: theme.red()
              },
              gstyles.top_2
            ]}
          >
            <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
              Refresh
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return <ChatLoading />;
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginBottom: 80
      }}
    >
      {Platform.OS === "ios" ? (
        <DotsLoader color={theme.red()} />
      ) : (
        <ActivityIndicator size="large" color={theme.red()} />
      )}
    </View>
  );
};

export default Loading;
