import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import ActionBarView from "./ActionBarView";
import { Video } from "expo-av";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { transformN } from "utils/Utils";
import moment from "moment";

const generateStyles = theme => ({
  container: {
    flexDirection: "row",
    backgroundColor: theme.bg2()
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: theme.bg2(),
    marginRight: theme.spacing_3
  },
  header: {
    flexDirection: "row",
    marginBottom: theme.spacing_5,
    alignItems: "center"
  },
  body: {
    flex: 1
  }
});

const TwitterItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  let {
    retweeted_status,
    full_text,
    user,
    extended_entities,
    retweet_count,
    favorite_count,
    created_at
  } = item;
  let text = full_text;
  let name = user.name;
  let screen_name = user.screen_name;
  let avatar_url = user.profile_image_url;
  let photos = null;
  let video = null;

  if (retweeted_status != null) {
    text = retweeted_status.full_text;
    name = retweeted_status.user.name;
    screen_name = retweeted_status.user.screen_name;
    avatar_url = retweeted_status.user.profile_image_url;
    retweet_count = retweeted_status.retweet_count;
    favorite_count = retweeted_status.favorite_count;
  }
  if (extended_entities && extended_entities.media) {
    photos = extended_entities.media.filter(item => item.type === "photo");
    video = extended_entities.media.find(item => item.type === "video");
  }

  return (
    <View style={{ backgroundColor: theme.bg2(), padding: theme.spacing_3 }}>
      {retweeted_status != null && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 36
          }}
        >
          <MaterialCommunityIcons
            name={"twitter-retweet"}
            size={20}
            style={{ marginTop: 3, marginRight: theme.spacing_5 }}
            color={theme.text(0.5)}
          />
          <Text style={[gstyles.caption_50]}>Andrew Yang Retweeted</Text>
        </View>
      )}
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: avatar_url }} />
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={[gstyles.p1_bold, gstyles.right_5]}>{name}</Text>
            <Text style={gstyles.p1_50}>
              {`@${screen_name}`} - {moment(created_at).fromNow(true)}
            </Text>
          </View>
          <Text style={gstyles.p1}>{text}</Text>
          <Photo medias={photos} />
          <TwitterVideo video={video} />
          <View
            style={[
              { alignItems: "center", flexDirection: "row" },
              gstyles.top_3
            ]}
          >
            <MaterialCommunityIcons
              name={"twitter-retweet"}
              size={20}
              style={{ marginTop: 3, marginRight: theme.spacing_5 }}
              color={theme.text(0.5)}
            />
            <Text style={[gstyles.caption_50, gstyles.right_3]}>
              {transformN(retweet_count, 1)}
            </Text>
            <MaterialCommunityIcons
              name={"heart-outline"}
              size={16}
              style={{ marginTop: 3, marginRight: theme.spacing_5 }}
              color={theme.text(0.5)}
            />
            <Text style={[gstyles.caption_50, gstyles.right_3]}>
              {transformN(favorite_count, 1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const TwitterVideo = ({ video }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  if (!video) return null;
  const contentWidth = DEVICE_WIDTH - 48 - theme.spacing_3 * 3;
  return (
    <View
      style={[
        {
          width: "100%",
          borderRadius: 8,
          overflow: "hidden"
        },
        gstyles.top_5
      ]}
    >
      <Video
        source={{ uri: video.video_info.variants[0].url }}
        useNativeControls
        style={{
          width: contentWidth,
          height: (contentWidth * video.sizes.thumb.h) / video.sizes.thumb.w
        }}
      />
    </View>
  );
};
const Photo = ({ medias }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  let content = null;
  if (medias === null || medias.length === 0) return null;
  switch (medias.length) {
    case 1:
      content = (
        <Image
          source={{ uri: medias[0].media_url }}
          style={[{ width: "100%", height: "100%" }]}
        />
      );
      break;
    case 2:
      content = (
        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <Image
            source={{ uri: medias[0].media_url }}
            style={[{ flex: 1, height: "100%" }, gstyles.right_5]}
          />
          <Image
            source={{ uri: medias[1].media_url }}
            style={[{ flex: 1, height: "100%" }, gstyles.right_5]}
          />
        </View>
      );
      break;
    case 3:
      content = (
        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <View style={[{ flex: 1 }, gstyles.right_5]}>
            <Image
              source={{ uri: medias[0].media_url }}
              style={[{ flex: 1, height: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: medias[1].media_url }}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[2].media_url }}
              style={[{ flex: 1, width: "100%" }]}
            />
          </View>
        </View>
      );
      break;
    default:
      content = (
        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <View style={[{ flex: 1 }, gstyles.right_5]}>
            <Image
              source={{ uri: medias[0].media_url }}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[1].media_url }}
              style={[{ flex: 1, width: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: medias[2].media_url }}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[3].media_url }}
              style={[{ flex: 1, width: "100%" }]}
            />
          </View>
        </View>
      );
  }
  return (
    <View
      style={[
        {
          width: "100%",
          height: 180,
          borderRadius: 8,
          overflow: "hidden"
        },
        gstyles.top_5
      ]}
    >
      {content}
    </View>
  );
};

const TwitterItemContainer = React.memo(({ item }) => {
  return (
    <ActionBarView
      openLabel={"Open in Twitter"}
      openIcon={"twitter-square"}
      link={`https://twitter.com/AndrewYang/status/${item.id_str}`}
      message={`${item.full_text}`}
    >
      <TwitterItem item={item} />
    </ActionBarView>
  );
});
export default TwitterItemContainer;
