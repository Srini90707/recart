import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import ProductCard from '../components/product/ProductCard';
import { AuthContext } from '../context/AuthContext';
import { ListingsContext } from '../context/ListingsContext';
import { resetRoot } from '../navigation/navigationRef';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const { listings = [] } = useContext(ListingsContext) || {};

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your ReCart account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            resetRoot('Auth');
          },
        },
      ]
    );
  };

  // Compute active user listings
  const myActiveListings = useMemo(() => {
    if (!user) return [];
    return listings.filter(
      (item) => item.seller?.id === user.id || item.seller?.name === user.name
    );
  }, [listings, user]);

  const activeAdsCount = myActiveListings.length || user?.listingsCount || 3;

  if (!user) return null;

  return (
    <ScreenContainer noPadding>
      <AppHeader
        title="My Profile"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          {/* Avatar with Edit Badge */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri:
                  user.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
              }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.avatarBadge}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditProfile')}
              accessibilityLabel="Edit profile picture"
            >
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* User Name & Verified Badge (Clean - no email or location below) */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name || 'Demo User'}</Text>
            <Ionicons
              name="checkmark-circle"
              size={17}
              color={Colors.primary}
              style={{ marginLeft: 5 }}
            />
          </View>

          {/* Compact Stats Card ("Active Ads") */}
          <View style={styles.statsCard}>
            <View style={styles.statCol}>
              <Text style={styles.statValue}>{activeAdsCount}</Text>
              <Text style={styles.statLabel}>Active Ads</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color="#F59E0B" style={{ marginRight: 2 }} />
                <Text style={styles.statValue}>{user.rating || 4.9}</Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Sold</Text>
            </View>
          </View>
        </View>

        {/* Section: My Active Listings Carousel (Compact Cards) */}
        {myActiveListings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>MY ACTIVE ADS</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateListing')}
                activeOpacity={0.7}
              >
                <Text style={styles.postNewLink}>+ Post New</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {myActiveListings.map((item) => (
                <View key={item.id} style={styles.horizontalItem}>
                  <ProductCard
                    product={item}
                    onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Section 1: My Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>MY ACTIVITY</Text>

          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Favorites')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#FFF7F2' }]}>
                <Ionicons name="heart-outline" size={18} color={Colors.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Saved & Favorites</Text>
                <Text style={styles.menuSubtitle}>Bookmarked products & deals</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Search')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="pricetags-outline" size={18} color="#4F46E5" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Browse Categories</Text>
                <Text style={styles.menuSubtitle}>Explore products & deals</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Chat & Inquiries', 'You have no pending inquiries.')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="chatbubbles-outline" size={18} color="#059669" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Chat & Inquiries</Text>
                <Text style={styles.menuSubtitle}>Buyer and seller conversations</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ACCOUNT & SETTINGS</Text>

          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#FAF5FF' }]}>
                <Ionicons name="person-outline" size={18} color="#9333EA" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Edit Profile</Text>
                <Text style={styles.menuSubtitle}>Name, phone, location & details</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Safety & Verification', 'Your account is verified with phone & email.')}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="shield-checkmark-outline" size={18} color="#0284C7" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Safety & Verification</Text>
                <Text style={styles.menuSubtitle}>Account trust & verification badge</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  'Help & Support',
                  'For inquiries or support, reach out to help@recart.com.'
                )
              }
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#FFFBEB' }]}>
                <Ionicons name="help-buoy-outline" size={18} color="#D97706" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Help & Support</Text>
                <Text style={styles.menuSubtitle}>Safety tips, FAQ & contact</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3: Logout Action */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutCard}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <View style={styles.logoutIconBox}>
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>ReCart v1.0.0 • Verified Pre-Owned Marketplace</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 110, // Generous clearance so bottom tab bar does not hide Logout button
    backgroundColor: '#F8FAFC',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2.5,
    borderColor: '#FFE3D3',
    backgroundColor: '#E2E8F0',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    textTransform: 'capitalize',
    letterSpacing: -0.4,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7F2',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#FFE3D3',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.7,
  },
  postNewLink: {
    fontSize: 11.5,
    fontWeight: '800',
    color: Colors.primary,
  },
  horizontalList: {
    paddingRight: 6,
    paddingTop: 4,
  },
  horizontalItem: {
    width: 156,
    marginRight: 10,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 1,
  },
  menuSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 62,
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  logoutIconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 16,
    marginBottom: 8,
  },
});
