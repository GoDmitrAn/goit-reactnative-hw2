import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.publicationsItem}>
        <View style={styles.userPhoto}>
          <FontAwesome name="photo" size={44} color="black" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopColor: "#21212170",
    borderTopWidth: 1,
    borderBottomColor: "#21212170",
    borderBottomWidth: 1,
  },
  publicationsItem: {
    height: 60,

    flexDirection: "row",

    alignItems: "center",
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#ff6c0070",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  userInfo: {},
  userEmail: {
    fontFamily: "Roboto-Reg",
    fontSize: 11,
    lineHeight: 13,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
});
export default PostsScreen;
