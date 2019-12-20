import moment from "moment-timezone";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import BackendUtils from "utils/BackendUtils";
import { useThemeKit } from "utils/ThemeUtils";
import { EventList } from "./TwitterScreen";
import Header from "./Header";
import EventItem from "components/items/EventItem";
import { useEventsStore } from "utils/StoreUtils";
import { useSelector, useDispatch } from "react-redux";

const generateStyles = theme => ({});

const BasicForm = ({ title, value, setValue, autoCapitalize = "none" }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <View
      style={[
        { paddingHorizontal: theme.spacing_2, paddingVertical: theme.spacing_4 }
      ]}
    >
      <Text style={[gstyles.caption_bold_50, gstyles.bottom_5]}>{title}</Text>
      <TextInput
        style={[
          gstyles.p1,
          {
            backgroundColor: theme.text(0.05),
            borderRadius: 4,
            padding: theme.spacing_5
          }
        ]}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

const Button = ({ style, onPress, text }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            alignSelf: "flex-end",
            paddingVertical: theme.spacing_4,
            paddingHorizontal: theme.spacing_2,
            backgroundColor: theme.dark(),
            borderRadius: theme.borderRadius
          },
          style
        ]}
      >
        <Text style={[gstyles.p1_bold, { color: theme.light() }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const PostEventsScreen = ({ navigation }) => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const [id, setId] = React.useState("");
  const [event_type, setEventType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [line1, setLine1] = React.useState("");
  const [line2, setLine2] = React.useState("");
  const [image, setImage] = React.useState("");
  const [link, setLink] = React.useState("");
  const [month, setMonth] = React.useState(moment().format("MM"));
  const [date, setDate] = React.useState(moment().format("D"));
  const [hour, setHour] = React.useState("0");
  const [minute, setMinute] = React.useState("0");
  const [event_date, setEventDate] = React.useState("");
  const [body, setBody] = React.useState("");
  const [ownerId, setOwnerId] = React.useState(null);
  const [tag, setTag] = React.useState("");
  const [pnLink, setPnLink] = React.useState("");
  const events = useEventsStore(state => state.events);
  const fetchEvents = useEventsStore(state => state.fetchEvents);
  const user = useSelector(state => state.settings.user);

  React.useEffect(() => {
    if (user) setOwnerId(user.id.toString());
  }, [user]);
  React.useEffect(() => {
    fetchEvents();
  }, []);

  React.useEffect(() => {
    setEventDate(
      moment()
        .tz("America/Los_Angeles")
        .set({
          month: (month !== "" ? Number.parseInt(month) : 1) - 1,
          date,
          hour,
          minute,
          seconds: 0,
          milliseconds: 0
        })
        .toISOString()
    );
  }, [month, date, hour, minute]);

  const params = {
    event_type,
    title,
    line1,
    line2,
    image,
    link,
    event_date
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg() }}
      // keyboardVerticalOffset={104}
      behavior="padding"
      enabled
    >
      <Header close navigation={navigation} />

      <View style={gstyles.bottom_5}>
        <EventList
          events={events}
          onPressEvent={event => {
            setId(event.id.toString());
            setEventType(event.event_type);
            setTitle(event.title);
            setLine1(event.line1);
            setLine2(event.line2);
            setImage(event.image);
            setLink(event.link);
            const LAmoment = moment(event.event_date).tz("America/Los_Angeles");
            setMonth((LAmoment.month() + 1).toString());
            setDate(LAmoment.date().toString());
            setHour(LAmoment.hour().toString());
            setMinute(LAmoment.minute().toString());
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <BasicForm title={"id"} value={id} setValue={setId} />
        <BasicForm title={"type"} value={event_type} setValue={setEventType} />
        <BasicForm title={"title"} value={title} setValue={setTitle} />
        <BasicForm title={"line1"} value={line1} setValue={setLine1} />
        <BasicForm title={"line2"} value={line2} setValue={setLine2} />
        <BasicForm title={"link"} value={link} setValue={setLink} />
        <BasicForm title={"image"} value={image} setValue={setImage} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BasicForm title={"month"} value={month} setValue={setMonth} />
          <BasicForm title={"date"} value={date} setValue={setDate} />
          <BasicForm title={"hour"} value={hour} setValue={setHour} />
          <BasicForm title={"minute"} value={minute} setValue={setMinute} />
          <Text style={gstyles.caption_bold_50}>Note: hour is 0 - 24 </Text>
        </View>
        <BasicForm
          title={"event_date"}
          value={event_date}
          setValue={setEventDate}
        />
        <View
          style={{
            padding: theme.spacing_2
          }}
        >
          <EventItem item={params} />
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-between" },
              gstyles.top_2
            ]}
          >
            <Button
              text="Clear"
              onPress={() => {
                setId("");
                setEventType("");
                setTitle("");
                setLine1("");
                setLine2("");
                setImage("");
                setLink("");
                setMonth(moment().format("MM"));
                setDate(moment().format("D"));
                setHour("0");
                setMinute("0");
                setEventDate("");
              }}
            />
            <Button
              text={id ? "Save" : "Create"}
              style={[{ backgroundColor: theme.red() }, gstyles.bottom_2]}
              onPress={() => {
                const savePromise = id
                  ? BackendUtils.putEvent(id, params)
                  : BackendUtils.postAllEvents(params);
                savePromise.then(() => {
                  fetchEvents();
                });
              }}
            />

            <Button
              text="Delete"
              onPress={() =>
                BackendUtils.deleteEvent(id).then(() => {
                  fetchEvents();
                })
              }
            />
          </View>
        </View>
        <View style={gstyles.top_2}>
          <BasicForm title={"body"} value={body} setValue={setBody} />
          <BasicForm title={"owner_id"} value={ownerId} setValue={setOwnerId} />
          <BasicForm title={"tag"} value={tag} setValue={setTag} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: theme.spacing_2
            }}
          >
            <Tag setTag={setTag} tag="breaking" />
            <Tag setTag={setTag} tag="hype" />
            <Tag setTag={setTag} tag="minor" />
          </View>
          <BasicForm
            title={"link"}
            value={pnLink}
            setValue={setPnLink}
            autoCapitalize={"none"}
          />
          <View style={{ padding: theme.spacing_2 }}>
            <Button
              text="Post Message"
              style={[{ backgroundColor: theme.red() }]}
              onPress={() => {
                const data = {
                  owner_id: ownerId,
                  tag,
                  link: pnLink,
                  title: body
                };

                BackendUtils.postMessage({
                  body,
                  data
                })
                  .then(() => {
                    alert("Success!");
                  })
                  .catch(error => {
                    alert(JSON.stringify(error));
                  });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Tag = ({ tag, setTag }) => {
  const { theme, gstyles } = useThemeKit(generateStyles);
  const COLORS = {
    breaking: theme.red(),
    hype: theme.yangGold(),
    minor: theme.text(0.4)
  };
  return (
    <Text
      onPress={() => setTag(tag)}
      style={[gstyles.caption_bold, { color: COLORS[tag] }]}
    >
      {tag.toUpperCase()}
    </Text>
  );
};
export default PostEventsScreen;
