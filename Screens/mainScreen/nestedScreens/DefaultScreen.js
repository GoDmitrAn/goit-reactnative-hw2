import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.publicationsUser}>
        <View style={styles.userPhoto}></View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const { photo, descriptionTitle, descriptionLocation, location } =
            item;

          return (
            <View style={styles.publicationsItem}>
              <Image
                source={{ uri: photo }}
                style={styles.publicationsItemImage}
              />
              <Text style={styles.descTitle}>{descriptionTitle}</Text>
              <View style={styles.location}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons
                    name="comment"
                    size={24}
                    color="#bdbdbd"
                    style={{ marginRight: 6 }}
                  />
                  <Text>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Map", { location })}
                  style={{ flexDirection: "row" }}
                >
                  <EvilIcons
                    name="location"
                    size={24}
                    color="#bdbdbd"
                    style={{ marginRight: 3 }}
                  />
                  <Text style={styles.descLoc}>{descriptionLocation}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    borderTopColor: "#21212170",
    borderTopWidth: 1,
    borderBottomColor: "#21212170",
    borderBottomWidth: 1,
  },
  publicationsUser: {
    height: 80,

    flexDirection: "row",

    alignItems: "center",
    marginBottom: 20,
  },

  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#fafa2a",
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

  descTitle: {
    fontFamily: "Roboto-Med",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  descLoc: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicationsItem: { marginBottom: 32 },
  publicationsItemImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
});
export default DefaultScreen;
