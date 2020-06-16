import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Acount/Account";
import Login from "../screens/Acount/Login";
import Register from "../screens/Acount/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Mi cuenta" }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        component={Login}
        title="Iniciar sesión"
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        component={Register}
        title="registro"
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
