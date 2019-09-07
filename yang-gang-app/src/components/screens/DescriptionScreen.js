import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import Header from "./Header";
import Markdown from "react-native-markdown-renderer";

import { XmlEntities as Entities } from "html-entities";

const entities = new Entities();

const generateStyles = theme => ({});

const markdownStyles = {
  text: {
    color: "white"
  }
};

const DescriptionScreen = ({ navigation }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  uri = navigation.getParam("uri");
  description = navigation.getParam("description");
  title = navigation.getParam("title");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Header
        close
        bgColor={theme.bgHeader()}
        navigation={navigation}
        title={title || uri}
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.bg2()
        }}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text
          style={[gstyles.h4_bold, { color: theme.text(), marginBottom: 16 }]}
        >
          {title}
        </Text>
        <Markdown style={{ text: { color: theme.text(), lineHeight: 22 } }}>
          {description}
        </Markdown>
      </ScrollView>
    </View>
  );
};

export default DescriptionScreen;
