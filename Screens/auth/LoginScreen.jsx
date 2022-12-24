import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};
const LoginScreen = ({ navigation }) => {
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
          <ImageBackground
            source={require("../../assets/images/photo-bg.jpg")}
            style={styles.bgImage}
          >
            <View style={styles.formBox}>
              <Text style={styles.titleForm}>Sign In</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -90 : 144,
                  marginHorizontal: dimensions < 400 ? 16 : 50,
                }}
              >
                <TextInput
                  placeholder="Email"
                  value={state.email}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  placeholder="Password"
                  value={state.password}
                  style={{ ...styles.input, marginBottom: 43 }}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => {
                    keyboardHide();
                    navigation.navigate("Home", { screen: "Posts" });
                  }}
                >
                  <Text style={styles.btnTitle}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.bottomText}>No account? Sign up.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formBox: {
    backgroundColor: "#fff",
    paddingTop: 32,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
export default LoginScreen;
