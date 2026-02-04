import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, ViewToken } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Order From Anywhere',
    description: 'Order food from home, work, or wherever you are.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-ordering-food-online-2937663-2426363.png', 
    bgShape: true,
  },
  {
    id: '2',
    title: 'Pay Online',
    description: 'Pay securely online with no cash hassles.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/online-payment-4721286-3926138.png',
    bgShape: true,
  },
  {
    id: '3',
    title: 'Skip the Line',
    description: 'We’ll notify you when your order is ready.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/delivery-man-giving-parcel-to-customer-5355106-4481691.png',
    bgShape: true,
  },
];

// Create an animated FlatList component
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSkip = () => {
    router.replace('/home');
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/home');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  // Optimized scroll handler for animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Efficiently update current index only when item changes
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Ensure scrollToIndex works reliably
  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
             <View style={styles.blobBackground} />
             <Image 
                source={{ uri: item.image }}
                style={styles.image}
                contentFit="contain"
             />
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {SLIDES.map((_, i) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            
            const dotWidth = interpolate(
              scrollX.value,
              inputRange,
              [8, 24, 8],
              Extrapolation.CLAMP
            );

            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0.3, 1, 0.3],
              Extrapolation.CLAMP
            );

            return {
              width: dotWidth,
              opacity,
              backgroundColor: i === currentIndex ? Colors.primary : '#D3D3D3',
            };
          });

          return (
            <Animated.View 
              key={i.toString()} 
              style={[styles.dot, animatedDotStyle]} 
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <AnimatedFlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        style={styles.flatList}
      />

      {/* Bottom Section: Paginator & Navigation Arrows */}
      <View style={styles.bottomContainer}>
        {/* Paginator on the left/center */}
        <Paginator />

        {/* Navigation Arrows on the right */}
        <View style={styles.navigationContainer}>
            {/* Back Arrow - Hidden on first slide */}
            <TouchableOpacity 
                onPress={handleBack} 
                style={[styles.navButton, { opacity: currentIndex === 0 ? 0 : 1 }]}
                disabled={currentIndex === 0}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <Ionicons name="arrow-back" size={24} color="#9C9C9C" />
            </TouchableOpacity>

            {/* Next Arrow */}
            <TouchableOpacity 
                onPress={handleNext} 
                style={[styles.navButton, styles.nextButton]}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <Ionicons 
                    name="arrow-forward" 
                    size={24} 
                    color={Colors.white} 
                />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 10,
  },
  skipText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: '#9C9C9C',
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    position: 'relative',
  },
  blobBackground: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#F5F7FA',
    zIndex: -1,
    transform: [{ scaleX: 1.2 }],
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 24,
    color: '#1C1C1C',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
  bottomContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  paginatorContainer: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  nextButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  }
});
