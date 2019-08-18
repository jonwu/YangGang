import React from "react";
import { View, Text, Image } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import ActionBarView from "./ActionBarView";

const generateStyles = theme => ({
  container: {
    flexDirection: "row",
    padding: theme.spacing_3,
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
    marginBottom: theme.spacing_5
  },
  body: {
    flex: 1
  }
});

const TwitterItem = ({ item }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const { retweeted_status, full_text, user, extended_entities } = item;
  let text = full_text;
  let name = user.name;
  let screen_name = user.screen_name;
  let avatar_url = user.profile_image_url;
  let medias = null;

  if (retweeted_status != null) {
    text = retweeted_status.full_text;
    name = retweeted_status.user.name;
    screen_name = retweeted_status.user.screen_name;
    avatar_url = retweeted_status.user.profile_image_url;
  }
  if (extended_entities && extended_entities.media) {
    medias = extended_entities.media.filter(item => item.type === "photo");
  }
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatar_url }} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[gstyles.p1_bold, gstyles.right_5]}>{name}</Text>
          <Text style={gstyles.p1_50}>{`@${screen_name}`} - Aug 8</Text>
        </View>
        <Text style={gstyles.p1}>{text}</Text>
        <Photo medias={medias} />
      </View>
    </View>
  );
};

const Photo = ({ medias }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  let content = null;
  if (medias === null) return null;
  console.log(medias, medias.length);
  switch (medias.length) {
    case 0:
      content = null;
    case 1:
      content = (
        <Image
          source={{ uri: medias[0].media_url }}
          resizeMode="repeat"
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
            resizeMode="repeat"
            style={[{ flex: 1, height: "100%" }, gstyles.right_5]}
          />
          <Image
            source={{ uri: medias[1].media_url }}
            resizeMode="repeat"
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
              resizeMode="repeat"
              style={[{ flex: 1, height: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: medias[1].media_url }}
              resizeMode="repeat"
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[2].media_url }}
              resizeMode="repeat"
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
              resizeMode="repeat"
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[1].media_url }}
              resizeMode="repeat"
              style={[{ flex: 1, width: "100%" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: medias[2].media_url }}
              resizeMode="repeat"
              style={[{ flex: 1, width: "100%" }, gstyles.bottom_5]}
            />
            <Image
              source={{ uri: medias[3].media_url }}
              resizeMode="repeat"
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

const TwitterItemContainer = ({ item }) => {
  return (
    <ActionBarView openLabel={"Open in Twitter"} openIcon={"logo-twitter"}>
      <TwitterItem item={item} />
    </ActionBarView>
  );
};
export default TwitterItemContainer;
