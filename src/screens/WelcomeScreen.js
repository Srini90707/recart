import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { user, hasCompletedOnboarding } = useContext(AuthContext);
  const [loadingAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // Animate loading bar
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 2500, // 2.5 seconds loading simulation
      useNativeDriver: false,
    }).start(() => {
      if (!hasCompletedOnboarding) {
        navigation.replace('Onboarding');
      } else if (!user) {
        navigation.replace('Auth');
      } else {
        navigation.replace('Main');
      }
    });
  }, [hasCompletedOnboarding, user, navigation, loadingAnim]);

  const progressWidth = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      {/* Background Blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />
      <View style={styles.blobBottomRight} />

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Ionicons name="cart" size={80} color={Colors.primary} style={styles.cartIcon} />
          
          <View style={styles.brandNameContainer}>
            <Text style={styles.brandRe}>Re</Text>
            <Text style={styles.brandCart}>Cart</Text>
          </View>
          
          <Text style={styles.tagline}>
            Buy  <Text style={styles.dot}>•</Text>  Sell  <Text style={styles.dot}>•</Text>  Reuse
          </Text>
          
          <Text style={styles.subTagline}>
            Give pre-loved products{'\n'}a new home
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/images/splash-illustration.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Loading Section */}
        <View style={styles.loadingContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F2',
    overflow: 'hidden',
  },
  blobTopLeft: {
    position: 'absolute',
    top: -50,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FFE3D3',
    opacity: 0.7,
  },
  blobTopRight: {
    position: 'absolute',
    top: 100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFE3D3',
    opacity: 0.6,
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#FFBE98',
    opacity: 0.5,
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: -150,
    right: -50,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.primary,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height * 0.12,
    paddingBottom: height * 0.08,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  cartIcon: {
    marginBottom: 5,
  },
  brandNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandRe: {
    fontSize: 52,
    fontWeight: '900',
    color: '#1A2B4C',
    letterSpacing: -1,
  },
  brandCart: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A2B4C',
    letterSpacing: 1,
    marginBottom: 24,
  },
  dot: {
    color: Colors.primary,
  },
  subTagline: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  illustrationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  illustration: {
    width: width * 1.1,
    height: width * 1.1,
    marginLeft: -20, // adjust slightly to match the off-center feeling in image
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  progressBarBackground: {
    width: 200,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  }
});
