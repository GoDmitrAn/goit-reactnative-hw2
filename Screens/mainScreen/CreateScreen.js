import React from "react";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  title: "",
  location: "",
};
const CreateScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 40 * 2
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
  }, []);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  const keyboardHideAnyTouch = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHideAnyTouch}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View
            style={{
              ...styles.formBox,
              marginHorizontal: dimensions < 400 ? 16 : 50,
            }}
          >
            <View style={styles.photoBox}>
              <View style={styles.locationPhoto}>
                <MaterialIcons
                  name="add-a-photo"
                  size={44}
                  color="#BDBDBD"
                  style={{
                    padding: 20,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
              <Text style={styles.uploadBtn}>Upload photo</Text>
            </View>

            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -70 : 0,
              }}
            >
              <TextInput
                placeholder="Title"
                value={state.title}
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => {
                  setIsShowKeyboard(false);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
              />
              <TextInput
                placeholder="Location"
                value={state.location}
                style={{ ...styles.input, marginBottom: 43 }}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => {
                  setIsShowKeyboard(false);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, location: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => {
                  keyboardHide;
                  navigation.navigate("Home", { screen: "Posts" });
                }}
              >
                <Text style={styles.btnTitle}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#21212170",
    borderTopWidth: 1,
    borderBottomColor: "#21212170",
    borderBottomWidth: 1,
  },
  photoBox: { marginBottom: 32 },
  locationPhoto: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 16,
    color: "#bdbdbd",
  },
  formBox: {
    backgroundColor: "#fff",
    paddingTop: 32,
    position: "relative",
  },

  titleForm: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35.16,
    fontFamily: "Roboto-Med",
  },
  form: { marginHorizontal: 16 },
  input: {
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Reg",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
  },

  btn: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
    color: "#fff",
    marginBottom: 0,
    textAlign: "center",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Reg",
    color: "#1B4371",
  },
});
export default CreateScreen;
