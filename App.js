import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ModalScreen from "./screens/ModalScreen";

import HomeScreen from "./screens/HomeScreen";

import CartScreen from "./screens/CartScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import OrderListScreen from "./screens/OrderListScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Drawer Navigation (Wraps Bottom Tabs)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Orders " component={OrderListScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

// Main App Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ModalScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ModalScreen" component={ModalScreen} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
        <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
