import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurats from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurants"
        component={TopRestaurats}
        options={{ title: "Top Restaurantes" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
