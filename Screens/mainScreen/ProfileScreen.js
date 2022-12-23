import React from "react";
import { StyleSheet, Text, View } from "react-native";
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#21212170",
    borderTopWidth: 1,
    borderBottomColor: "#21212170",
    borderBottomWidth: 1,
  },
});
export default ProfileScreen;
