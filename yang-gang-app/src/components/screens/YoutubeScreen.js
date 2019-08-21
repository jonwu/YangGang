import React from "react";
import { View, WebView, FlatList } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import YoutubeItem from "components/items/YoutubeItem";
import { updateYoutube } from "modules/app/actions";
import Separator from "components/items/TwitterSeparator";

const styles = theme => {};
const Youtubecreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const youtube = useSelector(state => state.app.youtube);
  const renderItem = ({ item: youtube }) => {
    return <YoutubeItem item={youtube} navigation={navigation} />;
  };

  React.useEffect(() => {
    dispatch(updateYoutube());
  }, []);

  if (!youtube) return null;
  return (
    <FlatList
      data={youtube}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
    />
  );
};

export default Youtubecreen;
