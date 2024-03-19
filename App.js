import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  LexendGiga_400Regular,
  LexendGiga_600SemiBold,
} from "@expo-google-fonts/lexend-giga";
import {
  Kodchasan_500Medium,
  Kodchasan_400Regular, // Corrected import
  Kodchasan_700Bold, // Corrected import
} from "@expo-google-fonts/kodchasan";

import Home from "./components/Home";
import NewPuzzle from "./components/NewPuzzle";
import Puzzle from "./components/Puzzle";
import OldPuzzles from "./components/OldPuzzles";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, error] = useFonts({
    LexendGiga_400Regular,
    LexendGiga_600SemiBold,
    Kodchasan_400Regular,
    Kodchasan_500Medium,
    Kodchasan_700Bold,
  });

  // State to handle font loading errors
  const [fontError, setFontError] = useState(null);

  useEffect(() => {
    if (error) {
      // If there's an error loading fonts, set the fontError state
      setFontError(error);
    }
  }, [error]);

  if (!fontsLoaded) {
    // If fonts are not loaded yet, return null or loading indicator
    return null; // or <LoadingIndicator />;
  }

  if (fontError) {
    // If there's an error loading fonts, handle it here
    console.error("Error loading fonts:", fontError);
    return null; // or render an error message
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewPuzzle" component={NewPuzzle} />
        <Stack.Screen name="Puzzle" component={Puzzle} />
        <Stack.Screen name="OldPuzzles" component={OldPuzzles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
