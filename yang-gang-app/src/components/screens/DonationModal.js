import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateModal } from "modules/app/actions";
import Button from "components/utils/Button";

const generateStyles = theme => ({});

const DonationModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const isVisible = useSelector(state => state.app.modals.donation);
  const dispatch = useDispatch();
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
                paddingVertical: 64,
                alignItems: "center"
              }}
            >
              <View style={{ alignItems: "center", width: 300 }}>
                <Text style={[gstyles.p1_50, gstyles.bottom_2]}>
                  Pay what you think is fair
                </Text>
                <Text style={[gstyles.h4_bold, gstyles.bottom_1]}>
                  Choose your own price
                </Text>
                <Text
                  style={[
                    gstyles.h2_bold,
                    gstyles.bottom_5,
                    { color: theme.blue() }
                  ]}
                >
                  $3
                </Text>
                <Text
                  style={[
                    gstyles.p1,
                    { color: theme.blue() },
                    gstyles.bottom_1
                  ]}
                >
                  /month
                </Text>
                <Button
                  style={{ alignSelf: "stretch" }}
                  text={"Donate"}
                  onPress={() => {}}
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
