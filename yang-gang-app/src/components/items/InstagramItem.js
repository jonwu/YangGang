import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import moment from "moment";
import ActionBarView from "./ActionBarView";
import { useDimensionStore } from "utils/DimensionUtils";
import { transformN } from "utils/Utils";

const generateStyles = theme => ({});

const InstagramItemContainer = React.memo(({ item, navigation }) => {
  return (
    <ActionBarView
      openLabel={`Open in Instagram`}
      openIcon={"instagram"}
      link={item.url}
      message={`${item.title}`}
      navigation={navigation}
    >
      <InstagramItem item={item} navigation={navigation} />
    </ActionBarView>
  );
});

const InstagramItem = ({ item, navigation }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  const { deviceWidth } = useDimensionStore(state => state.setDimensions);
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: theme.spacing_3}}>
        <Image style={{height: 48, width: 48, borderRadius: 24, marginRight: theme.spacing_3, backgroundColor: theme.text(0.1)}}/>
        <Text style={gstyles.p1_bold}>andrewyang2020</Text>
      </View>
      <Image style={[{width: deviceWidth, height:300, backgroundColor: theme.text(0.1)}]}/>
      <View style={{padding: theme.spacing_3}}>
        <Text style={[gstyles.p1_bold, gstyles.bottom_4]}>{transformN(888999)} likes</Text>
        <Text style={gstyles.p1}><Text style={gstyles.p1_bold}>andrewyang2020</Text> loream </Text>
      </View>
    </View>
  );
};

export default InstagramItemContainer;
