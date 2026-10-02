import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function NoInternetScreen({
  visible = true,
  onRetry,
  isChecking = false,
}) {
  const insets = useSafeAreaInsets();
  const [retryNotice, setRetryNotice] = useState('');
  const [pulseAnim] = useState(() => new Animated.Value(1));

  const handlePressRetry = async () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.94,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();

    setRetryNotice('');
    if (onRetry) {
      const isOnline = await onRetry();
      if (!isOnline) {
        setRetryNotice('Still offline. Please enable mobile data or Wi-Fi.');
        setTimeout(() => setRetryNotice(''), 3500);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={() => {}}
    >
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#FFFDF9', '#FFF5EC', '#FEDEC7']}
        locations={[0, 0.48, 1]}
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 24,
          },
        ]}
      >
        <View style={styles.centerContent}>
          {/* Concentric Glow Badges */}
          <View style={styles.badgeWrapper}>
            {/* Outer soft halo */}
            <View style={styles.outerHalo} />

            {/* Middle halo ring */}
            <View style={styles.middleHalo} />

            {/* Inner vibrant gradient badge */}
            <LinearGradient
              colors={['#FF9838', '#FF6817', '#EE4B04']}
              start={{ x: 0.2, y: 0.1 }}
              end={{ x: 0.8, y: 0.9 }}
              style={styles.innerBadge}
            >
              <Ionicons name="cloud-offline" size={72} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* Heading */}
          <Text style={styles.title}>No Internet Connection</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Please turn on your mobile data or Wi-Fi{'\n'}and try again.
          </Text>

          {/* Retry Alert Notice */}
          {!!retryNotice && (
            <View style={styles.noticeContainer}>
              <Ionicons
                name="alert-circle"
                size={16}
                color="#EA580C"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.noticeText}>{retryNotice}</Text>
            </View>
          )}

          {/* Try Again Button */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handlePressRetry}
              disabled={isChecking}
              style={styles.buttonShadow}
            >
              <LinearGradient
                colors={['#FF7B25', '#FF5510']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                {isChecking ? (
                  <View style={styles.buttonContent}>
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.buttonText}>Checking...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Try Again</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  badgeWrapper: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  outerHalo: {
    position: 'absolute',
    width: 246,
    height: 246,
    borderRadius: 123,
    backgroundColor: 'rgba(255, 122, 42, 0.08)',
  },
  middleHalo: {
    position: 'absolute',
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: 'rgba(255, 122, 42, 0.17)',
  },
  innerBadge: {
    width: 148,
    height: 148,
    borderRadius: 74,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6417',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.42,
    shadowRadius: 18,
    elevation: 12,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15.5,
    lineHeight: 23,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 36,
    paddingHorizontal: 12,
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9A3412',
  },
  buttonShadow: {
    borderRadius: 28,
    shadowColor: '#FF5E14',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 48,
    borderRadius: 28,
    minWidth: Math.min(width * 0.58, 220),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
