import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreateScreen from "./CreateScreen";
import ProfileScreen from "./ProfileScreen";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#21212180",
        tabBarStyle: { height: 83 },
        tabBarItemStyle: { marginBottom: 22, paddingTop: 8 },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          title: "Publications",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Med",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
          },
          headerRight: ({ focused, size, color }) => (
            <Entypo
              name="log-out"
              size={24}
              color={color}
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={{ marginRight: 20 }}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
          title: "Create post",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Med",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
          },
          tabBarIconStyle: {
            width: 70,
            height: 40,
            backgroundColor: "#ff6c00",
            borderRadius: 20,
          },
          tabBarActiveTintColor: "#fff",
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
