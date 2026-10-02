import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { SELL_CATEGORIES } from '../../data/sellCategoryData';

const { width } = Dimensions.get('window');
const SUBCAT_GAP = 12;
const CONTAINER_PADDING = 16;
const SUBCAT_CARD_WIDTH = (width - CONTAINER_PADDING * 2 - SUBCAT_GAP) / 2;

export default function CategoryPickerStep({ onSelectCategoryAndSubcategory }) {
  const [search, setSearch] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(SELL_CATEGORIES[0]?.id || 'electronics');
  const [failedImages, setFailedImages] = useState({});

  // Filter categories and subcategories based on search query
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return SELL_CATEGORIES;
    const q = search.toLowerCase();
    return SELL_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.tagline.toLowerCase().includes(q) ||
        cat.subcategories.some((sub) => sub.name.toLowerCase().includes(q))
    );
  }, [search]);

  // Active category
  const activeCategory = useMemo(() => {
    const found = filteredCategories.find((c) => c.id === selectedCatId);
    return found || filteredCategories[0] || null;
  }, [filteredCategories, selectedCatId]);

  // Filter subcategories for the active category
  const displayedSubcategories = useMemo(() => {
    if (!activeCategory) return [];
    if (!search.trim()) return activeCategory.subcategories;
    const q = search.toLowerCase();
    return activeCategory.subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.tagBadge}>
          <Ionicons name="sparkles" size={11} color={Colors.primary} style={{ marginRight: 4 }} />
          <Text style={styles.tagBadgeText}>START SELLING</Text>
        </View>
        <Text style={styles.title}>Post Your Ad</Text>
        <Text style={styles.subtitle}>
          Select a category and subcategory to begin listing
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={17} color={Colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories or items..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            multiline={false}
            numberOfLines={1}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={17} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SECTION 1: Small Squircle Category Cards Scrollable Horizontally to Right */}
        <View style={styles.horizontalSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>CATEGORIES</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {filteredCategories.map((cat) => {
              const isSelected = activeCategory?.id === cat.id;
              const fallbackUri = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80';
              const imageUri = failedImages[cat.id] ? fallbackUri : (cat.image || fallbackUri);

              return (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryItem}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCatId(cat.id)}
                >
                  {/* Squircle Image Container */}
                  <View
                    style={[
                      styles.categoryImageContainer,
                      {
                        borderColor: isSelected ? Colors.primary : '#E2E8F0',
                        borderWidth: isSelected ? 2.5 : 1.5,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [cat.id]: true }))
                      }
                    />
                    {/* Orange Badge at Bottom Right with White Icon */}
                    <View
                      style={[
                        styles.categoryBadge,
                        isSelected && styles.categoryBadgeActive,
                      ]}
                    >
                      <Ionicons name={cat.icon} size={11} color="#FFFFFF" />
                    </View>
                  </View>

                  {/* Clean Category Label Below */}
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* SECTION 2: Subcategories Grid in Small Cards Below */}
        {activeCategory ? (
          <View style={styles.subcategoriesSection}>
            <View style={styles.subSectionHeader}>
              <View style={styles.subHeaderTitleRow}>
                <View
                  style={[
                    styles.subCategoryIconPill,
                    { backgroundColor: activeCategory.bgColor },
                  ]}
                >
                  <Ionicons
                    name={activeCategory.icon}
                    size={15}
                    color={activeCategory.color}
                  />
                </View>
                <Text style={styles.subSectionTitle} numberOfLines={1}>
                  {activeCategory.name}
                </Text>
              </View>

              <Text style={styles.subCountIndicator}>
                {displayedSubcategories.length} options
              </Text>
            </View>

            {/* 2-Column Grid of Subcategory Cards */}
            <View style={styles.subGridContainer}>
              {displayedSubcategories.map((sub, idx) => (
                <TouchableOpacity
                  key={sub.id || idx}
                  style={styles.subCard}
                  activeOpacity={0.75}
                  onPress={() =>
                    onSelectCategoryAndSubcategory(activeCategory, sub)
                  }
                >
                  {sub.image ? (
                    <View style={styles.subImageWrapper}>
                      <Image source={{ uri: sub.image }} style={styles.subImage} />
                      <View style={styles.subImageOverlay} />
                      <View
                        style={[
                          styles.subMiniIcon,
                          { backgroundColor: activeCategory.bgColor },
                        ]}
                      >
                        <Ionicons
                          name={sub.icon || activeCategory.icon}
                          size={12}
                          color={activeCategory.color}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.subIconWrapper,
                        { backgroundColor: activeCategory.bgColor },
                      ]}
                    >
                      <Ionicons
                        name={sub.icon || activeCategory.icon}
                        size={26}
                        color={activeCategory.color}
                      />
                    </View>
                  )}

                  <View style={styles.subCardBody}>
                    <Text style={styles.subCardName} numberOfLines={2}>
                      {sub.name}
                    </Text>
                    <View style={styles.arrowCircle}>
                      <Ionicons name="arrow-forward" size={11} color={Colors.primary} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {displayedSubcategories.length === 0 && (
              <View style={styles.emptySubState}>
                <Ionicons name="search-outline" size={32} color="#94A3B8" />
                <Text style={styles.emptySubText}>
                  {"No subcategories matching \"" + search + "\""}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={42} color="#94A3B8" />
            <Text style={styles.emptyTitle}>{"No categories match \"" + search + "\""}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    marginBottom: 6,
  },
  tagBadgeText: {
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
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    paddingVertical: 0,
  },
  scrollContent: {
    paddingBottom: 110, // Critical bottom clearance above tab bar
  },
  horizontalSection: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONTAINER_PADDING,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  horizontalList: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingRight: 6,
  },
  categoryItem: {
    width: 72,
    alignItems: 'center',
    marginRight: 12,
  },
  categoryImageContainer: {
    width: 66,
    height: 66,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 6,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  categoryBadgeActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  subcategoriesSection: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 18,
  },
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  subHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  subCategoryIconPill: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subCountIndicator: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  subGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subCard: {
    width: SUBCAT_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SUBCAT_GAP,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  subImageWrapper: {
    width: '100%',
    height: 84,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  subImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  subImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  subMiniIcon: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    width: 24,
    height: 24,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subIconWrapper: {
    width: '100%',
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 11,
  },
  subCardName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 17,
    marginRight: 6,
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySubState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptySubText: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
});
