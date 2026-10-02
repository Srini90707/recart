import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import AppButton from '../common/AppButton';

export default function ListingSuccessModal({
  visible,
  listing,
  onViewListing,
  onDone,
}) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Animated Success Badge */}
          <View style={styles.badgeWrapper}>
            <View style={styles.outerGlow} />
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={38} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.title}>Listing Published!</Text>
          <Text style={styles.subtitle}>
            Your ad is now active and visible to buyers across ReCart.
          </Text>

          {/* Listing Preview Card */}
          {listing && (
            <View style={styles.previewCard}>
              {listing.image && (
                <Image source={{ uri: listing.image }} style={styles.previewImage} />
              )}
              <View style={styles.previewInfo}>
                <Text style={styles.previewTitle} numberOfLines={1}>
                  {listing.title}
                </Text>
                <Text style={styles.previewCategory}>
                  {listing.category} › {listing.subCategory}
                </Text>
                <Text style={styles.previewPrice}>
                  ₹{listing.price?.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          )}

          {/* Actions */}
          <AppButton
            title="View Listing"
            onPress={onViewListing}
            style={styles.primaryBtn}
          />

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={onDone}
            activeOpacity={0.7}
          >
            <Text style={styles.doneBtnText}>Post Another Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  badgeWrapper: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  outerGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#E2E8F0',
  },
  previewInfo: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  previewCategory: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  previewPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
  },
  primaryBtn: {
    width: '100%',
    marginBottom: 10,
  },
  doneBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  doneBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748B',
  },
});
