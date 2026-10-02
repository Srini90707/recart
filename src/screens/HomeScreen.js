import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, FlatList, ScrollView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import SearchBar from '../components/search/SearchBar';
import ProductCard from '../components/product/ProductCard';
import { MOCK_BASE_CATEGORIES, MOCK_EXPANDED_CATEGORIES } from '../data/mockData';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { LocationContext } from '../context/LocationContext';
import Colors from '../constants/Colors';
import { styles } from '../styles/HomeScreen.styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  
  const { listings = [] } = useContext(ListingsContext) || {};
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext) || {
    isFavorite: () => false,
    toggleFavorite: () => {},
  };
  const { currentLocation, loadingLocation, requestLocation, hasLocationPermission } = useContext(LocationContext) || {};

  // Automatically prompt for location if not yet granted
  useEffect(() => {
    if (!hasLocationPermission && requestLocation) {
      requestLocation(true);
    }
  }, [hasLocationPermission, requestLocation]);

  // Combine all categories into a single cohesive list of 8 items
  const allCategories = useMemo(() => {
    return [...MOCK_BASE_CATEGORIES, ...MOCK_EXPANDED_CATEGORIES];
  }, []);

  // Filter listings by status
  const activeListings = useMemo(() => {
    return listings.filter(l => l.status !== 'inactive' && l.status !== 'sold');
  }, [listings]);


  // Filter listings based on selectedCategory and searchQuery
  const filteredListings = useMemo(() => {
    return activeListings.filter(item => {
      const matchesCategory = selectedCategory 
        ? item.category?.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      const matchesSearch = searchQuery.trim() 
        ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [activeListings, selectedCategory, searchQuery]);

  // Featured listings (top 4)
  const featuredListings = useMemo(() => {
    const list = selectedCategory ? filteredListings : activeListings;
    const featured = list.filter(l => l.isFeatured);
    return featured.length > 0 ? featured.slice(0, 4) : list.slice(0, 4);
  }, [selectedCategory, filteredListings, activeListings]);

  const nearbyListings = filteredListings;

  const handleProductPress = (product) => {
    if (!product?.id) return;
    navigation.navigate('ProductDetails', { id: product.id });
  };

  const handleCategoryPress = (cat) => {
    // If user clicks the currently active category, toggle off
    if (selectedCategory === cat.name) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat.name);
    }
  };

  const navigateToCategoryScreen = (catName) => {
    navigation.navigate('Category', {
      categoryName: catName || selectedCategory || 'Electronics',
    });
  };

  // Location string formatter
  const locationDisplay = useMemo(() => {
    if (loadingLocation) return 'Locating...';
    if (currentLocation?.formatted) {
      const parts = currentLocation.formatted.split(',');
      return parts.slice(0, 2).join(', ').trim();
    }
    return 'Bengaluru, Karnataka';
  }, [loadingLocation, currentLocation]);

  const renderHeader = () => (
    <View>
      {/* 1. TOP BRAND APP BAR */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.brandContainer}>
            <Image 
              source={require('../../assets/images/app-logo.png')} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
            <View style={styles.brandTextColumn}>
              <Text style={styles.logoText}>ReCart</Text>
              <Text style={styles.logoSubtext}>BUY • SELL • RENT</Text>
            </View>
          </View>

          <View style={styles.headerActionsRow}>
            <TouchableOpacity 
              style={styles.headerIconBtn}
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.75}
              accessibilityLabel="Notifications"
            >
              <Ionicons name="notifications-outline" size={20} color="#0F172A" />
              <View style={styles.notificationBadgeDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 2. VIP HERO PROMO BANNER (EXPLORE DEALS CARD WITH INTEGRATED LOCATION) */}
      <View style={styles.promoBanner}>
        {/* Location selector inside Explore Deals card */}
        <View style={styles.promoHeaderRow}>
          <TouchableOpacity 
            style={styles.promoLocationPill} 
            onPress={() => requestLocation && requestLocation(true)}
            activeOpacity={0.75}
            accessibilityLabel="Change location"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="location-sharp" size={13} color={Colors.primary} />
            <Text style={styles.promoLocationLabel}>Location:</Text>
            <Text style={styles.promoLocationText} numberOfLines={1}>
              {locationDisplay}
            </Text>
            <Text style={styles.promoLocationChange}>Change</Text>
            <Ionicons name="chevron-down" size={10} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Explore Deals Card Content */}
        <View style={styles.promoContentRow}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>Better Choices.</Text>
            <Text style={styles.promoTitleAccent}>Pre-Owned Deals.</Text>
            <Text style={styles.promoSubtitle}>
              Quality verified products at up to 60% off market price.
            </Text>
            <TouchableOpacity 
              style={styles.promoCtaBtn}
              activeOpacity={0.8}
              onPress={() => navigateToCategoryScreen('Electronics')}
            >
              <Text style={styles.promoCtaText}>Explore Deals</Text>
              <Ionicons name="arrow-forward" size={11} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.promoRightGraphic}
            activeOpacity={0.85}
            onPress={() => navigateToCategoryScreen('Electronics')}
          >
            <View style={styles.promoGlowCircle} />
            <View style={styles.promoIconPill}>
              <Ionicons 
                name="shield-checkmark" 
                size={23} 
                color={Colors.primary} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. SEARCH BAR DIRECTLY BELOW EXPLORE DEALS CARD */}
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search cars, phones, laptops, bikes..."
        onFilterPress={() => navigation.navigate('Search')}
        containerStyle={styles.searchBarOverride}
      />



      {/* 5. SQUIRCLE CATEGORIES CAROUSEL */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigateToCategoryScreen(selectedCategory || 'Electronics')}
            style={styles.seeAllBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>Explore</Text>
            <Ionicons name="chevron-forward" size={13} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollList}
        >
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const fallbackUri = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80';
            const imageUri = failedImages[cat.id] ? fallbackUri : (cat.image || fallbackUri);

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
                    borderColor: isSelected ? Colors.primary : '#E2E8F0',
                    borderWidth: isSelected ? 2.5 : 1.5,
                  }
                ]}>
                  <Image 
                    source={{ uri: imageUri }} 
                    style={styles.categoryImage} 
                    resizeMode="cover"
                    onError={() => setFailedImages(prev => ({ ...prev, [cat.id]: true }))}
                  />
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
        </ScrollView>
      </View>


      {/* 7. FEATURED LISTINGS HORIZONTAL CAROUSEL */}
      {featuredListings.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Featured Listings</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigateToCategoryScreen(selectedCategory || 'Electronics')}
              style={styles.seeAllBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={13} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.horizontalList}
          >
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
      )}

      {/* 8. NEARBY / MAIN FEED HEADER */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="sparkles-outline" size={18} color={Colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory} Items` : 'Fresh Recommendations'}
          </Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{nearbyListings.length}</Text>
          </View>
        </View>
        {selectedCategory ? (
          <TouchableOpacity 
            onPress={() => setSelectedCategory(null)}
            style={styles.seeAllBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>Show All</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => navigateToCategoryScreen('Electronics')}
            style={styles.seeAllBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={13} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={nearbyListings}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="search-outline" size={32} color={Colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>
              {searchQuery 
                ? `No items found for "${searchQuery}"`
                : `No items available in ${selectedCategory || 'this category'}`}
            </Text>

            <Text style={styles.emptySubtitle}>
              Try searching with another keyword or explore other categories.
            </Text>
            {(searchQuery || selectedCategory) ? (
              <TouchableOpacity 
                style={styles.emptyResetBtn} 
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh-outline" size={15} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.emptyResetBtnText}>Reset Filters</Text>
              </TouchableOpacity>
            ) : null}
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
