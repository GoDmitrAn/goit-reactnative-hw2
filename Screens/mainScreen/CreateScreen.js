import React from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

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
  Image,
} from "react-native";

const initialState = {
  title: "",
  locationValue: "",
};
const CreateScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 40 * 2
  );

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [disabledEl, setDisabled] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  useEffect(() => {
    if (!state.title && !state.locationValue) {
      setDisabled(true);
    } else setDisabled(false);
  }, [state.title, state.locationValue]);

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
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };
  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", {
      photo,
      descriptionTitle: state.title,
      descriptionLocation: state.locationValue,
      location,
    });
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
            {!isShowKeyboard && (
              <View style={styles.photoBox}>
                {hasPermission === null && <View />}
                {hasPermission === false && <Text>No access to camera</Text>}
                {hasPermission && (
                  <View style={styles.locationPhoto}>
                    <Camera
                      style={styles.camera}
                      type={type}
                      ref={(ref) => {
                        setCameraRef(ref);
                      }}
                    >
                      {photo && (
                        <Image
                          source={{ uri: photo }}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      )}
                      <TouchableOpacity
                        style={styles.snapContainer}
                        onPress={takePhoto}
                      >
                        <Ionicons
                          name="camera"
                          size={30}
                          color="#fDfDBD"
                          style={{ padding: 10 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.flipContainer}
                        onPress={() => {
                          setType(
                            type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                          );
                        }}
                      >
                        <MaterialIcons
                          name="flip-camera-android"
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </Camera>
                  </View>
                )}
                <Text style={styles.uploadBtn}>Upload photo</Text>
              </View>
            )}

            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 100 : 0,
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
                value={state.locationValue}
                style={{ ...styles.input, marginBottom: 43 }}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => {
                  setIsShowKeyboard(false);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    locationValue: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btn,
                  backgroundColor: disabledEl ? "#f6f6f6" : "#ff6c00",
                }}
                onPress={() => {
                  keyboardHide();
                  sendPhoto();
                }}
                disabled={disabledEl}
              >
                <Text style={styles.btnTitle}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.trashBox}>
            <TouchableOpacity style={styles.trash}>
              <Feather name="trash-2" size={24} color="#bdbdbd" />
            </TouchableOpacity>
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
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  camera: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20, //dont work
  },

  flipContainer: {
    marginLeft: 30,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
  },
  snapContainer: {
    borderColor: "#fff",
    borderRadius: 32,
    height: 62,
    width: 62,
    borderWidth: 1,
    backgroundColor: "#ffffff50",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: "absolute",
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
    flex: 1,
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
  trash: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 34,
  },
  trashBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CreateScreen;
