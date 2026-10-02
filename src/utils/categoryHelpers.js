import CategoryService from '../services/CategoryService';
import { PRICE_RANGES } from '../data/categoryData';

/**
 * Safely format numerical price into Indian Rupee format (e.g. 52000 -> "₹52,000")
 * @param {number|string} amount
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  try {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || amount === null || amount === undefined) {
      return '₹0';
    }
    return `₹${numericAmount.toLocaleString('en-IN')}`;
  } catch (error) {
    console.warn('[categoryHelpers] formatCurrency error:', error);
    return `₹${amount || 0}`;
  }
}

/**
 * Retrieve subcategories safely for a given category name via CategoryService
 * @param {string} categoryName
 * @returns {Array<{ id: string, name: string, icon?: string, image?: string }>}
 */
export function getSubcategoriesForCategory(categoryName) {
  try {
    return CategoryService.getSubcategories(categoryName);
  } catch (error) {
    console.warn('[categoryHelpers] getSubcategoriesForCategory error:', error);
    return [];
  }
}

/**
 * Filter listings by category, subcategory, search query, and filter sheet parameters
 * Fully protected by try-catch with safe optional chaining.
 * 
 * @param {Array<Object>} listings
 * @param {Object} options
 * @param {string} options.categoryName
 * @param {string|null} options.selectedSubCategory
 * @param {string} options.searchQuery
 * @param {Object} options.filters
 * @returns {Array<Object>} Filtered array of listings
 */
export function filterCategoryListings(listings, options = {}) {
  try {
    if (!Array.isArray(listings)) {
      return [];
    }

    const {
      categoryName = 'Electronics',
      selectedSubCategory = null,
      searchQuery = '',
      filters = {},
    } = options;

    const normalizedCategory = (categoryName || '').toLowerCase().trim();
    const normalizedQuery = (searchQuery || '').toLowerCase().trim();
    const normalizedSub = selectedSubCategory && selectedSubCategory !== 'All' 
      ? selectedSubCategory.toLowerCase().trim() 
      : null;

    return listings.filter((item) => {
      if (!item || typeof item !== 'object') {
        return false;
      }

      // 1. Category Matching
      if (normalizedCategory) {
        const itemCat = (item.category || '').toLowerCase().trim();
        if (itemCat !== normalizedCategory) {
          return false;
        }
      }

      // 2. Subcategory Matching
      if (normalizedSub) {
        const itemSub = (item.subCategory || '').toLowerCase();
        const itemTitle = (item.title || '').toLowerCase();
        const matchesSub = itemSub.includes(normalizedSub) || itemTitle.includes(normalizedSub);
        if (!matchesSub) {
          return false;
        }
      }

      // 3. Search Query Matching (title, brand, location, subCategory)
      if (normalizedQuery) {
        const matchTitle = (item.title || '').toLowerCase().includes(normalizedQuery);
        const matchBrand = (item.brand || '').toLowerCase().includes(normalizedQuery);
        const matchLoc = (item.location || '').toLowerCase().includes(normalizedQuery);
        const matchSub = (item.subCategory || '').toLowerCase().includes(normalizedQuery);
        if (!matchTitle && !matchBrand && !matchLoc && !matchSub) {
          return false;
        }
      }

      // 4. Listing Type (buy / rent)
      if (filters.type && filters.type !== 'all') {
        if (item.type && item.type.toLowerCase() !== filters.type.toLowerCase()) {
          return false;
        }
      }

      // 5. Condition Filter
      if (filters.condition && filters.condition !== 'All') {
        const itemCondition = (item.condition || '').toLowerCase();
        const targetCondition = filters.condition.toLowerCase();
        if (!itemCondition.includes(targetCondition)) {
          return false;
        }
      }

      // 6. Brand Filter
      if (filters.brand && filters.brand !== 'All') {
        const itemBrand = (item.brand || '').toLowerCase();
        const itemTitle = (item.title || '').toLowerCase();
        const targetBrand = filters.brand.toLowerCase();
        if (itemBrand !== targetBrand && !itemTitle.includes(targetBrand)) {
          return false;
        }
      }

      // 7. Location Filter
      if (filters.location && filters.location !== 'All') {
        const itemLocation = (item.location || '').toLowerCase();
        const targetLocation = filters.location.toLowerCase();
        if (!itemLocation.includes(targetLocation)) {
          return false;
        }
      }

      // 8. Price Range Filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        const range = PRICE_RANGES.find((r) => r.id === filters.priceRange);
        if (range) {
          const itemPrice = Number(item.price) || 0;
          if (itemPrice < range.min || itemPrice > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  } catch (error) {
    console.error('[categoryHelpers] filterCategoryListings critical error:', error);
    return Array.isArray(listings) ? listings : [];
  }
}

/**
 * Sort listings based on selected sort option
 * @param {Array<Object>} listings
 * @param {string} sortOption
 * @returns {Array<Object>} Sorted listings array
 */
export function sortCategoryListings(listings, sortOption = 'recommended') {
  try {
    if (!Array.isArray(listings)) return [];
    const list = [...listings];

    switch (sortOption) {
      case 'newest':
        return list.reverse();
      case 'price_low':
        return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      case 'price_high':
        return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      case 'nearest':
        return list.sort((a, b) => {
          const aLoc = (a.location || '').toLowerCase();
          const bLoc = (b.location || '').toLowerCase();
          if (aLoc.includes('bengaluru') && !bLoc.includes('bengaluru')) return -1;
          if (!aLoc.includes('bengaluru') && bLoc.includes('bengaluru')) return 1;
          return 0;
        });
      case 'recommended':
      default:
        return list.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return 0;
        });
    }
  } catch (error) {
    console.error('[categoryHelpers] sortCategoryListings error:', error);
    return listings;
  }
}

/**
 * Calculates the number of non-default active filters
 * @param {Object} filters
 * @param {string} selectedSort
 * @returns {number} Active filter count
 */
export function calculateActiveFilterCount(filters = {}, selectedSort = 'recommended') {
  try {
    return [
      selectedSort && selectedSort !== 'recommended',
      filters.priceRange && filters.priceRange !== 'all',
      filters.condition && filters.condition !== 'All',
      filters.brand && filters.brand !== 'All',
      filters.location && filters.location !== 'All',
      filters.type && filters.type !== 'all',
      filters.postedDate && filters.postedDate !== 'all',
    ].filter(Boolean).length;
  } catch (error) {
    console.warn('[categoryHelpers] calculateActiveFilterCount error:', error);
    return 0;
  }
}
