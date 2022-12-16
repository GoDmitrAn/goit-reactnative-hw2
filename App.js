import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
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
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

const initialState = {
  email: "",
  password: "",
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 40 * 2
  );

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Roboto-Reg": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Med": require("./assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }
    const onChange = () => {
      const width = Dimensions.get("window").width - 40 * 2;
      console.log("width", width);
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    prepare();
    return () => {
      // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

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

  if (!isReady) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHideAnyTouch}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("./assets/images/photo-bg.jpg")}
          style={styles.bgImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.section}>
              <RegistrationScreen />

              {/* <View style={styles.header}>
                <Text style={styles.headerTitle} textAlign={"center"}>
                  My first app!
                </Text>
              </View>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 10 : 50,
                  width: dimensions,
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
              </View> */}
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
  section: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: { alignItems: "center", marginBottom: 50 },
  headerTitle: {
    fontSize: 42,

    color: "#ff4500",

    fontFamily: "Roboto-Bold",
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
  form: {
    // marginHorizontal: 30
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 18,

    color: "#fff5ee",
    fontFamily: "Roboto-Reg",
  },
  btn: {
    marginTop: 30,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    marginHorizontal: 20,
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
