import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import PandaList from "components/items/PandaList";
import { updateModal } from "modules/app/actions";

const generateStyles = theme => ({});

const PandaModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const isVisible = useSelector(
    state => state.app.modals && state.app.modals.panda
  );
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
        onPress={() => dispatch(updateModal("panda", false))}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: theme.black(0.75)
          }}
        ></View>
      </TouchableWithoutFeedback>

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0
        }}
      >
        <View
          style={{
            width: 300,
            width: "100%",
            // height: 400,
            backgroundColor: theme.bg3(),
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: theme.spacing_2,
            paddingBottom: 64
            // paddingTop: 12
          }}
        >
          <PandaList />
        </View>
      </View>
    </Modal>
  );
};

export default PandaModal;
