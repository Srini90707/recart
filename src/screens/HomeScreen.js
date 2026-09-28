import React, { useState, useContext } from 'react';
import { View, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import SearchBar from '../components/search/SearchBar';
import ProductCard from '../components/product/ProductCard';
import { MOCK_CATEGORIES } from '../data/mockData';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Colors from '../constants/Colors';
import { styles } from '../styles/HomeScreen.styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('buy');
  
  const { listings } = useContext(ListingsContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const activeListings = listings.filter(l => l.status !== 'inactive' && l.status !== 'sold');

  // Featured listings (first 3)
  const featuredListings = activeListings.slice(0, 3);
  // Nearby items
  const nearbyListings = activeListings;

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { id: product.id });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <View style={styles.brandContainer}>
            <Ionicons name="cart" size={24} color={Colors.primary} />
            <Text style={styles.logoText}>ReCart</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={12} color={Colors.primary} />
            <Text style={styles.locationText}>Bengaluru, Karnataka</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'buy' && styles.toggleButtonActive]}
          onPress={() => setActiveTab('buy')}
        >
          <Text style={[styles.toggleText, activeTab === 'buy' && styles.toggleTextActive]}>Buy & Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'rent' && styles.toggleButtonActive]}
          onPress={() => setActiveTab('rent')}
        >
          <Text style={[styles.toggleText, activeTab === 'rent' && styles.toggleTextActive]}>Rent</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesGrid}>
        {MOCK_CATEGORIES.map((cat, index) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => {}}>
            <View style={styles.categoryIconContainer}>
              <Ionicons name={cat.icon} size={24} color={Colors.primary} />
            </View>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.categoryIconContainer}>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.categoryText}>More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.promoBanner}>
        <View>
          <Text style={styles.promoTitle}>Better Choices</Text>
          <Text style={styles.promoTitle}>Pre-Owned</Text>
          <Text style={styles.promoSubtitle}>Quality products. Great prices.</Text>
        </View>
        <Ionicons name="phone-portrait-outline" size={48} color={Colors.primary} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Listings</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {featuredListings.map(item => (
            <View key={item.id} style={styles.horizontalItem}>
              <ProductCard
                product={{ ...item, isFavorite: isFavorite(item.id) }}
                onPress={() => handleProductPress(item)}
                onFavoritePress={() => toggleFavorite(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Items</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer noPadding>
      <FlatList
        data={nearbyListings}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
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
