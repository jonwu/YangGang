import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Image
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateShowMoneyModal } from "modules/app/actions";
import bobaSrc from "assets/boba.png";

const generateStyles = theme => ({});

const Coffee = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text
            style={[
              gstyles.h2_bold,
              { color: theme.light(), fontFamily: "montserrat-extra-bold" }
            ]}
          >
            Let us buy
          </Text>
          <Text
            style={[
              gstyles.h2_bold,
              { color: theme.light(), fontFamily: "montserrat-extra-bold" }
            ]}
          >
            Your next
          </Text>
          <Text
            style={[
              gstyles.h1_bold,
              gstyles.bottom_2,
              { color: theme.light(), fontFamily: "montserrat-extra-bold" }
            ]}
          >
            Boba
          </Text>
        </View>
        <Image source={bobaSrc} style={{ height: 150, width: 150 }} />
      </View>
      <Text
        style={[
          gstyles.h4_bold,
          gstyles.bottom_4,
          { color: theme.yangGold(), fontFamily: "montserrat-extra-bold" }
        ]}
      >
        $4 CASH GIVEAWAY
      </Text>
      <Text style={[gstyles.caption_bold, { color: theme.light(0.5) }]}>
        We will select 5 people at random on Oct. 15.
      </Text>
      <Text
        style={[
          gstyles.bottom_1,
          gstyles.caption_bold,
          { color: theme.light(0.5) }
        ]}
      >
        To participate, follow us on twitter and retweet!
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://twitter.com/TheYangApp")}
          style={{
            flex: 1,
            height: 48,
            borderRadius: 4,
            marginRight: theme.spacing_2
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.light(),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={[gstyles.p1_bold, { color: theme.dark() }]}>
              Follow us!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, height: 48, borderRadius: 4 }}
          onPress={() =>
            Linking.openURL(
              "https://twitter.com/TheYangApp/status/1181733696132354048"
            )
          }
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.light(),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={[gstyles.p1_bold, { color: theme.dark() }]}>
              Retweet!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const MoneyDropModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  // const [modalVisible, setModalVisible] = React.useState(true);
  const dispatch = useDispatch();
  const modalVisible = useSelector(state => state.app.showMoneyModal);
  const setModalVisible = show => dispatch(updateShowMoneyModal(show));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.black(0.75)
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                width: 320,
                borderRadius: 4,
                overflow: "hidden",
                padding: theme.spacing_2,
                backgroundColor: theme.dark()
                // alignItems: "center",
                // justifyContent: "center"
              }}
            >
              <Coffee />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Button = ({}) => {};

export default MoneyDropModal;
