// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./SplashScreen";
import HomePage from "./HomePage";
import SignIn from "./SignIn";
import ManageBooking from "./BookingForm";
import Signup from "./Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignOut from "./SignOut";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer(props) {
  console.log(props.data);
  const user = props.data
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Manage Booking" component={ManageBooking} />
      { user !== null ? <></> : <Drawer.Screen name="Sign In" component={SignIn} />}
    </Drawer.Navigator>
  );
}

const MyStack = (data) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        options={{ headerShown: false }}
        component={SplashScreen}
      />
      <Stack.Screen name="HomePage" options={{ headerShown: false }}>
        {(props) => <MyDrawer {...data} />}
      </Stack.Screen>
      <Stack.Screen name="Manage Booking" component={ManageBooking} />
      <Stack.Screen name="Sign Up" component={Signup} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const user = JSON.parse(jsonValue);
        setCurrentUser(user);
      } catch (e) {
        // error reading value
      }
    };

    getUser();

    const timeout = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      <MyStack data={user} />
    </NavigationContainer>
  );
}
