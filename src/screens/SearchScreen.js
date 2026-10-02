import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/search/SearchBar';
import { ListingsContext } from '../context/ListingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const CATEGORY_CHIPS = [
  { name: 'All', icon: 'grid-outline' },
  { name: 'Electronics', icon: 'laptop-outline' },
  { name: 'Vehicles', icon: 'car-sport-outline' },
  { name: 'Clothing', icon: 'shirt-outline' },
  { name: 'Home', icon: 'home-outline' },
  { name: 'Sports', icon: 'football-outline' },
  { name: 'Musical Instruments', icon: 'musical-notes-outline' },
  { name: 'Toys', icon: 'game-controller-outline' },
  { name: 'Services', icon: 'construct-outline' },
];

const TRENDING_TAGS = [
  'iPhone 15',
  'MacBook Air',
  'Royal Enfield',
  'PS5 Disc',
  'Acoustic Guitar',
  'Trek Mountain Bike',
  'Sony ANC',
  'AC Repair',
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price_asc' | 'price_desc'
  
  const { listings = [] } = useContext(ListingsContext) || {};
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext) || {
    isFavorite: () => false,
    toggleFavorite: () => {},
  };

  const activeListings = useMemo(() => {
    return listings.filter(l => l.status !== 'inactive' && l.status !== 'sold');
  }, [listings]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = activeListings.filter(p => {
      const matchesSearch = q === '' ||
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q);

      const matchesChip = selectedChip === 'All' ||
        p.category?.toLowerCase() === selectedChip.toLowerCase();

      return matchesSearch && matchesChip;
    });

    if (sortBy === 'price_asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return result;
  }, [activeListings, searchQuery, selectedChip, sortBy]);

  const handleProductPress = (product) => {
    if (!product?.id) return;
    navigation.navigate('ProductDetails', { id: product.id });
  };

  const toggleSort = () => {
    if (sortBy === 'newest') setSortBy('price_asc');
    else if (sortBy === 'price_asc') setSortBy('price_desc');
    else setSortBy('newest');
  };

  const getSortLabel = () => {
    if (sortBy === 'price_asc') return 'Price: Low → High';
    if (sortBy === 'price_desc') return 'Price: High → Low';
    return 'Recent';
  };

  const renderHeader = () => (
    <View style={styles.headerArea}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.headerTitleColumn}>
          <View style={styles.badgePill}>
            <Ionicons name="compass" size={11} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.badgePillText}>EXPLORE RECART</Text>
          </View>
          <Text style={styles.pageTitle}>Explore Marketplace</Text>
          <Text style={styles.pageSubtitle}>Discover verified pre-owned products near you</Text>
        </View>

        <TouchableOpacity 
          style={styles.sortPillTop}
          onPress={toggleSort}
          activeOpacity={0.8}
        >
          <Ionicons name="swap-vertical" size={12} color={Colors.primary} style={{ marginRight: 3 }} />
          <Text style={styles.sortPillTopText}>{getSortLabel()}</Text>
        </TouchableOpacity>
      </View>

      {/* Modern Search Bar */}
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search laptops, cars, phones, bikes..."
        containerStyle={styles.searchBarOverride}
      />

      {/* Horizontal Category Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {CATEGORY_CHIPS.map((chip) => {
          const isActive = selectedChip === chip.name;
          return (
            <TouchableOpacity
              key={chip.name}
              style={[styles.chipItem, isActive && styles.chipItemActive]}
              onPress={() => setSelectedChip(chip.name)}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={chip.icon} 
                size={13} 
                color={isActive ? '#FFFFFF' : '#64748B'} 
                style={{ marginRight: 5 }} 
              />
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {chip.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Trending Search Tags (when search is empty) */}
      {!searchQuery && selectedChip === 'All' && (
        <View style={styles.trendingSection}>
          <View style={styles.trendingTitleRow}>
            <Ionicons name="flame" size={13} color="#FF6B1A" style={{ marginRight: 4 }} />
            <Text style={styles.trendingHeading}>POPULAR SEARCHES</Text>
          </View>
          <View style={styles.trendingWrap}>
            {TRENDING_TAGS.map(tag => (
              <TouchableOpacity
                key={tag}
                style={styles.trendingPill}
                onPress={() => setSearchQuery(tag)}
                activeOpacity={0.75}
              >
                <Ionicons name="search" size={10} color={Colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.trendingText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Filter Stats Row */}
      <View style={styles.resultStatsRow}>
        <View style={styles.resultCountBadge}>
          <View style={styles.countDot} />
          <Text style={styles.resultCount}>
            <Text style={{ fontWeight: '800', color: '#0F172A' }}>{filteredProducts.length}</Text> item{filteredProducts.length === 1 ? '' : 's'} available
          </Text>
        </View>

        {(searchQuery || selectedChip !== 'All') && (
          <TouchableOpacity 
            style={styles.clearFilterLink}
            onPress={() => {
              setSearchQuery('');
              setSelectedChip('All');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.clearFilterLinkText}>Clear Filters</Text>
            <Ionicons name="close-circle" size={13} color={Colors.primary} style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="search-outline" size={30} color={Colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>
              {searchQuery ? `No results for "${searchQuery}"` : 'No items match this filter'}
            </Text>
            <Text style={styles.emptySubtitle}>
              Try using broader terms or switch categories to explore more products.
            </Text>
            <TouchableOpacity 
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedChip('All');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh-outline" size={14} color="#FFFFFF" style={{ marginRight: 5 }} />
              <Text style={styles.resetBtnText}>Clear Search & Filters</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTitleColumn: {
    flex: 1,
    marginRight: 8,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    marginBottom: 4,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  sortPillTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 4,
  },
  sortPillTopText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  searchBarOverride: {
    marginHorizontal: Spacing.lg,
    marginTop: 8,
    marginBottom: 6,
  },
  chipsScroll: {
    paddingLeft: Spacing.lg,
    paddingRight: 6,
    paddingVertical: 6,
  },
  chipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 7,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipItemActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  trendingSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: 8,
    marginBottom: 6,
  },
  trendingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trendingHeading: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  trendingWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  trendingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  trendingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  resultStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 8,
    paddingBottom: 4,
  },
  resultCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginRight: 6,
  },
  resultCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  clearFilterLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  clearFilterLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 110, // Crucial bottom clearance
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: Spacing.xl,
  },
  emptyIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE3D3',
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 16,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
});
