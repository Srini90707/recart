import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/search/SearchBar';
import { FavoritesContext } from '../context/FavoritesContext';
import { MOCK_BASE_CATEGORIES } from '../data/mockData';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites = [], toggleFavorite } = useContext(FavoritesContext) || {};
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const q = searchQuery.toLowerCase().trim();
    return favorites.filter(
      item =>
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q)
    );
  }, [favorites, searchQuery]);

  const handleProductPress = (product) => {
    if (!product?.id) return;
    navigation.navigate('ProductDetails', { id: product.id });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleColumn}>
          <View style={styles.badgePill}>
            <Ionicons name="heart" size={11} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.badgePillText}>MY WISHLIST</Text>
          </View>
          <Text style={styles.title}>Saved Items</Text>
          <Text style={styles.subtitle}>
            {favorites.length} item{favorites.length === 1 ? '' : 's'} bookmarked for later
          </Text>
        </View>

        {favorites.length > 0 && (
          <TouchableOpacity 
            style={styles.exploreLink} 
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.75}
          >
            <Ionicons name="add" size={14} color={Colors.primary} style={{ marginRight: 2 }} />
            <Text style={styles.exploreLinkText}>Add More</Text>
          </TouchableOpacity>
        )}
      </View>

      {favorites.length > 2 && (
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter saved items by name, category..."
          containerStyle={styles.searchBarOverride}
        />
      )}
    </View>
  );

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyGlowCircle}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="heart" size={38} color={Colors.primary} />
            </View>
          </View>

          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart icon on any listing while browsing to save your favorite deals right here.
          </Text>

          <TouchableOpacity 
            style={styles.exploreBtn}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.exploreBtnText}>Explore Marketplace</Text>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          {/* Quick Category Suggestions */}
          <View style={styles.suggestedContainer}>
            <Text style={styles.suggestedHeading}>OR BROWSE POPULAR CATEGORIES</Text>
            <View style={styles.suggestedRow}>
              {MOCK_BASE_CATEGORIES.slice(0, 4).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.catChip}
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate('Category', { categoryName: cat.name })}
                >
                  <Ionicons name={cat.icon} size={12} color={Colors.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.catChipText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyFilterContainer}>
              <View style={styles.emptyFilterIconWrap}>
                <Ionicons name="search-outline" size={26} color="#94A3B8" />
              </View>
              <Text style={styles.emptyFilterTitle}>{'No saved items match "' + searchQuery + '"'}</Text>
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn} activeOpacity={0.75}>
                <Ionicons name="refresh-outline" size={13} color={Colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.clearSearchText}>Clear Search Filter</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={{ ...item, isFavorite: true }}
              onPress={() => handleProductPress(item)}
              onFavoritePress={() => toggleFavorite && toggleFavorite(item)}
            />
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleColumn: {
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
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  exploreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    marginTop: 4,
  },
  exploreLinkText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: Colors.primary,
  },
  searchBarOverride: {
    marginHorizontal: 0,
    marginTop: 8,
    marginBottom: 2,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 110,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  emptyGlowCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFE8DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFE3D3',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  emptySubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    fontWeight: '500',
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 28,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  suggestedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  suggestedHeading: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  suggestedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  catChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },
  emptyFilterContainer: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: Spacing.xl,
  },
  emptyFilterIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  emptyFilterTitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
    textAlign: 'center',
  },
  clearSearchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  clearSearchText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.primary,
  },
});
