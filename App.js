import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/bg-rain.jpg")}
        style={styles.bgImage}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000099",
            justifyContent: "center",
          }}
        >
          <Text style={styles.titleApp} textAlign={"center"}>
            My first app!
          </Text>
          <View style={styles.form}>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
              <TextInput style={styles.input} textAlign={"center"} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleApp: {
    fontSize: 40,
    fontWeight: "700",
    color: "#ff4500",
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
    height: 40,
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#ff7f50",
    marginTop: 30,
    borderRadius: 10,
    borderColor: Platform.OS === "ios" ? "#00bfff" : "transparent",
    borderWidth: Platform.OS === "ios" ? 2 : "transparent",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    marginHorizontal: 20,
  },
  btnTitle: {
    fontSize: 18,
    color: Platform.OS === "ios" ? "#00bfff" : "#fff8dc",
  },
});
