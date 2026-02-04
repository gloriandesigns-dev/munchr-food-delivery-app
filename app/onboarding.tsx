import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function OnboardingPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Carousel Placeholder</Text>
      <Text style={styles.subText}>This section will be implemented next.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 24,
    color: Colors.black,
    marginBottom: 10,
  },
  subText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: '#666',
  }
});
