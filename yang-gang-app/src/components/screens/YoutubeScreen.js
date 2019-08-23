import React from "react";
import { View, WebView, FlatList, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import YoutubeItem from "components/items/YoutubeItem";
import YoutubeTinyItem from "components/items/YoutubeTinyItem";
import { useSelector, useDispatch } from "react-redux";
import {
  updateYoutube,
  updateYoutubeDay,
  updateYoutubeAllTime
} from "modules/app/actions";
import Separator from "components/items/TwitterSeparator";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connectActionSheet } from "@expo/react-native-action-sheet";

const styles = theme => {};

const Header = connectActionSheet(
  ({ navigation, showActionSheetWithOptions }) => {
    const { theme, gstyles, styles } = useThemeKit(styles);
    const youtube_day = useSelector(state => state.app.youtube_day);

    const renderItemTiny = ({ item: youtube, showActionSheetWithOptions }) => {
      return <YoutubeTinyItem item={youtube} navigation={navigation} />;
    };
    const options = ["3 days", "7 days", "All Times", "Cancel"];
    const cancelButtonIndex = 3;

    return (
      <React.Fragment>
        {youtube_day && (
          <React.Fragment>
            <Text style={[gstyles.h3, { margin: theme.spacing_2 }]}>
              Most Viewed Today
            </Text>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingLeft: theme.spacing_2 }}
              ItemSeparatorComponent={() => (
                <View style={{ width: theme.spacing_4 }} />
              )}
              data={youtube_day}
              renderItem={renderItemTiny}
              keyExtractor={item => item.id}
            />
          </React.Fragment>
        )}
        <TouchableOpacity
          onPress={() => {
            showActionSheetWithOptions(
              { options, cancelButtonIndex },
              buttonIndex => {}
            );
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: theme.spacing_2
            }}
          >
            <Text style={[gstyles.h3]}>This Week</Text>
            <Ionicons
              name="ios-arrow-down"
              size={20}
              color={theme.text()}
              style={{ marginLeft: theme.spacing_4, marginTop: 4 }}
            />
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
);
const Youtubecreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const youtube = useSelector(state => state.app.youtube);

  const renderItem = ({ item: youtube }) => {
    return <YoutubeItem item={youtube} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateYoutube());
    dispatch(updateYoutubeDay());
    dispatch(updateYoutubeAllTime());
  }, []);

  if (!youtube) return null;
  return (
    <FlatList
      ListHeaderComponent={<Header navigation={navigation} />}
      data={youtube}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
    />
  );
};

export default Youtubecreen;
