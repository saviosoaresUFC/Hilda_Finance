import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import useLoadFonts from './src/hooks/useLoadFonts';
import Blocked from './src/screens/Blocked';
import { StackedBarChart } from 'react-native-svg-charts'

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const { fontsLoaded, onLayoutRootView } = useLoadFonts();
  if (!fontsLoaded)
    return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Tab'
          component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}>
        </Stack.Screen>
        <Stack.Screen
          name='Blocked'
          component={Blocked}
          options={{ animation: 'slide_from_bottom', header: () => <HeaderBar navigation={navigation} />  }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}