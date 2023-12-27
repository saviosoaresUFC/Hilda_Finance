import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import {Inter_900Black, Inter_500Medium, Inter_600SemiBold} from '@expo-google-fonts/inter';

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Semibold': Poppins_600SemiBold,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-Light': Poppins_300Light,
    'Inter-Black': Inter_900Black,
    'Inter-Medium': Inter_500Medium,
    'Inter-Semibold': Inter_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
}

export default useLoadFonts;