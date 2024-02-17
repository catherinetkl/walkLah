import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { AuthContextProvider, useAuth } from "./App/Context/AuthContext";
import { UserLocationContext } from "./App/Context/UserLocationContext";
import TabNavigation from "./App/Navigations/TabNavigation";
import AuthScreen from "./App/Screens/Auth";
import ExerciseDetailsScreen from "./App/Screens/ExerciseDetailsScreen";
import Home from "./App/Screens/Home";
import CustomButton from "./App/Shared/Button";
import Colors from "./App/Shared/Colors";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  const { username } = useAuth();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    raleway: require("./assets/Fonts/Raleway-Regular.ttf"),
    "raleway-bold": require("./assets/Fonts/Raleway-SemiBold.ttf"),
  });
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    // Load the audio file
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/Sound/soundtrack.mp3")
      );
      setSound(sound);
    };
    loadSound();

    return () => {
      // Unload the audio file when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleTogglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Play the audio when navigating to the Home and Workout screens
    if (sound && username) {
      sound.playAsync();
      setIsPlaying(true);
    }
  }, [username, sound]);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <NavigationContainer>
            <Stack.Navigator>
              {username ? (
                <>
                  <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: "Exercises" }}
                  />
                  <Stack.Screen
                    name="ExerciseDetailsScreen"
                    component={ExerciseDetailsScreen}
                    options={{ headerShown: false }}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="AuthScreen"
                  component={AuthScreen}
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
          {sound && (
            <CustomButton
              title={isPlaying ? "Pause Music" : "Play Music"}
              onPress={handleTogglePlayback}
              color={Colors.MAIN}
            />
          )}
        </UserLocationContext.Provider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
