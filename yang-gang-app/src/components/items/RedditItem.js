import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { Video } from "expo-av";
import ActionBarView from "./ActionBarView";
import { Entypo } from "@expo/vector-icons";
import { transformN } from "utils/Utils";
import moment from "moment";
import { useDimensionStore } from "utils/DimensionUtils";
import YoutubeIcon from "assets/youtube_icon.png";

const generateStyles = theme => ({
  body: {
    // padding: theme.spacing_2
  },
  allPads: {
    padding: theme.spacing_2
  },
  thumbnail: {
    backgroundColor: theme.bg2()
  },
  thumbnailContainer: {
    flexDirection: "row"
  }
});

const RedditItem = React.memo(({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, preview, thumbnail, media, id, score } = item;
  const isEnabled = preview != null && preview.enabled;
  const isRedditVideo = media && media.reddit_video != null;
  const isYoutube = media && media.type === "youtube.com";

  let content = null;

  if (isYoutube) {
    content = <RedditYoutube item={item} navigation={navigation} />;
  } else if (isRedditVideo) {
    content = <RedditVideo item={item} />;
  } else if (isEnabled) {
    content = <RedditImage item={item} navigation={navigation} />;
  } else if (thumbnail !== "self") {
    content = <RedditThumbnail item={item} navigation={navigation} />;
  } else {
    content = <RedditDescription item={item} navigation={navigation} />;
  }

  return (
    <ActionBarView
      openLabel={"Open in Reddit"}
      openIcon={"reddit-square"}
      link={`https://reddit.com/r/YangForPresidentHQ/comments/${id}`}
      message={item.title}
      navigation={navigation}
    >
      <View style={{ backgroundColor: theme.bg2(), padding: theme.spacing_2 }}>
        {content}
        <RedditFooter item={item} />
      </View>
    </ActionBarView>
  );
});

const RedditFooter = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { stickied } = item;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: theme.spacing_5
      }}
    >
      {stickied && (
        <Entypo
          name="pin"
          color={theme.green()}
          size={20}
          style={{ marginRight: theme.spacing_4 }}
        />
      )}
      <Text style={[gstyles.caption_50, { flex: 1 }]}>
        {moment(item.created_utc * 1000).fromNow()}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Entypo
          name={"arrow-up"}
          size={20}
          style={{ marginRight: theme.spacing_5 }}
          color={theme.text()}
        />
        <Text style={[gstyles.caption]}>{transformN(item.score, 1)}</Text>
        <Entypo
          name={"arrow-down"}
          size={20}
          style={{ marginTop: 2, marginLeft: theme.spacing_5 }}
          color={theme.text()}
        />
      </View>
    </View>
  );
};
const RedditHeader = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <Text style={gstyles.caption_50}>
        {moment(item.created_utc * 1000).fromNow()}
      </Text>
    </View>
  );
};

const RedditTitle = ({ title }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View style={gstyles.bottom_2}>
      <Text style={[gstyles.h4_bold]}>{title}</Text>
    </View>
  );
};
const RedditImage = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { deviceWidth } = useDimensionStore();
  const { title, selftext, preview } = item;
  const source = preview != null && preview.images[0].source;
  const contentWidth = deviceWidth - theme.spacing_2 * 2;
  const src =
    preview.images[0].resolutions.find(r => r.width >= contentWidth) || source;
  return (
    <View style={{ backgroundColor: theme.bg2() }}>
      <RedditTitle title={title} />
      {src && (
        <View
          style={{
            borderRadius: 8,
            overflow: "hidden",
            alignSelf: "center"
          }}
        >
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() =>
              navigation.navigate("Photo", {
                uri: src.url,
                height: src.height,
                width: src.width,
                title
              })
            }
          >
            <View style={{ maxHeight: deviceWidth / 1.5, overflow: "hidden" }}>
              <Image
                style={[
                  styles.thumbnail,
                  {
                    width: contentWidth,
                    height: (contentWidth * src.height) / src.width,
                    backgroundColor: theme.text(0.1)
                  }
                ]}
                source={{ uri: src.url }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

const RedditYoutube = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, secure_media_embed, url, preview } = item;
  const source = preview != null && preview.images[0].source;
  const { deviceWidth } = useDimensionStore();
  const contentWidth = deviceWidth - theme.spacing_2 * 2;
  const src =
    preview.images[0].resolutions.find(r => r.width >= contentWidth) || source;
  return (
    <View>
      <TouchableOpacity
        activeOpacity={theme.activeOpacity}
        onPress={() => navigation.navigate("Webview", { title, uri: url })}
      >
        <RedditTitle title={title} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => navigation.navigate("Webview", { title, uri: url })}
      >
        <View style={{ borderRadius: theme.borderRadius, overflow: "hidden" }}>
          <Image
            style={[
              styles.thumbnail,
              {
                width: contentWidth,
                height: (contentWidth * 9) / 16,
                backgroundColor: theme.text(0.1)
              }
            ]}
            source={{ uri: src.url }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image source={YoutubeIcon} style={{ width: 72, height: 50.6 }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const RedditVideo = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, secure_media } = item;
  const source = secure_media.reddit_video;
  const videoRef = React.useRef(null);
  const { deviceWidth } = useDimensionStore();

  return (
    <View>
      <RedditTitle title={title} />
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => videoRef.current.presentFullscreenPlayer()}
      >
        <Video
          ref={videoRef}
          source={{ uri: source.hls_url }}
          useNativeControls
          style={{
            marginLeft: -theme.spacing_2,
            width: deviceWidth,
            height: (deviceWidth * source.height) / source.width
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const RedditThumbnail = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const {
    title,
    selftext,
    preview,
    thumbnail,
    thumbnail_height,
    thumbnail_width,
    domain,
    url
  } = item;

  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={() => navigation.navigate("Webview", { title, uri: url })}
    >
      <View>
        <View style={styles.thumbnailContainer}>
          <Text style={[gstyles.h4_bold, gstyles.right_2, gstyles.flex]}>
            {title}
          </Text>
          <TouchableOpacity
            activeOpacity={theme.activeOpacity}
            onPress={() => navigation.navigate("Webview", { title, uri: url })}
          >
            <View
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: theme.borderColor,
                overflow: "hidden",
                height: 75,
                width: 100
              }}
            >
              <Image
                source={{ uri: thumbnail }}
                style={{
                  height: 75,
                  width: 100,
                  backgroundColor: theme.text(0.1)
                }}
              />
              <View
                style={{
                  position: "absolute",
                  width: 100,
                  padding: 4,
                  bottom: 0,
                  backgroundColor: theme.dark(0.5)
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[gstyles.caption_bold, { color: theme.light() }]}
                >
                  {domain}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RedditDescription = ({ item, navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { title, selftext, preview } = item;

  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={() =>
        navigation.navigate("Description", {
          title,
          description: selftext
        })
      }
    >
      <RedditTitle title={title} />
      {selftext != "" && (
        <Text numberOfLines={4} style={[gstyles.caption, gstyles.bottom_5]}>
          {selftext}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RedditItem;
