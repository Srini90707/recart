import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import ScreenContainer from '../components/common/ScreenContainer';
import AppButton from '../components/common/AppButton';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import Shadows from '../constants/Shadows';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Discover Great Deals',
    description: 'Find quality pre-loved products near you.',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Sell in Minutes',
    description: 'Upload photos, add details and publish your listing.',
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Connect with Sellers',
    description: 'Save products and chat directly with sellers.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useContext(AuthContext);
  
  const [fadeAnim] = useState(() => new Animated.Value(1));
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const animateTransition = (nextIndex) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleNext = async () => {
    if (currentIndex < SLIDES.length - 1) {
      animateTransition(currentIndex + 1);
    } else {
      await completeOnboarding();
      navigation.replace('Auth');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Auth');
  };

  return (
    <ScreenContainer noPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.slideContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: SLIDES[currentIndex].image }} 
              style={styles.illustration} 
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{SLIDES[currentIndex].title}</Text>
            <Text style={styles.description}>{SLIDES[currentIndex].description}</Text>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            {SLIDES.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>

          <AppButton 
            title={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"} 
            onPress={handleNext} 
            style={styles.btn} 
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  skipText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 30,
    marginBottom: Spacing.xxl,
    overflow: 'hidden',
    ...Shadows.large,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  btn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    ...Shadows.medium,
  }
});
