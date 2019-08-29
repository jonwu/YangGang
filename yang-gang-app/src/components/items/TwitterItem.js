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
  // const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const regex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  var re = new RegExp("`", "gi");
  const unicodeIndices = [];

  const matches = full_text.match(regex);
  full_text = full_text.replace(regex, "`");
  while ((match = re.exec(full_text)) != null) {
    unicodeIndices.push(match.index);
  }

  const bodies = [];
  // console.log(unicodeIndices);
  // console.log(ents.map(e => e.indices));
  // console.log(full_text.length);
  const lastIndex = ents.reduce((index, ent, i) => {
    const { indices } = ent;
    let start = "";
    const curr = unicodeIndices.reduce((curr, position, i) => {
      if (curr <= position && position < indices[0]) {
        start += full_text.substring(curr, position) + matches[i];
        return position + 1;
      } else {
        return curr;
      }
    }, index);
    start += full_text.substr(curr, indices[0] - curr);

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

  const curr = unicodeIndices.reduce((curr, position, i) => {
    if (lastIndex <= position) {
      bodies.push(full_text.substring(curr, position) + matches[i]);
      return position + 1;
    } else {
      return curr;
    }
  }, lastIndex);

  bodies.push(full_text.substr(curr));

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
