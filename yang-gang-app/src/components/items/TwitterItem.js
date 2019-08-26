import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import ActionBarView from "./ActionBarView";
import { Video } from "expo-av";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { transformN } from "utils/Utils";
import moment from "moment";
import { XmlEntities as Entities } from "html-entities";

const xmlEntities = new Entities();

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

function replaceIndices(str, indices, string) {
  console.log(str, indices);
  return str.substr(0, indices[0]) + string + str.substr(indices[1] + 1);
}

const TwitterItem = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  let { retweeted_status } = item;
  const status = retweeted_status || item;
  let {
    full_text,
    user,
    extended_entities,
    entities,
    retweet_count,
    favorite_count,
    created_at
  } = status;
  let text = full_text;
  let name = user.name;
  let screen_name = user.screen_name;
  let avatar_url = user.profile_image_url;
  let photos = null;
  let video = null;
  let ents = [];

  if (entities) {
    ents = [...ents, ...entities.hashtags];
    ents = [...ents, ...entities.user_mentions];
    ents = [...ents, ...entities.urls];
  }
  if (extended_entities && extended_entities.media) {
    photos = extended_entities.media.filter(item => item.type === "photo");
    video = extended_entities.media.find(item => item.type === "video");
    ents = [...ents, ...photos];
    if (video) ents = [...ents, video];
  }

  ents.sort((a, b) => {
    return a.indices[0] > b.indices[0];
  });
  full_text = xmlEntities.decode(full_text);
  full_text = full_text.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    " "
  );
  const bodies = [];
  const lastIndex = ents.reduce((index, ent, i) => {
    const { indices } = ent;
    const start = full_text.substr(index, indices[0] - index);
    let replacement = null;
    if (ent.text)
      replacement = (
        <Text key={index} style={{ color: theme.tweetLinkColor() }}>
          #{ent.text}
        </Text>
      );

    if (ent.expanded_url && !ent.type)
      replacement = (
        <Text
          onPress={() =>
            navigation.navigate("Webview", {
              uri: ent.expanded_url
            })
          }
          key={index}
          style={{ color: theme.tweetLinkColor() }}
        >
          {ent.expanded_url}
        </Text>
      );
    if (ent.screen_name)
      replacement = (
        <Text key={index} style={{ color: theme.tweetLinkColor() }}>
          @{ent.screen_name}
        </Text>
      );

    bodies.push(start);
    if (replacement) bodies.push(replacement);
    return indices[1];
  }, 0);
  bodies.push(full_text.substr(lastIndex));
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
          <Text style={gstyles.p1}>{bodies}</Text>
          <Photo medias={photos} navigation={navigation} />
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
  const videoRef = React.useRef(null);

  if (!video) return null;
  const variant = video.video_info.variants.reduce((variant, n) => {
    if (variant === null) return n;
    if (n.bitrate > variant.bitrate) return n;
    return variant;
  }, null);
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
      <TouchableWithoutFeedback
        onPress={() => videoRef.current.presentFullscreenPlayer()}
      >
        <Video
          ref={videoRef}
          source={{ uri: variant.url }}
          useNativeControls
          style={{
            width: contentWidth,
            height: (contentWidth * video.sizes.thumb.h) / video.sizes.thumb.w
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
const Photo = ({ medias, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  let content = null;
  if (medias === null || medias.length === 0) return null;
  switch (medias.length) {
    case 1:
      content = (
        <TwitterImage
          media={medias[0]}
          navigation={navigation}
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
          <TwitterImage
            media={medias[0]}
            navigation={navigation}
            style={[{ flex: 1, height: "100%" }, gstyles.right_5]}
          />
          <TwitterImage
            media={medias[1]}
            navigation={navigation}
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
            <TwitterImage
              media={medias[0]}
              navigation={navigation}
              style={[{ flex: 1, height: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TwitterImage
              media={medias[1]}
              navigation={navigation}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <TwitterImage
              media={medias[2]}
              navigation={navigation}
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
            <TwitterImage
              media={medias[0]}
              navigation={navigation}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <TwitterImage
              media={medias[1]}
              navigation={navigation}
              style={[{ flex: 1, width: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TwitterImage
              media={medias[2]}
              navigation={navigation}
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <TwitterImage
              media={medias[3]}
              navigation={navigation}
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

const TwitterImage = ({ media, style, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("Photo", {
          uri: media.media_url,
          height: media.sizes.medium.h,
          width: media.sizes.medium.w
        })
      }
    >
      <Image source={{ uri: media.media_url }} style={style} />
    </TouchableWithoutFeedback>
  );
};
const TwitterItemContainer = React.memo(({ item, navigation }) => {
  return (
    <ActionBarView
      openLabel={"Open in Twitter"}
      openIcon={"twitter-square"}
      link={`https://twitter.com/AndrewYang/status/${item.id_str}`}
      message={`${item.full_text}`}
      navigation={navigation}
    >
      <TwitterItem item={item} navigation={navigation} />
    </ActionBarView>
  );
});
export default TwitterItemContainer;
