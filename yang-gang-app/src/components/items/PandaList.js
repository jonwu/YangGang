import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const generateStyles = theme => ({});

const dummy = [0, 1, 2, 3, 4, 5];
const PandaItem = React.memo(({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://i.ibb.co/4g1VzY9/mathpanda.png" }}
        style={{ height: 120, width: 100, opacity: item === 0 ? 1 : 0.1 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: theme.spacing_2,
          paddingHorizontal: theme.spacing_4,
          paddingVertical: theme.spacing_5,
          backgroundColor: item === 0 ? theme.blue() : null,
          borderRadius: 12,
          borderWidth: item === 0 ? 0 : 1,
          borderColor: theme.text(0.1)
        }}
      >
        {item !== 0 && (
          <Ionicons
            name="ios-lock"
            size={12}
            color={theme.text(0.4)}
            style={{ marginRight: theme.spacing_5 }}
          />
        )}
        <Text
          style={[
            gstyles.caption_bold,

            { color: item === 0 ? theme.light() : theme.text(0.5) }
          ]}
        >
          5 patrons
        </Text>
      </View>
    </View>
  );
});
const renderSeparator = React.memo(() => {
  return <View style={{ width: 48 }} />;
});
const PandaList = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <>
      {/* <View style={{ alignItems: "center" }}>
        <Text style={[gstyles.h4_bold, gstyles.bottom_2]}>3 patreons</Text>
      </View> */}
      <FlatList
        style={{ marginHorizontal: -1 * theme.spacing_2 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: theme.spacing_2 }}
        horizontal
        data={dummy}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => <PandaItem item={item} />}
      />
    </>
  );
};

export default PandaList;
