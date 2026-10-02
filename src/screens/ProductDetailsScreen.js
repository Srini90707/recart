import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import ProductCard from '../components/product/ProductCard';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

export default function ProductDetailsScreen({ route }) {
  const navigation = useNavigation();

  const { id } = route.params || {};
  const { listings = [] } = useContext(ListingsContext) || {};
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext) || {
    isFavorite: () => false,
    toggleFavorite: () => {},
  };

  const [imageError, setImageError] = useState(false);

  const product = listings.find(p => p.id === id);

  if (!product) {
    return (
      <ScreenContainer>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.floatingBtn}>
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundCenter}>
          <Ionicons name="alert-circle-outline" size={56} color="#94A3B8" />
          <Text style={styles.notFoundTitle}>Listing Not Found</Text>
          <Text style={styles.notFoundSubtitle}>This item may have been removed or sold.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBtn}>
            <Text style={styles.goBackBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const isFav = Boolean(isFavorite(product.id));
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  // Similar items
  const similarProducts = listings
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.title} for ₹${product.price?.toLocaleString('en-IN')} on ReCart!`,
      });
    } catch (_e) {}
  };

  const handleMakeOffer = () => {
    Alert.alert(
      'Make an Offer',
      `Offer your best price for "${product.title}". The seller will be notified instantly.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit ₹' + Math.round(product.price * 0.9).toLocaleString('en-IN'), onPress: () => Alert.alert('Offer Sent!', 'The seller will review your offer shortly.') },
      ]
    );
  };

  const handleChat = () => {
    Alert.alert('Chat with Seller', `Connecting you with ${product.seller?.name || 'the seller'}...`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Floating Header Buttons */}
      <View style={styles.floatingHeader}>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={handleShare}
            activeOpacity={0.8}
            accessibilityLabel="Share listing"
          >
            <Ionicons name="share-social-outline" size={19} color="#0F172A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => toggleFavorite && toggleFavorite(product)}
            activeOpacity={0.8}
            accessibilityLabel="Favorite listing"
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={20}
              color={isFav ? '#EF4444' : '#0F172A'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 1. HERO PRODUCT IMAGE */}
        <View style={styles.heroImageWrapper}>
          <Image
            source={{ uri: imageError ? fallbackImage : (product.image || fallbackImage) }}
            style={styles.heroImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
          <View style={styles.imageBadgeRow}>
            {product.verified && (
              <View style={styles.verifiedPill}>
                <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" />
                <Text style={styles.verifiedPillText}>Verified by ReCart</Text>
              </View>
            )}
            {product.type === 'rent' && (
              <View style={styles.rentalPill}>
                <Ionicons name="repeat" size={12} color="#FFFFFF" />
                <Text style={styles.rentalPillText}>Rental Available</Text>
              </View>
            )}
          </View>
        </View>

        {/* 2. MAIN DETAILS */}
        <View style={styles.detailsBody}>
          {/* Price & Condition */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>
                ₹{product.price?.toLocaleString('en-IN')}
                {product.rentalPeriod ? (
                  <Text style={styles.rentalPeriodText}> {product.rentalPeriod}</Text>
                ) : null}
              </Text>
              <Text style={styles.priceNote}>Inclusive of all fees</Text>
            </View>

            {product.condition ? (
              <View style={styles.conditionTag}>
                <Ionicons name="shield-checkmark-outline" size={13} color={Colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.conditionText}>{product.condition}</Text>
              </View>
            ) : null}
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Quick Specs 4-Box Grid */}
          <View style={styles.specsGrid}>
            <View style={styles.specBox}>
              <Ionicons name="pricetag-outline" size={16} color={Colors.primary} />
              <Text style={styles.specLabel}>Category</Text>
              <Text style={styles.specValue} numberOfLines={1}>{product.category || 'General'}</Text>
            </View>

            <View style={styles.specBox}>
              <Ionicons name="location-outline" size={16} color={Colors.primary} />
              <Text style={styles.specLabel}>Location</Text>
              <Text style={styles.specValue} numberOfLines={1}>{product.location || 'Bengaluru'}</Text>
            </View>

            <View style={styles.specBox}>
              <Ionicons name="time-outline" size={16} color={Colors.primary} />
              <Text style={styles.specLabel}>Posted</Text>
              <Text style={styles.specValue} numberOfLines={1}>{product.postedTime || 'Recently'}</Text>
            </View>

            <View style={styles.specBox}>
              <Ionicons name="shield-outline" size={16} color={Colors.primary} />
              <Text style={styles.specLabel}>Safety</Text>
              <Text style={styles.specValue} numberOfLines={1}>Assured</Text>
            </View>
          </View>

          {/* Buyer Protection Trust Banner */}
          <View style={styles.trustBanner}>
            <View style={styles.trustIconCircle}>
              <Ionicons name="shield-checkmark" size={20} color="#FF6B1A" />
            </View>
            <View style={styles.trustTextCol}>
              <Text style={styles.trustTitle}>ReCart Buyer Protection Guarantee</Text>
              <Text style={styles.trustSubtitle}>
                {"Inspect item at doorstep. 100% money back if item doesn't match description."}
              </Text>

            </View>
          </View>

          {/* Description Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description ||
                `Pre-inspected ${product.title} in ${product.condition || 'great'} condition. Complete accessories with verified authenticity. Safe doorstep handover and payment available.`}
            </Text>
          </View>

          {/* Seller Card */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Seller Information</Text>
            <View style={styles.sellerCard}>
              <View style={styles.sellerAvatarWrap}>
                <View style={styles.sellerAvatar}>
                  <Text style={styles.sellerAvatarText}>
                    {(product.seller?.name || 'S').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.sellerVerifiedDot}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{product.seller?.name || 'Verified ReCart Member'}</Text>
                <View style={styles.sellerMetaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={11} color="#EAB308" />
                    <Text style={styles.ratingText}>{product.seller?.rating || '4.9'}</Text>
                  </View>
                  <Text style={styles.sellerMetaText}>• Verified Seller</Text>
                  <Text style={styles.sellerMetaText}>• Quick reply</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Similar Items Carousel */}
          {similarProducts.length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Similar Items You May Like</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarList}>
                {similarProducts.map(item => (
                  <View key={item.id} style={styles.similarCardWrapper}>
                    <ProductCard
                      product={{ ...item, isFavorite: Boolean(isFavorite(item.id)) }}
                      onPress={() => navigation.push('ProductDetails', { id: item.id })}
                      onFavoritePress={() => toggleFavorite(item)}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 3. STICKY BOTTOM ACTION BAR */}
      <View style={styles.stickyFooter}>
        <View style={styles.footerPriceCol}>
          <Text style={styles.footerPriceLabel}>Price</Text>
          <Text style={styles.footerPrice}>
            ₹{product.price?.toLocaleString('en-IN')}
          </Text>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.chatBtn}
            onPress={handleChat}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#0F172A" style={{ marginRight: 6 }} />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.offerBtn}
            onPress={handleMakeOffer}
            activeOpacity={0.85}
          >
            <Ionicons name="bag-check-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.offerBtnText}>Make Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  floatingHeader: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  floatingBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroImageWrapper: {
    width: '100%',
    height: 340,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageBadgeRow: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.94)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  verifiedPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  rentalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 26, 0.94)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  rentalPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  detailsBody: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: Spacing.lg,
    paddingTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  rentalPeriodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  priceNote: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  conditionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 26,
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  specBox: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 4,
  },
  specValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    borderWidth: 1,
    borderColor: '#FFE3D3',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 12,
  },
  trustIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustTextCol: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  trustSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sellerAvatarWrap: {
    position: 'relative',
    marginRight: 12,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sellerVerifiedDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  sellerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  sellerMetaText: {
    fontSize: 11,
    color: '#64748B',
  },
  similarList: {
    paddingRight: 10,
  },
  similarCardWrapper: {
    width: 172,
    marginRight: 12,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
  footerPriceCol: {
    marginRight: 12,
  },
  footerPriceLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  footerActions: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chatBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  offerBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  offerBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  errorHeader: {
    padding: 16,
  },
  notFoundCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
  },
  notFoundSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  goBackBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  goBackBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
