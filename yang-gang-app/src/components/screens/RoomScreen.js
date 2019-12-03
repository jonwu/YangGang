import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import Loading from "components/utils/Loading";

const generateStyles = theme => ({});

const Room = ({ room, navigation }) => {
  const { id, title, owner_id, created_date } = room;
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  console.log("id in room is:", id)
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Chat", { roomId: id })}>
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
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: room, i }) => {

        return <Room key={room.id} navigation={navigation} room={room} />
      }}
    />
  );
};

export default RoomScreen;
