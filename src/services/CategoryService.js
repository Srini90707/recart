/**
 * ReCart Marketplace - Global Category Service
 * Production-level service managing category data, subcategories, and filter options.
 * Architecture-ready for REST or GraphQL API endpoints.
 */

import {
  CATEGORY_SUBCATEGORIES,
  SORT_OPTIONS,
  CONDITION_OPTIONS,
  PRICE_RANGES,
  LOCATION_OPTIONS,
  BRAND_OPTIONS,
} from '../data/categoryData';
import { MOCK_BASE_CATEGORIES, MOCK_EXPANDED_CATEGORIES } from '../data/mockData';

class CategoryService {
  constructor() {
    this._categoriesCache = null;
    this._subcategoriesCache = new Map();
  }

  /**
   * Retrieves all base and expanded categories
   * @returns {Promise<Array<Object>>}
   */
  async getCategories() {
    try {
      if (this._categoriesCache) {
        return this._categoriesCache;
      }
      const allCategories = [
        ...MOCK_BASE_CATEGORIES,
        ...MOCK_EXPANDED_CATEGORIES,
      ];
      this._categoriesCache = allCategories;
      return allCategories;
    } catch (error) {
      console.error('[CategoryService] getCategories error:', error);
      return [...MOCK_BASE_CATEGORIES];
    }
  }

  /**
   * Synchronous accessor for category list
   * @returns {Array<Object>}
   */
  getCategoriesSync() {
    try {
      return [...MOCK_BASE_CATEGORIES, ...MOCK_EXPANDED_CATEGORIES];
    } catch (error) {
      console.warn('[CategoryService] getCategoriesSync error:', error);
      return [];
    }
  }

  /**
   * Retrieves subcategories for a specified category
   * @param {string} categoryName
   * @returns {Array<Object>}
   */
  getSubcategories(categoryName) {
    try {
      if (!categoryName) return [];
      if (this._subcategoriesCache.has(categoryName)) {
        return this._subcategoriesCache.get(categoryName);
      }
      const subcats = CATEGORY_SUBCATEGORIES[categoryName] || CATEGORY_SUBCATEGORIES.Electronics || [];
      this._subcategoriesCache.set(categoryName, subcats);
      return subcats;
    } catch (error) {
      console.error('[CategoryService] getSubcategories error:', error);
      return [];
    }
  }

  /**
   * Retrieves available brand options for a category
   * @param {string} categoryName
   * @returns {Array<string>}
   */
  getBrands(categoryName) {
    try {
      return BRAND_OPTIONS[categoryName] || BRAND_OPTIONS.Electronics || ['All'];
    } catch (error) {
      console.warn('[CategoryService] getBrands error:', error);
      return ['All'];
    }
  }

  /**
   * Retrieves all global filter configurations
   * @param {string} categoryName
   * @returns {Object}
   */
  getFilterOptions(categoryName) {
    try {
      return {
        sortOptions: SORT_OPTIONS,
        conditionOptions: CONDITION_OPTIONS,
        priceRanges: PRICE_RANGES,
        locationOptions: LOCATION_OPTIONS,
        brands: this.getBrands(categoryName),
      };
    } catch (error) {
      console.error('[CategoryService] getFilterOptions error:', error);
      return {
        sortOptions: [],
        conditionOptions: [],
        priceRanges: [],
        locationOptions: [],
        brands: ['All'],
      };
    }
  }

  /**
   * Clear in-memory caches (e.g. after network refresh or user logout)
   */
  clearCache() {
    this._categoriesCache = null;
    this._subcategoriesCache.clear();
  }
}

export default new CategoryService();
