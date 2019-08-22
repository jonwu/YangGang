import React from "react";
import { View, WebView, FlatList } from "react-native";
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

const styles = theme => {};
const Youtubecreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const youtube = useSelector(state => state.app.youtube);
  const youtube_day = useSelector(state => state.app.youtube_day);
  const renderItem = ({ item: youtube }) => {
    return <YoutubeItem item={youtube} navigation={navigation} />;
  };
  const renderItemTiny = ({ item: youtube }) => {
    return <YoutubeTinyItem item={youtube} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateYoutube());
    dispatch(updateYoutubeDay());
    dispatch(updateYoutubeAllTime());
  }, []);

  const Header =
    youtube_day != null ? (
      <FlatList
        horizontal
        data={youtube_day}
        renderItem={renderItemTiny}
        keyExtractor={item => item.id}
      />
    ) : null;

  if (!youtube) return null;
  return (
    <FlatList
      ListHeaderComponent={Header}
      data={youtube}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
    />
  );
};

export default Youtubecreen;
