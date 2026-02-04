import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import { useFonts, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { View } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ animation: 'fade' }} />
        <Stack.Screen name="verify-otp" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="enter-details" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'slide_from_right' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
