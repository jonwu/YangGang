import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import ActionBarView from "./ActionBarView";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { transformN } from "utils/Utils";
import moment from "moment";
import { XmlEntities as Entities } from "html-entities";
import { useDimensionStore } from "utils/DimensionUtils";
import * as WebBrowser from "expo-web-browser";

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
  const { retweeted_status } = item;
  const status = retweeted_status || item;
  const {
    full_text,
    user,
    extended_entities,
    entities,
    retweet_count,
    favorite_count,
    created_at
  } = status;
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
  // const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const regex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  const offsets = [];

  while ((match = regex.exec(full_text)) != null) {
    offsets.push([match.index, match[0].length, match[0]]);
  }
  // console.log(status.display_text_range);
  // console.log(full_text.length);
  // console.log(entities);
  // console.log(offsets);
  const bodies = [];

  const lastIndex = ents.reduce((startIndex, ent, i) => {
    const { indices } = ent;
    let firstIndex = indices[0];
    let secondIndex = indices[1];
    offsets.forEach(offset => {
      const index = offset[0];
      const size = offset[1];
      if (index < firstIndex) {
        firstIndex = firstIndex - 1 + size;
        secondIndex = secondIndex - 1 + size;
      }
    });
    bodies.push(
      xmlEntities.decode(full_text.substr(startIndex, firstIndex - startIndex))
    );
    let replacement = null;
    if (ent.text)
      replacement = (
        <Text key={startIndex} style={{ color: theme.tweetLinkColor() }}>
          #{ent.text}
        </Text>
      );

    if (ent.expanded_url && !ent.type)
      replacement = (
        <Text
          onPress={
            () => WebBrowser.openBrowserAsync(ent.expanded_url)
            // navigation.navigate("Webview", {
            //   uri: ent.expanded_url
            // })
          }
          key={startIndex}
          style={{ color: theme.tweetLinkColor() }}
        >
          {ent.expanded_url}
        </Text>
      );
    if (ent.screen_name)
      replacement = (
        <Text key={startIndex} style={{ color: theme.tweetLinkColor() }}>
          @{ent.screen_name}
        </Text>
      );

    if (replacement) bodies.push(replacement);
    return secondIndex;
  }, 0);
  bodies.push(xmlEntities.decode(full_text.substr(lastIndex)));

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
              {`@${screen_name}`} - {moment(new Date(created_at)).fromNow(true)}
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
  const { deviceWidth } = useDimensionStore();

  if (!video) return null;
  const variant = video.video_info.variants.reduce((variant, n) => {
    if (variant === null) return n;
    if (n.bitrate > variant.bitrate) return n;
    return variant;
  }, null);
  const contentWidth = deviceWidth - 48 - theme.spacing_3 * 3;
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
      {Platform.OS === "ios" ? (
        <TouchableWithoutFeedback
          onPress={() => videoRef.current.presentFullscreenPlayer()}
        >
          <Video
            ref={videoRef}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            source={{
              uri: variant.url.split("?")[0]
            }}
            useNativeControls
            style={{
              backgroundColor: theme.text(0.1),
              width: contentWidth,
              height: (contentWidth * video.sizes.thumb.h) / video.sizes.thumb.w
            }}
          />
        </TouchableWithoutFeedback>
      ) : (
        <Video
          ref={videoRef}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{
            uri: variant.url.split("?")[0]
          }}
          useNativeControls
          style={{
            backgroundColor: theme.text(0.1),
            width: contentWidth,
            height: (contentWidth * video.sizes.thumb.h) / video.sizes.thumb.w
          }}
        />
      )}
    </View>
  );
};
const Photo = ({ medias, navigation }) => {
  const { deviceWidth } = useDimensionStore();
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
          height: deviceWidth / 2.5,
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
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
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
      <Image
        source={{ uri: media.media_url }}
        style={[style, { backgroundColor: theme.text(0.1) }]}
      />
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
