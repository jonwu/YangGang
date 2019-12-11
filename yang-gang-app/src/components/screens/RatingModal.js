import React from "react";
import { View, Text, Modal, Image, Platform } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import boba from "assets/boba.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StoreReview } from "expo";

const generateStyles = theme => ({});

const RatingModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const openCount = useSelector(state => state.settings.openCount);
  const [isVisible, setIsVisible] = React.useState(
    Platform.OS === "android" && openCount === 3
  );

  React.useEffect(() => {
    if (Platform.OS === "ios" && openCount === 3) {
      StoreReview.requestReview();
    }
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: theme.spacing_2,
          backgroundColor: theme.black(0.75)
        }}
      >
        <View
          style={{
            maxWidth: 480,
            width: "100%",
            backgroundColor: theme.light(),
            borderRadius: theme.borderRadius,
            padding: theme.spacing_2
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={boba} style={{ height: 200, width: 200 }} />
            <Text style={[gstyles.p1, gstyles.top_2, { color: theme.dark() }]}>
              Enjoying Andrew Yang?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              StoreReview.requestReview();
              setIsVisible(false);
            }}
          >
            <View
              style={{
                backgroundColor: theme.red(),
                paddingVertical: theme.spacing_4,
                borderRadius: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                marginTop: theme.spacing_2
              }}
            >
              <Text style={[gstyles.h4_bold, { color: theme.light() }]}>
                Rate the app!
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <View
              style={{
                backgroundColor: theme.dark(0.1),
                paddingVertical: theme.spacing_4,
                borderRadius: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                marginTop: theme.spacing_2
              }}
            >
              <Text style={[gstyles.h4_bold, { color: theme.dark(0.5) }]}>
                Nope
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
