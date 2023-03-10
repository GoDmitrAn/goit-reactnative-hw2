import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import DefaultScreen from "./nestedScreens/DefaultScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();
const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    // <View style={styles.container}>
    //   {/* <View style={styles.publicationsItem}>
    //     <View style={styles.userPhoto}>
    //       <FontAwesome name="photo" size={44} color="black" />
    //     </View>
    //     <View style={styles.userInfo}>
    //       <Text style={styles.userName}>Natali Romanova</Text>
    //       <Text style={styles.userEmail}>email@example.com</Text>
    //     </View>
    //   </View> */}
    //   <FlatList
    //     data={posts}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({ item }) => (
    //       <View style={styles.publicationsItem}>
    //         <Image source={{ uri: item.photo }} style={styles.userPhoto} />
    //       </View>
    //     )}
    //   />
    // </View>

    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
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
