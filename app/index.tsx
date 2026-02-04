import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    // Animation
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 800 });

    // Navigation
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Center Content */}
      <Animated.View style={[styles.centerContent, animatedStyle]}>
        <Text style={styles.logoText}>munchr</Text>
        <Text style={styles.subText}>Carbon-smart food delivery across the U.S.</Text>
      </Animated.View>

      {/* Bottom Illustration */}
      <View style={styles.bottomContainer}>
        {/* Using a placeholder that resembles a 3D earth/plant concept */}
        <Image
          source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/eco-earth-5496664-4589998.png' }}
          style={styles.illustration}
          contentFit="contain"
        />
        {/* Decorative elements to match the "forest" silhouette at bottom of reference */}
        <Image 
            source={{ uri: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f333.png' }}
            style={[styles.tree, { left: -20, opacity: 0.2 }]}
        />
        <Image 
            source={{ uri: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f333.png' }}
            style={[styles.tree, { right: -20, opacity: 0.2 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    zIndex: 10,
    marginTop: -100, // Visual offset to match reference
  },
  logoText: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 56,
    color: Colors.white,
    letterSpacing: -1,
    marginBottom: 10,
  },
  subText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  illustration: {
    width: 200,
    height: 200,
    zIndex: 5,
  },
  tree: {
    position: 'absolute',
    bottom: 0,
    width: 200,
    height: 200,
    tintColor: '#A00000', // Darker red for silhouette effect
  }
});
