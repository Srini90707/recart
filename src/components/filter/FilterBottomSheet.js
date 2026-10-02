import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  SORT_OPTIONS,
  CONDITION_OPTIONS,
  PRICE_RANGES,
  LOCATION_OPTIONS,
  BRAND_OPTIONS,
} from '../../data/categoryData';

export default function FilterBottomSheet({
  visible,
  onClose,
  categoryName = 'Electronics',
  filters,
  onApply,
  selectedSort = 'recommended',
  onSelectSort,
  totalCount = 0,
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [localSort, setLocalSort] = useState(selectedSort);
  const [prevVisible, setPrevVisible] = useState(visible);

  if (visible !== prevVisible) {
    setPrevVisible(visible);
    setLocalFilters(filters);
    setLocalSort(selectedSort);
  }

  const brands = BRAND_OPTIONS[categoryName] || BRAND_OPTIONS.Electronics || [];

  const handlePriceSelect = (rangeId) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        priceRange: prev.priceRange === rangeId ? 'all' : rangeId,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handlePriceSelect error:', error);
    }
  };

  const handleConditionSelect = (cond) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        condition: prev.condition === cond ? 'All' : cond,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handleConditionSelect error:', error);
    }
  };

  const handleBrandSelect = (brand) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        brand: prev.brand === brand ? 'All' : brand,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handleBrandSelect error:', error);
    }
  };

  const handleLocationSelect = (loc) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        location: prev.location === loc ? 'All' : loc,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handleLocationSelect error:', error);
    }
  };

  const handleTypeSelect = (type) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        type: prev.type === type ? 'all' : type,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handleTypeSelect error:', error);
    }
  };

  const handlePostedDateSelect = (dateOption) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        postedDate: prev.postedDate === dateOption ? 'all' : dateOption,
      }));
    } catch (error) {
      console.warn('[FilterBottomSheet] handlePostedDateSelect error:', error);
    }
  };

  const handleReset = () => {
    try {
      const defaultFilters = {
        priceRange: 'all',
        condition: 'All',
        brand: 'All',
        location: 'All',
        type: 'all',
        postedDate: 'all',
      };
      setLocalFilters(defaultFilters);
      setLocalSort('recommended');
      if (typeof onSelectSort === 'function') onSelectSort('recommended');
      if (typeof onApply === 'function') onApply(defaultFilters);
    } catch (error) {
      console.error('[FilterBottomSheet] handleReset error:', error);
    }
  };

  const handleApply = () => {
    try {
      if (typeof onSelectSort === 'function') onSelectSort(localSort);
      if (typeof onApply === 'function') onApply(localFilters);
      if (typeof onClose === 'function') onClose();
    } catch (error) {
      console.error('[FilterBottomSheet] handleApply error:', error);
      if (typeof onClose === 'function') onClose();
    }
  };

  const activeCount = [
    localSort !== 'recommended',
    localFilters.priceRange !== 'all',
    localFilters.condition !== 'All',
    localFilters.brand !== 'All',
    localFilters.location !== 'All',
    localFilters.type !== 'all',
    localFilters.postedDate !== 'all',
  ].filter(Boolean).length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.sheetContainer}>
              {/* Drag Handle */}
              <View style={styles.handleContainer}>
                <View style={styles.dragHandle} />
              </View>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>Filter & Sort</Text>
                  {activeCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{activeCount}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.headerActions}>
                  <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
                    <Text style={styles.resetText}>Reset All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <Ionicons name="close" size={22} color="#475569" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Filter Content */}
              <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.bodyContent}
              >
                {/* 0. Sort By */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Sort By</Text>
                  <View style={styles.chipsWrap}>
                    {SORT_OPTIONS.map((sortItem) => {
                      const isSelected = localSort === sortItem.id;
                      return (
                        <TouchableOpacity
                          key={sortItem.id}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => setLocalSort(sortItem.id)}
                        >
                          <Ionicons
                            name={sortItem.icon}
                            size={14}
                            color={isSelected ? '#FF6B1A' : '#64748B'}
                            style={{ marginRight: 4 }}
                          />
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {sortItem.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {/* 1. Buy & Sell / Rent */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Listing Type</Text>
                  <View style={styles.chipsRow}>
                    {[
                      { id: 'all', label: 'All Listings' },
                      { id: 'buy', label: 'Buy & Sell' },
                      { id: 'rent', label: 'Rent' },
                    ].map((item) => {
                      const isSelected = localFilters.type === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handleTypeSelect(item.id)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 2. Condition */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Condition</Text>
                  <View style={styles.chipsRow}>
                    {CONDITION_OPTIONS.map((cond) => {
                      const isSelected = localFilters.condition === cond;
                      return (
                        <TouchableOpacity
                          key={cond}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handleConditionSelect(cond)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {cond}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 3. Price Range */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Price Range</Text>
                  <View style={styles.chipsWrap}>
                    {PRICE_RANGES.map((range) => {
                      const isSelected = localFilters.priceRange === range.id;
                      return (
                        <TouchableOpacity
                          key={range.id}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handlePriceSelect(range.id)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {range.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 4. Brand */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Brand</Text>
                  <View style={styles.chipsWrap}>
                    {brands.map((brand) => {
                      const isSelected = localFilters.brand === brand;
                      return (
                        <TouchableOpacity
                          key={brand}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handleBrandSelect(brand)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {brand}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 5. Location */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Location</Text>
                  <View style={styles.chipsRow}>
                    {LOCATION_OPTIONS.map((loc) => {
                      const isSelected = localFilters.location === loc;
                      return (
                        <TouchableOpacity
                          key={loc}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handleLocationSelect(loc)}
                        >
                          <Ionicons
                            name="location-outline"
                            size={14}
                            color={isSelected ? '#FF6B1A' : '#64748B'}
                            style={{ marginRight: 4 }}
                          />
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {loc}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 6. Posted Date */}
                <View style={[styles.section, { marginBottom: 12 }]}>
                  <Text style={styles.sectionTitle}>Posted Date</Text>
                  <View style={styles.chipsRow}>
                    {[
                      { id: 'all', label: 'Anytime' },
                      { id: 'today', label: 'Last 24 Hours' },
                      { id: 'week', label: 'Past Week' },
                      { id: 'month', label: 'Past Month' },
                    ].map((item) => {
                      const isSelected = localFilters.postedDate === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={[styles.chip, isSelected && styles.chipActive]}
                          onPress={() => handlePostedDateSelect(item.id)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextActive,
                            ]}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={handleApply}
                  activeOpacity={0.88}
                >
                  <Text style={styles.applyBtnText}>
                    Apply Filters {totalCount > 0 ? `(${totalCount})` : ''}
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  badge: {
    backgroundColor: '#FF6B1A',
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  resetText: {
    color: '#FF6B1A',
    fontSize: 13,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  body: {
    paddingHorizontal: 20,
  },
  bodyContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FF6B1A',
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FF6B1A',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  applyBtn: {
    backgroundColor: '#FF6B1A',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
