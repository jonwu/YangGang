import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateModal, onboard } from "modules/app/actions";
import Button from "components/utils/Button";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { openWebBrowser } from "utils/Utils";

const generateStyles = theme => ({});

const DonationModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const isVisible = useSelector(state => state.app.modals.donation);
  const dispatch = useDispatch();
  const openCount = useSelector(state => state.settings.openCount);
  const onboarded = useSelector(state => state.settings.onboards.donation);

  React.useEffect(() => {
    if (openCount > 7 && !onboarded) {
      dispatch(updateModal("donation", true));
      dispatch(onboard("donation"));
    }
  }, [openCount]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => dispatch(updateModal("donation", false))}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: theme.black(0.75)
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: theme.bg3(),
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: theme.spacing_2,
                paddingTop: 48,
                paddingBottom: 64,
                alignItems: "center"
              }}
            >
              <View style={{ alignItems: "center", width: 300 }}>
                <Text style={[gstyles.p1_50, gstyles.bottom_2]}>
                  Pay what you think is fair
                </Text>
                <Text style={[gstyles.h4_bold, { textAlign: "center" }]}>
                  Your contribution helps us cover
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: theme.spacing_1
                  }}
                >
                  <View style={{ width: 100, alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name={"server"}
                      color={theme.yangRed()}
                      size={36}
                    />
                    <Text style={[gstyles.p1_50]}>Server cost</Text>
                  </View>
                  <View style={{ width: 100, alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name={"ghost"}
                      color={theme.blue()}
                      size={36}
                    />
                    <Text style={[gstyles.p1_50]}>Ad-free</Text>
                  </View>
                  <View style={{ width: 100, alignItems: "center" }}>
                    <AntDesign
                      name={"star"}
                      color={theme.yangGold()}
                      size={36}
                    />
                    <Text style={[gstyles.p1_50]}>Free Foreverrr</Text>
                  </View>
                </View>
                <Button
                  style={{ alignSelf: "stretch" }}
                  bgColor={theme.red()}
                  text={"Become a Patron"}
                  onPress={() => {
                    dispatch(updateModal("donation", false));
                    openWebBrowser("https://www.patreon.com/theyangapp", theme);
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DonationModal;
