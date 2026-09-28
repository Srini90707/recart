import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductCard.styles';
import Colors from '../../constants/Colors';

export default function ProductCard({ product, onPress, onFavoritePress }) {
  if (!product) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteBtn} onPress={onFavoritePress}>
          <Ionicons 
            name={product.isFavorite ? 'heart' : 'heart-outline'} 
            size={20} 
            color={product.isFavorite ? Colors.error : Colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>{product.condition}</Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={Colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}> {product.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
