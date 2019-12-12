import React from "react";
import { FlatList, View, Text } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import InstagramItem from "components/items/InstagramItem";
import { updateInstagram } from "modules/app/actions";
import Separator from "components/items/Separator";
import Loading from "components/utils/Loading";
import lodash from "lodash";
import Constants from "expo-constants";

const styles = theme => {};

const keyExtractor = item => item.id;
const InstagramScreen = React.memo(({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(styles);
  const dispatch = useDispatch();
  const instagram = useSelector(
    state => state.app.instagram[state.app.candidate]
  );
  const loadingInstagram = useSelector(state => state.loading.instagram);
  // const expoId = useSelector(state => state.settings.expoId);

  const renderItem = ({ item: instagram }) => {
    return <InstagramItem item={instagram} navigation={navigation} />;
  };

  const fetch = () => {
    if (!loadingInstagram.isRequesting) {
      dispatch(updateInstagram());
    }
  };
  const throttledFetch = React.useRef(lodash.throttle(fetch, 60 * 1000))
    .current;
  // React.useEffect(fetch, []);

  if (!instagram)
    return (
      <Loading
        error={loadingInstagram.error}
        errorKey={"wall"}
        errorRefresh={fetch}
      />
    );

  return (
    <FlatList
      onRefresh={throttledFetch}
      refreshing={loadingInstagram.isRequesting}
      data={instagram}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 88 }}
      ListFooterComponent={() => (
        <View style={[gstyles.top_2, { alignItems: "center" }]}>
          <Text selectable style={gstyles.footnote_50}>
            {Constants.installationId}
          </Text>
          {/* <Text selectable style={[gstyles.footnote_50, gstyles.top_2]}>
            {expoId}
          </Text> */}
        </View>
      )}
    />
  );
});

export default InstagramScreen;
