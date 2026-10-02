import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import AppButton from '../components/common/AppButton';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import Colors from '../constants/Colors';

export default function ProductDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { id } = route.params || {};
  const { listings } = useContext(ListingsContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  
  const product = listings.find(p => p.id === id);

  if (!product) {
    return (
      <ScreenContainer>
        <AppHeader title="Not Found" leftIcon={<Ionicons name="arrow-back" size={24} color={Colors.text} />} onLeftPress={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text>Product not found.</Text>
        </View>
      </ScreenContainer>
    );
  }

  const isFav = isFavorite ? isFavorite(product.id) : false;

  return (
    <ScreenContainer noPadding>
      <AppHeader 
        title="Details" 
        leftIcon={<Ionicons name="arrow-back" size={24} color={Colors.text} />} 
        onLeftPress={() => navigation.goBack()} 
        rightIcon={<Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? Colors.error : Colors.text} />}
        onRightPress={() => toggleFavorite && toggleFavorite(product)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' }} 
          style={styles.image} 
        />
        
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>₹{product.price ? product.price.toLocaleString('en-IN') : '0'}</Text>
          </View>
          
          <View style={styles.badges}>
            {product.condition && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.condition}</Text>
              </View>
            )}
            {product.category && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.category}</Text>
              </View>
            )}
            {product.postedTime && (
              <View style={[styles.badge, { backgroundColor: '#F1F5F9' }]}>
                <Ionicons name="time-outline" size={12} color="#64748B" style={{ marginRight: 3 }} />
                <Text style={[styles.badgeText, { color: '#64748B' }]}>{product.postedTime}</Text>
              </View>
            )}
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color={Colors.primary} style={styles.locationIcon} />
            <Text style={styles.location}>{product.location || 'Bengaluru'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || `This is a pre-verified listing for ${product.title}. It is in ${product.condition || 'excellent'} condition and ready for immediate handover or delivery. Genuine buyers only.`}
            </Text>
          </View>

          <View style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Ionicons name="person" size={24} color="#64748B" />
              </View>
              <View>
                <Text style={styles.sellerName}>{product.seller?.name || 'Verified ReCart Member'}</Text>
                <Text style={styles.sellerRating}>
                  <Ionicons name="star" size={14} color={Colors.warning} /> {product.seller?.rating || '4.8'} • Verified Seller
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <AppButton 
          title="Make Offer" 
          variant="secondary" 
          style={styles.contactBtn} 
          onPress={() => alert('Offer submitted to seller!')}
        />
        <AppButton 
          title="Chat with Seller" 
          style={styles.contactBtn} 
          onPress={() => alert('Starting chat with seller...')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.border,
  },
  content: {
    padding: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.md,
  },
  price: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  badges: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  badge: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.sm,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  locationIcon: {
    marginRight: Spacing.xs,
  },
  location: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  sellerCard: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.border,
    marginRight: Spacing.md,
  },
  sellerName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  sellerRating: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  contactBtn: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
});
