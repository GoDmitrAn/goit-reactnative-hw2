import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const RegistrationScreen = () => {
  return (
    <View style={styles.formBox}>
      <Text style={styles.titleForm}>Registration</Text>
      <View style={styles.form}>
        <TextInput placeholder="Login" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          placeholder="Password"
          style={{ ...styles.input, marginBottom: 43 }}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
          <Text style={styles.btnTitle}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>Already have an account? Sign in.</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  formBox: {
    backgroundColor: "#82bea0",
    paddingTop: 92,
    paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleForm: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35.16,
    fontFamily: "Roboto-Med",
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 43,
  },
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
