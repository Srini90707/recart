import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/search/SearchBar';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Spacing from '../constants/Spacing';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { listings } = useContext(ListingsContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const activeListings = listings.filter(l => l.status !== 'inactive' && l.status !== 'sold');

  const filteredProducts = activeListings.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { id: product.id });
  };

  return (
    <ScreenContainer noPadding>
      <AppHeader title="Browse" />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products, categories..."
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            product={{ ...item, isFavorite: isFavorite(item.id) }}
            onPress={() => handleProductPress(item)}
            onFavoritePress={() => toggleFavorite(item)}
          />
        )}
      />
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
