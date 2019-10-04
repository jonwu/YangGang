import moment from "moment-timezone";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import BackendUtils from "utils/BackendUtils";
import { useThemeKit } from "utils/ThemeUtils";
import { EventList } from "./TwitterScreen";
import Header from "./Header";

const generateStyles = theme => ({});

const BasicForm = ({ title, value, setValue }) => {
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
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
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
  const [events, setEvents] = React.useState([]);

  const fetchEvents = () => {
    BackendUtils.getAllEvents().then(response => {
      setEvents(response.data);
    });
  };
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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
            const LAmoment = moment(event.event_date + "Z").tz(
              "America/Los_Angeles"
            );
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
        <BasicForm title={"image"} value={image} setValue={setImage} />
        <BasicForm title={"link"} value={link} setValue={setLink} />
        <View style={{ flexDirection: "row" }}>
          <BasicForm title={"month"} value={month} setValue={setMonth} />
          <BasicForm title={"date"} value={date} setValue={setDate} />
          <BasicForm title={"hour"} value={hour} setValue={setHour} />
          <BasicForm title={"minute"} value={minute} setValue={setMinute} />
        </View>
        <BasicForm
          title={"event_date"}
          value={event_date}
          setValue={setEventDate}
        />
        <TouchableOpacity
          onPress={() => {
            const params = {
              event_type,
              title,
              line1,
              line2,
              image,
              link,
              event_date
            };
            const savePromise = id
              ? BackendUtils.putEvent(id, params)
              : BackendUtils.postAllEvents(params);
            savePromise.then(() => {
              fetchEvents();
            });
          }}
        >
          <View
            style={{
              marginTop: theme.spacing_2,
              marginRight: theme.spacing_2,
              alignSelf: "flex-end",
              paddingVertical: theme.spacing_4,
              paddingHorizontal: theme.spacing_2,
              backgroundColor: theme.red(),
              borderRadius: theme.borderRadius
            }}
          >
            <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
              {id ? "Save" : "Create"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            BackendUtils.deleteEvent(id).then(() => {
              fetchEvents();
            })
          }
        >
          <View
            style={{
              marginTop: theme.spacing_2,
              marginRight: theme.spacing_2,
              alignSelf: "flex-end",
              paddingVertical: theme.spacing_4,
              paddingHorizontal: theme.spacing_2,
              backgroundColor: theme.dark(),
              borderRadius: theme.borderRadius
            }}
          >
            <Text style={[gstyles.p1_bold, { color: theme.light() }]}>
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostEventsScreen;
