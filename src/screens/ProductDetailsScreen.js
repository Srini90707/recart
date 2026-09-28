import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
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

  return (
    <ScreenContainer noPadding>
      <AppHeader 
        title="Details" 
        leftIcon={<Ionicons name="arrow-back" size={24} color={Colors.text} />} 
        onLeftPress={() => navigation.goBack()} 
        rightIcon={<Ionicons name={product.isFavorite ? 'heart' : 'heart-outline'} size={24} color={product.isFavorite ? Colors.error : Colors.text} />}
      />
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.condition}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.category}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color={Colors.textSecondary} style={styles.locationIcon} />
            <Text style={styles.location}>{product.location}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              This is a mock description for {product.title}. It's in great condition and works perfectly. Feel free to contact the seller for more details!
            </Text>
          </View>

          <View style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar} />
              <View>
                <Text style={styles.sellerName}>{product.seller.name}</Text>
                <Text style={styles.sellerRating}><Ionicons name="star" size={14} color={Colors.warning} /> {product.seller.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <AppButton title="Contact Seller" style={styles.contactBtn} />
        <AppButton title="Buy Now" variant="secondary" style={styles.contactBtn} />
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
