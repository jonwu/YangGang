import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateModal } from "modules/app/actions";

const generateStyles = theme => ({});

const UsernameModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const isVisible = useSelector(state => state.app.modals.username);

  const dispatch = useDispatch();
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => dispatch(updateModal("username", false))}
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
                height: 200,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16
              }}
            ></View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UsernameModal;
