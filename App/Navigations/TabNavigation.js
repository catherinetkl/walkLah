import "react-native-gesture-handler";
//import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../Screens/Home";
import DeviceMotionScreen from "../Screens/DeviceMotion";
import Profile from "../Screens/Profile";
import SleepTracker from "../Screens/SleepTracker";
import GymNavigation from "./GymNavigation";
import FoodTracker from "../Screens/FoodTracker.js";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Explore") {
              iconName = focused ? "compass" : "compass-outline";
            } else if (route.name === "SleepTracker") {
              iconName = focused ? "fitness" : "fitness-outline";
            } else if (route.name === "DeviceMotion") {
              iconName = focused ? "speedometer" : "speedometer-outline";
            } else if (route.name === "FoodTracker") {
                iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarBadge: 7, headerShown: false }}
        />
        <Tab.Screen
          name="Explore"
          component={GymNavigation}
          options={{ tabBarBadge: 7, headerShown: false }}
        />
        <Tab.Screen
          name="SleepTracker"
          component={SleepTracker}
          options={{ tabBarBadge: 7, headerShown: false }}
        />
        <Tab.Screen
          name="DeviceMotion"
          component={DeviceMotionScreen}
          options={{ tabBarBadge: 7, headerShown: false }}
        />
        <Tab.Screen
          name="FoodTracker"
          component={FoodTracker}
          options={{ tabBarBadge: 7, headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ tabBarBadge: 3, headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
