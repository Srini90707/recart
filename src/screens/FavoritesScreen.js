import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import ProductCard from '../components/product/ProductCard';
import EmptyState from '../components/common/EmptyState';
import { FavoritesContext } from '../context/FavoritesContext';
import Spacing from '../constants/Spacing';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { id: product.id });
  };

  return (
    <ScreenContainer noPadding>
      <AppHeader title="Saved Items" />
      
      {favorites.length === 0 ? (
        <EmptyState 
          title="No favorites yet" 
          description="Items you save will appear here." 
          icon="❤️"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard
              product={{ ...item, isFavorite: true }}
              onPress={() => handleProductPress(item)}
              onFavoritePress={() => toggleFavorite(item)}
            />
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
  },
});
