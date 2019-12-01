import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const Room = ({ room, navigation }) => {
  const { id, title, owner_id, created_date } = room;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity onPress={() => navigation.navigation("Chat", { roomId })}>
      <View style={[{ padding: theme.spacing_2 }]}>
        <Text style={gstyles.h1}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RoomScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.chat.isConnected);
  const rooms = useSelector(state => state.chat.rooms);

  if (!isConnected) return <Loading />;

  return (
    <FlatList
      data={rooms}
      renderItem={({ room, i }) => (
        <Room key={room.id} navigation={navigation} />
      )}
    />
  );
};

export default RoomScreen;
