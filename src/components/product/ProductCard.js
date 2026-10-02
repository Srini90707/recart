import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductCard.styles';
import Colors from '../../constants/Colors';

export default function ProductCard({ product, onPress, onFavoritePress }) {
  const [imageError, setImageError] = React.useState(false);

  if (!product) return null;

  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80';

  const isVerified = product.verified || product.seller?.verified;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageError ? fallbackImage : (product.image || fallbackImage) }} 
          style={styles.image} 
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteBtn} 
          onPress={onFavoritePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={product.isFavorite ? 'heart' : 'heart-outline'} 
            size={18} 
            color={product.isFavorite ? '#EF4444' : '#64748B'} 
          />
        </TouchableOpacity>
        {isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#FFFFFF" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          {product.condition ? (
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{product.condition}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={11} color={Colors.textSecondary} />
            <Text style={styles.location} numberOfLines={1}> {product.location}</Text>
          </View>
          {product.postedTime && (
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={11} color={Colors.textSecondary} />
              <Text style={styles.postedTime}> {product.postedTime}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
