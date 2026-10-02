import React, { useState, useContext } from 'react';
import { View, FlatList, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import SearchBar from '../components/search/SearchBar';
import ProductCard from '../components/product/ProductCard';
import { MOCK_BASE_CATEGORIES, MOCK_EXPANDED_CATEGORIES } from '../data/mockData';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Colors from '../constants/Colors';
import { styles } from '../styles/HomeScreen.styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  
  const { listings } = useContext(ListingsContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const activeListings = listings.filter(l => l.status !== 'inactive' && l.status !== 'sold');

  // Filter listings based on selectedCategory and searchQuery
  const filteredListings = activeListings.filter(item => {
    const matchesCategory = selectedCategory 
      ? item.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = searchQuery.trim() 
      ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Featured listings
  const featuredListings = (selectedCategory ? filteredListings : activeListings).slice(0, 4);
  const nearbyListings = filteredListings;

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { id: product.id });
  };

  // Categories displayed: 6 items (2 rows) when collapsed, 9 items (3 rows) when expanded
  const displayedCategories = isExpanded
    ? [
        ...MOCK_BASE_CATEGORIES,
        ...MOCK_EXPANDED_CATEGORIES,
        {
          id: 'less',
          name: 'Less',
          isAction: 'less',
          icon: 'chevron-up',
          color: '#FFF7ED',
          borderColor: '#FFEDD5',
        },
      ]
    : [
        ...MOCK_BASE_CATEGORIES,
        {
          id: 'more',
          name: 'More',
          isAction: 'more',
          icon: 'chevron-down',
          image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
          color: '#FFF7ED',
          borderColor: '#FFEDD5',
        },
      ];

  const handleCategoryPress = (cat) => {
    if (cat.isAction === 'more') {
      setIsExpanded(true);
    } else if (cat.isAction === 'less') {
      setIsExpanded(false);
    } else {
      navigation.navigate('Category', {
        categoryId: cat.id,
        categoryName: cat.name,
      });
    }
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

      {/* Categories Grid (Inline Expandable) */}
      <View style={styles.categoriesGrid}>
        {displayedCategories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const fallbackUri = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80';
          const imageUri = failedImages[cat.id] ? fallbackUri : cat.image;

          return (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryItem} 
              onPress={() => handleCategoryPress(cat)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.categoryImageContainer, 
                { 
                  backgroundColor: cat.color || '#FFF7F2',
                  borderColor: isSelected ? Colors.primary : (cat.borderColor || '#FFE3D3'),
                  borderWidth: isSelected ? 2.5 : 1.5,
                }
              ]}>
                {cat.isAction === 'less' ? (
                  <View style={styles.lessIconWrapper}>
                    <Ionicons name="chevron-up" size={28} color={Colors.primary} />
                  </View>
                ) : (
                  <Image 
                    source={{ uri: imageUri }} 
                    style={styles.categoryImage} 
                    resizeMode="cover"
                    onError={() => setFailedImages(prev => ({ ...prev, [cat.id]: true }))}
                  />
                )}
                <View style={[styles.categoryBadge, isSelected && styles.categoryBadgeActive]}>
                  <Ionicons name={cat.icon} size={11} color="#FFFFFF" />
                </View>
              </View>
              <Text 
                style={[styles.categoryText, isSelected && styles.categoryTextActive]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedCategory && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.activeFilterText}>
            Showing: <Text style={{ fontWeight: '700', color: Colors.primary }}>{selectedCategory}</Text> ({filteredListings.length} items)
          </Text>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.clearFilterBtn}>
            <Text style={styles.clearFilterText}>Show All</Text>
            <Ionicons name="close-circle" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      )}

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
        <Text style={styles.sectionTitle}>
          {selectedCategory ? `${selectedCategory} Items` : 'Nearby Items'}
        </Text>
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="basket-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No items found in {selectedCategory || 'this search'}</Text>
            <Text style={styles.emptySubtitle}>Try choosing another category or clearing filters</Text>
          </View>
        }
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
