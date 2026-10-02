import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import ScreenContainer from '../components/common/ScreenContainer';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    tag: 'EXPLORE & SAVE',
    icon: 'sparkles-outline',
    title: 'Discover Great Deals',
    description: 'Find verified, high-quality pre-loved products at unbeatable prices right in your local community.',
    image: require('../../assets/images/onboarding-deals.jpg'),
  },
  {
    tag: 'FAST & SIMPLE',
    icon: 'flash-outline',
    title: 'Sell in Minutes',
    description: 'Snap photos, set your price, and reach thousands of interested buyers in your neighborhood effortlessly.',
    image: require('../../assets/images/onboarding-sell.jpg'),
  },
  {
    tag: 'VERIFIED & SAFE',
    icon: 'shield-checkmark-outline',
    title: 'Connect with Sellers',
    description: 'Save favorite listings, negotiate directly, and chat safely with verified members in real time.',
    image: require('../../assets/images/onboarding-connect.jpg'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useContext(AuthContext);

  const [fadeAnim] = useState(() => new Animated.Value(1));
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const animateTransition = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= SLIDES.length) return;
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
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

  const currentSlide = SLIDES[currentIndex];

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          {currentIndex > 0 ? (
            <TouchableOpacity
              onPress={() => animateTransition(currentIndex - 1)}
              style={styles.backBtn}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={19} color="#0F172A" />
            </TouchableOpacity>
          ) : (
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>
                Re<Text style={{ color: Colors.primary }}>Cart</Text>
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSkip}
            style={styles.skipBtn}
            activeOpacity={0.7}
            accessibilityLabel="Skip onboarding"
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Slide Content with Fluid Transition */}
        <Animated.View
          style={[
            styles.slideContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* 4:3 Image Card with Floating Category Badge */}
          <View style={styles.imageCard}>
            <Image
              source={currentSlide.image}
              style={styles.illustration}
              resizeMode="cover"
            />
            {/* Soft Ambient Overlay Badge */}
            <View style={styles.floatingBadge}>
              <Ionicons
                name={currentSlide.icon}
                size={13}
                color={Colors.primary}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.floatingBadgeText}>{currentSlide.tag}</Text>
            </View>
          </View>

          {/* Typography Section */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.description}>{currentSlide.description}</Text>
          </View>
        </Animated.View>

        {/* Footer with Animated Indicator & Primary CTA */}
        <View style={styles.footer}>
          {/* Progress Dots */}
          <View style={styles.dotsContainer}>
            {SLIDES.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => animateTransition(index)}
                  hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
                >
                  <View
                    style={[
                      styles.dot,
                      isActive && styles.activeDot,
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaBtnText}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <Ionicons
              name={currentIndex === SLIDES.length - 1 ? 'sparkles' : 'arrow-forward'}
              size={17}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 16,
    paddingBottom: 10,
    minHeight: 56,
  },
  brandBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#FFF7F2',
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  brandBadgeText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skipBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skipText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageCard: {
    width: width * 0.9,
    aspectRatio: 4 / 3,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  floatingBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  floatingBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.6,
  },
  textContainer: {
    marginTop: 26,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.6,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
    borderRadius: 6,
  },
  ctaBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});
