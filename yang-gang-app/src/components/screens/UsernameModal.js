import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";
import { useThemeKit } from "utils/ThemeUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateModal, updateUser } from "modules/app/actions";

const generateStyles = theme => ({});

const UsernameModal = () => {
  const { theme, gstyles, styles } = useThemeKit(generateStyles);
  const isVisible = useSelector(state => state.app.modals.username);
  const user = useSelector(state => state.settings.user);
  const [username, setUsername] = React.useState(user.username);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isVisible) {
      setUsername(user.username);
    }
  }, [isVisible]);

  const onClose = () => {
    Keyboard.dismiss();
    if (username && username.trim() != "" && username != user.username)
      dispatch(updateUser({ username }));
    dispatch(updateModal("username", false));
  };
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: theme.black(0.75)
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <KeyboardAvoidingView
              behavior="position"
              enabled={Platform.OS === "ios"}
              // keyboardVerticalOffset={200}
            >
              <View
                style={{
                  backgroundColor: theme.bg3(),
                  height: 200,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: theme.spacing_2
                }}
              >
                <Text style={[gstyles.h3_bold, gstyles.bottom_2]}>
                  Change Username
                </Text>
                <View
                  style={{
                    backgroundColor: theme.text(0.1),
                    borderRadius: theme.borderRadius,
                    overflow: "hidden"
                  }}
                >
                  <TextInput
                    autoFocus
                    value={username}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    onChangeText={setUsername}
                    returnKeyType={"done"}
                    onSubmitEditing={onClose}
                    style={[
                      gstyles.p1,
                      {
                        paddingHorizontal: theme.spacing_2,
                        paddingVertical: theme.spacing_4
                      }
                    ]}
                    placeholder={"Enter desired username"}
                    placeholderTextColor={theme.text(0.5)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UsernameModal;
