// import React, { useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import RegistrationScreen from "./Screens/auth/RegistrationScreen";
// import LoginScreen from "./Screens/auth/LoginScreen";
// import HomeScreen from "./Screens/mainScreen/HomeScreen";
// const AuthStack = createNativeStackNavigator();

// export const useRoute = () => {
//   const [auth, setAuth] = useState(false);
//   const onSubmit = () => {
//     setAuth(true);
//   };
//   if (!auth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//           onSubmit={onSubmit}
//         />
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Registration"
//           component={RegistrationScreen}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return <HomeScreen />;
// };
