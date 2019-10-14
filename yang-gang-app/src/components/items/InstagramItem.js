import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import moment from "moment";
import ActionBarView from "./ActionBarView";
import { useDimensionStore } from "utils/DimensionUtils";
import { transformN } from "utils/Utils";
import { Video } from "expo-av";

const generateStyles = theme => ({});

const InstagramItemContainer = React.memo(({ item, navigation }) => {
  return (
    <ActionBarView
      openLabel={`Open in Instagram`}
      openIcon={"instagram"}
      link={`https://www.instagram.com/p/${item.shortcode}`}
      message={""}
      navigation={navigation}
    >
      <InstagramItem item={item} navigation={navigation} />
    </ActionBarView>
  );
});

const InstagramItem = ({ item, navigation }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  const deviceWidth = useDimensionStore(state => state.deviceWidth);
  const { thumbnail_resources, dimensions } = item;
  let prevWidth = 0;
  let imageSource = item.display_url;
  // thumbnail_resources.forEach(resource => {
  //   if (resource.config_width > prevWidth && prevWidth <= deviceWidth) {
  //     imageSource = resource.src;
  //     prevWidth = resource.config_width;
  //   }
  // });

  if (!imageSource) return null;
  const imageHeight = (deviceWidth * dimensions.height) / dimensions.width;
  const imageWidth = deviceWidth;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing_3
        }}
      >
        <Image
          source={{
            uri:
              "https://instagram.fsac1-2.fna.fbcdn.net/vp/fb6fc134d1253d3360613dc9af6459bd/5E362130/t51.2885-19/s150x150/56262993_427967544632392_4799321311249694720_n.jpg?_nc_ht=instagram.fsac1-2.fna.fbcdn.net"
          }}
          style={{
            height: 36,
            width: 36,
            borderRadius: 24,
            marginRight: theme.spacing_3,
            backgroundColor: theme.text(0.1)
          }}
        />
        <Text style={gstyles.p1_bold}>
          andrewyang2020{" "}
          <Text style={gstyles.p1_50}>
            - {moment(new Date(item.taken_at_timestamp * 1000)).fromNow()}
          </Text>
        </Text>
      </View>
      {!item.is_video ? (
        <Image
          source={{ uri: imageSource }}
          style={[
            {
              width: imageWidth,
              height: imageHeight,
              backgroundColor: theme.text(0.1)
            }
          ]}
        />
      ) : (
        <VideoItem
          width={imageWidth}
          height={imageHeight}
          src={item.actual_url}
        />
      )}

      <View style={{ padding: theme.spacing_3 }}>
        <Text style={[gstyles.p1_bold, gstyles.bottom_5]}>
          {transformN(item.edge_media_preview_like.count)} likes
        </Text>
        <Text style={gstyles.p1}>
          <Text style={gstyles.p1_bold}>andrewyang2020 </Text>
          {item.edge_media_to_caption.edges[0].node.text}
        </Text>
      </View>
    </View>
  );
};

const VideoItem = ({ src, width, height }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  const videoRef = React.useRef(null);
  return Platform.OS === "ios" ? (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => videoRef.current.presentFullscreenPlayer()}
    >
      <Video
        ref={videoRef}
        source={{ uri: src }}
        useNativeControls
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={{
          backgroundColor: theme.text(0.1),
          width,
          height
        }}
      />
    </TouchableOpacity>
  ) : (
    <Video
      ref={videoRef}
      source={{ uri: src }}
      useNativeControls
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      style={{
        backgroundColor: theme.text(0.1),
        width,
        height
      }}
    />
  );
};

export default InstagramItemContainer;
