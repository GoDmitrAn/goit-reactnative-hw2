import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
const initialState = {
  email: "",
  password: "",
};
// const loadApplication = async () => {
//   await Font.loadAsync({
//     "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
//   });
// };
export default function App() {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [isReady, setIsReady] = useState(false);
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
  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //        onError={console.warn}
  //     />
  //   );
  // }
  return (
    <TouchableWithoutFeedback onPress={keyboardHideAnyTouch}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/bg-rain.jpg")}
          style={styles.bgImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.displayBg}>
              <View style={styles.header}>
                <Text style={styles.headerTitle} textAlign={"center"}>
                  My first app!
                </Text>
              </View>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 10 : 50,
                }}
              >
                <View style={{ marginTop: 30 }}>
                  <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
                  <TextInput
                    style={styles.input}
                    textAlign={"center"}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.inputTitle}>PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    textAlign={"center"}
                    secureTextEntry={true}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={keyboardHide}
                >
                  <Text style={styles.btnTitle}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  displayBg: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  header: { alignItems: "center", marginBottom: 50 },
  headerTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#ff4500",
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  input: {
    height: 50,

    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#d0b887",
    color: "#fff",
    fontSize: 26,
  },
  form: { marginHorizontal: 30 },
  inputTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff5ee",
  },
  btn: {
    marginTop: 30,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    marginHorizontal: 20,
    // backgroundColor: Platform.OS === "ios" ? "transparent" : "#ff7f50",
    // borderColor: Platform.OS === "ios" ? "#00bfff" : "transparent",
    // borderWidth: Platform.OS === "ios" ? 2 : "transparent",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#00bfff",
        borderWidth: 2,
      },
      android: {
        backgroundColor: "#ff7f50",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    fontSize: 18,
    color: Platform.OS === "ios" ? "#00bfff" : "#fff8dc",
  },
});
