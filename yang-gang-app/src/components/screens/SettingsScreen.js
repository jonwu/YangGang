import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { updateTheme } from "modules/app/actions";
import * as StoreReview from "expo-store-review";

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

const SettingsScreen = React.memo(() => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const themeLabel = theme.id === 0 ? "Enable dark mode" : "Enable light mode";
  const nextThemeId = theme.id === 0 ? 1 : 0;
  const dispatch = useDispatch();
  return (
    <ScrollView>
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
        onPress={() => StoreReview.requestReview()}
        Icon={<FontAwesome name="star" size={24} color={theme.text()} />}
        label={"Write a review!"}
      />
    </ScrollView>
  );
});

export default SettingsScreen;
