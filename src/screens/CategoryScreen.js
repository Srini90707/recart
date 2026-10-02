import React, { useState, useMemo, useCallback, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import ErrorBoundary from '../components/common/ErrorBoundary';
import ProductCard from '../components/product/ProductCard';
import FilterBottomSheet from '../components/filter/FilterBottomSheet';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { PRICE_RANGES } from '../data/categoryData';
import {
  filterCategoryListings,
  sortCategoryListings,
  calculateActiveFilterCount,
  getSubcategoriesForCategory,
  formatCurrency,
} from '../utils/categoryHelpers';
import { styles } from '../styles/CategoryScreen.styles';

/** Default filter state object */
const INITIAL_FILTERS = {
  priceRange: 'all',
  condition: 'All',
  brand: 'All',
  location: 'All',
  type: 'all',
  postedDate: 'all',
};

function CategoryScreenContent() {
  const navigation = useNavigation();
  const route = useRoute();

  // Safely extract category parameters
  const categoryName = route.params?.categoryName || 'Electronics';

  // Context consumers
  const { listings = [] } = useContext(ListingsContext) || {};
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext) || {
    isFavorite: () => false,
    toggleFavorite: () => {},
  };

  // Component UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [subcatImageErrors, setSubcatImageErrors] = useState({});

  // 1. Retrieve subcategories safely
  const subcategories = useMemo(() => {
    try {
      return getSubcategoriesForCategory(categoryName);
    } catch (err) {
      console.warn('[CategoryScreen] subcategories memo error:', err);
      return [];
    }
  }, [categoryName]);

  // 2. Filter listings with robust try-catch
  const filteredListings = useMemo(() => {
    try {
      return filterCategoryListings(listings, {
        categoryName,
        selectedSubCategory,
        searchQuery,
        filters,
      });
    } catch (err) {
      console.error('[CategoryScreen] filteredListings memo error:', err);
      return [];
    }
  }, [listings, categoryName, selectedSubCategory, searchQuery, filters]);

  // 3. Sort listings with robust try-catch
  const sortedListings = useMemo(() => {
    try {
      return sortCategoryListings(filteredListings, selectedSort);
    } catch (err) {
      console.error('[CategoryScreen] sortedListings memo error:', err);
      return filteredListings;
    }
  }, [filteredListings, selectedSort]);

  // 4. Promoted/Featured listings
  const featuredListings = useMemo(() => {
    try {
      const categoryItems = (listings || []).filter(
        (l) => l?.category?.toLowerCase() === categoryName.toLowerCase()
      );
      const explicitlyFeatured = categoryItems.filter((l) => l?.isFeatured);
      if (explicitlyFeatured.length > 0) {
        return explicitlyFeatured.slice(0, 4);
      }
      return categoryItems.slice(0, 3);
    } catch (err) {
      console.warn('[CategoryScreen] featuredListings memo error:', err);
      return [];
    }
  }, [listings, categoryName]);

  // Active filter count computation
  const activeFiltersCount = useMemo(() => {
    return calculateActiveFilterCount(filters, selectedSort);
  }, [filters, selectedSort]);

  // -------------------------------------------------------------
  // Event Handlers with Exception Handling
  // -------------------------------------------------------------

  /** Safe navigation to Product Details screen */
  const handleProductPress = useCallback((product) => {
    try {
      if (!product?.id) {
        Alert.alert('Notice', 'Listing details are currently unavailable.');
        return;
      }
      navigation.navigate('ProductDetails', { id: product.id });
    } catch (error) {
      console.error('[CategoryScreen] handleProductPress error:', error);
      Alert.alert('Error', 'Unable to open listing details at this moment.');
    }
  }, [navigation]);

  /** Safe favorite toggling */
  const handleFavoritePress = useCallback((product) => {
    try {
      if (!product?.id) return;
      toggleFavorite(product);
    } catch (error) {
      console.error('[CategoryScreen] handleFavoritePress error:', error);
    }
  }, [toggleFavorite]);

  /** Subcategory selection toggle */
  const handleSubCategoryToggle = useCallback((subName) => {
    try {
      setSelectedSubCategory((prev) => (prev === subName ? null : subName));
    } catch (error) {
      console.error('[CategoryScreen] handleSubCategoryToggle error:', error);
    }
  }, []);

  /** Reset all filters to initial state */
  const handleClearFilters = useCallback(() => {
    try {
      setSearchQuery('');
      setSelectedSubCategory(null);
      setFilters(INITIAL_FILTERS);
      setSelectedSort('recommended');
    } catch (error) {
      console.error('[CategoryScreen] handleClearFilters error:', error);
    }
  }, []);

  /** Apply filters from FilterBottomSheet */
  const handleApplyFilters = useCallback((newFilters) => {
    try {
      setFilters(newFilters || INITIAL_FILTERS);
    } catch (error) {
      console.error('[CategoryScreen] handleApplyFilters error:', error);
    }
  }, []);

  /** Apply sorting from FilterBottomSheet */
  const handleSelectSort = useCallback((newSort) => {
    try {
      setSelectedSort(newSort || 'recommended');
    } catch (error) {
      console.error('[CategoryScreen] handleSelectSort error:', error);
    }
  }, []);

  /** Mark broken image for graceful icon fallback */
  const handleImageError = useCallback((id) => {
    setSubcatImageErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  // -------------------------------------------------------------
  // Render Functions (Modular & Readable)
  // -------------------------------------------------------------

  /** Renders the search bar row with the right-side filter button */
  const renderSearchRow = () => (
    <View style={styles.searchWrapper}>
      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search in ${categoryName}...`}
            placeholderTextColor="#94A3B8"
            returnKeyType="search"
            autoCorrect={false}
            multiline={false}
            numberOfLines={1}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')} 
              style={styles.clearSearchBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.searchFilterBtn,
            activeFiltersCount > 0 && styles.searchFilterBtnActive,
          ]}
          onPress={() => setFilterModalVisible(true)}
          activeOpacity={0.8}
          accessibilityLabel="Open filters"
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={activeFiltersCount > 0 ? '#FFFFFF' : '#0F172A'}
          />
          {activeFiltersCount > 0 && (
            <View style={styles.searchFilterBadge}>
              <Text style={styles.searchFilterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  /** Renders a single subcategory card in horizontal scroll */
  const renderSubcategoryCard = (sub) => {
    const isSelected = selectedSubCategory === sub.name;
    const hasError = subcatImageErrors[sub.id];

    return (
      <TouchableOpacity
        key={sub.id}
        style={styles.subcategoryItem}
        onPress={() => handleSubCategoryToggle(sub.name)}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.subcategoryAvatar,
            isSelected && styles.subcategoryAvatarSelected,
          ]}
        >
          {!hasError && sub.image ? (
            <Image
              source={{ uri: sub.image }}
              style={styles.subcategoryImage}
              resizeMode="cover"
              onError={() => handleImageError(sub.id)}
            />
          ) : (
            <View style={styles.subcategoryIconFallback}>
              <Ionicons
                name={sub.icon || 'hardware-chip-outline'}
                size={22}
                color={isSelected ? '#FF6B1A' : '#64748B'}
              />
            </View>
          )}
          {isSelected && (
            <View style={styles.subcatActiveBadge}>
              <Ionicons name="checkmark" size={10} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text
          style={[
            styles.subcategoryName,
            isSelected && styles.subcategoryNameSelected,
          ]}
          numberOfLines={2}
        >
          {sub.name}
        </Text>
      </TouchableOpacity>
    );
  };

  /** Renders the subcategories horizontal carousel */
  const renderSubcategoriesSection = () => (
    <View style={styles.subcategoriesSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subcategoriesList}
      >
        {/* "All" Category Pill */}
        <TouchableOpacity
          style={styles.subcategoryItem}
          onPress={() => setSelectedSubCategory(null)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.subcategoryAvatar,
              selectedSubCategory === null && styles.subcategoryAvatarSelected,
            ]}
          >
            <Ionicons
              name="apps"
              size={22}
              color={selectedSubCategory === null ? '#FF6B1A' : '#64748B'}
            />
            {selectedSubCategory === null && (
              <View style={styles.subcatActiveBadge}>
                <Ionicons name="checkmark" size={10} color="#FFFFFF" />
              </View>
            )}
          </View>
          <Text
            style={[
              styles.subcategoryName,
              selectedSubCategory === null && styles.subcategoryNameSelected,
            ]}
            numberOfLines={2}
          >
            All
          </Text>
        </TouchableOpacity>

        {subcategories.map(renderSubcategoryCard)}
      </ScrollView>
    </View>
  );

  /** Renders active filter pill tags */
  const renderActiveFilterTags = () => {
    const hasActiveFilters = selectedSubCategory || activeFiltersCount > 0 || searchQuery.trim();
    if (!hasActiveFilters) return null;

    return (
      <View style={styles.activeFilterSummaryRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.activeFilterScroll}
        >
          {selectedSubCategory && (
            <TouchableOpacity
              style={styles.filterTag}
              onPress={() => setSelectedSubCategory(null)}
              activeOpacity={0.75}
            >
              <Text style={styles.filterTagText}>{selectedSubCategory}</Text>
              <Ionicons name="close-circle" size={14} color="#FF6B1A" />
            </TouchableOpacity>
          )}
          {filters.brand !== 'All' && (
            <TouchableOpacity
              style={styles.filterTag}
              onPress={() => setFilters((p) => ({ ...p, brand: 'All' }))}
              activeOpacity={0.75}
            >
              <Text style={styles.filterTagText}>Brand: {filters.brand}</Text>
              <Ionicons name="close-circle" size={14} color="#FF6B1A" />
            </TouchableOpacity>
          )}
          {filters.condition !== 'All' && (
            <TouchableOpacity
              style={styles.filterTag}
              onPress={() => setFilters((p) => ({ ...p, condition: 'All' }))}
              activeOpacity={0.75}
            >
              <Text style={styles.filterTagText}>{filters.condition}</Text>
              <Ionicons name="close-circle" size={14} color="#FF6B1A" />
            </TouchableOpacity>
          )}
          {filters.location !== 'All' && (
            <TouchableOpacity
              style={styles.filterTag}
              onPress={() => setFilters((p) => ({ ...p, location: 'All' }))}
              activeOpacity={0.75}
            >
              <Text style={styles.filterTagText}>{filters.location}</Text>
              <Ionicons name="close-circle" size={14} color="#FF6B1A" />
            </TouchableOpacity>
          )}
          {filters.priceRange !== 'all' && (
            <TouchableOpacity
              style={styles.filterTag}
              onPress={() => setFilters((p) => ({ ...p, priceRange: 'all' }))}
              activeOpacity={0.75}
            >
              <Text style={styles.filterTagText}>
                {PRICE_RANGES.find((p) => p.id === filters.priceRange)?.label || 'Price'}
              </Text>
              <Ionicons name="close-circle" size={14} color="#FF6B1A" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleClearFilters} style={styles.clearAllTag} activeOpacity={0.75}>
            <Text style={styles.clearAllTagText}>Clear all</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  /** Renders the featured promoted carousel */
  const renderFeaturedSection = () => {
    if (selectedSubCategory || searchQuery.trim() || featuredListings.length === 0) {
      return null;
    }

    return (
      <View style={styles.featuredSection}>
        <View style={styles.featuredHeader}>
          <View style={styles.featuredTitleRow}>
            <Text style={styles.featuredTitle}>Featured {categoryName}</Text>
            <View style={styles.featuredSparkleBadge}>
              <Text style={styles.featuredSparkleText}>PROMOTED</Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {featuredListings.map((item) => {
            if (!item?.id) return null;
            const itemFav = Boolean(isFavorite(item.id));
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredCard}
                onPress={() => handleProductPress(item)}
                activeOpacity={0.88}
              >
                <View style={styles.featuredImageContainer}>
                  <Image
                    source={{ 
                      uri: item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' 
                    }}
                    style={styles.featuredImage}
                    resizeMode="cover"
                  />
                  <View style={styles.featuredBadgePill}>
                    <Text style={styles.featuredBadgeText}>FEATURED</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.featuredFavBtn}
                    onPress={() => handleFavoritePress(item)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={itemFav ? 'heart' : 'heart-outline'}
                      size={15}
                      color={itemFav ? '#EF4444' : '#64748B'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredPrice}>
                    {formatCurrency(item.price)}
                  </Text>
                  <Text style={styles.featuredProductTitle} numberOfLines={2}>
                    {item.title || 'Untitled Listing'}
                  </Text>
                  <View style={styles.featuredLocationRow}>
                    <Ionicons name="location-outline" size={11} color="#64748B" />
                    <Text style={styles.featuredLocationText} numberOfLines={1}>
                      {item.location || 'Local'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  /** Header component passed to FlatList */
  const renderListHeader = () => (
    <View>
      {renderSearchRow()}
      {renderSubcategoriesSection()}
      {renderActiveFilterTags()}
      {renderFeaturedSection()}
      <View style={styles.listingHeader}>
        <Text style={styles.listingTitle}>{categoryName} Near You</Text>
        <Text style={styles.listingCount}>
          {sortedListings.length} listing{sortedListings.length === 1 ? '' : 's'}
        </Text>
      </View>
    </View>
  );

  /** Empty state when no listings match */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="hardware-chip-outline" size={36} color="#FF6B1A" />
      </View>
      <Text style={styles.emptyTitle}>No {categoryName.toLowerCase()} found</Text>
      <Text style={styles.emptySubtitle}>
        Try changing your filters or search for another product.
      </Text>
      <TouchableOpacity
        style={styles.clearFiltersBtn}
        onPress={handleClearFilters}
        activeOpacity={0.85}
      >
        <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
        <Text style={styles.clearFiltersBtnText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  /** Item renderer for 2-column ProductCard grid */
  const renderProductItem = ({ item }) => {
    if (!item?.id) return null;
    return (
      <ProductCard
        product={{
          ...item,
          isFavorite: Boolean(isFavorite(item.id)),
        }}
        onPress={() => handleProductPress(item)}
        onFavoritePress={() => handleFavoritePress(item)}
      />
    );
  };

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Top Navigation Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              try {
                navigation.goBack();
              } catch (e) {
                console.error('[CategoryScreen] goBack error:', e);
              }
            }}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#0F172A" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Optimized 2-Column Product Grid */}
      <FlatList
        data={sortedListings}
        keyExtractor={(item, index) => item?.id?.toString() || `listing-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderProductItem}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
      />

      {/* Unified Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        categoryName={categoryName}
        filters={filters}
        onApply={handleApplyFilters}
        selectedSort={selectedSort}
        onSelectSort={handleSelectSort}
        totalCount={sortedListings.length}
      />
    </ScreenContainer>
  );
}

export default function CategoryScreen(props) {
  return (
    <ErrorBoundary>
      <CategoryScreenContent {...props} />
    </ErrorBoundary>
  );
}
