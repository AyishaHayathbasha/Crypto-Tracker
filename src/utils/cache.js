import { Storage } from './storage';

const CACHE_KEYS = {
  COINS: 'cached_coins',
  FAVORITES: 'cached_favorites',
  PORTFOLIO: 'cached_portfolio',
  USER_PREFERENCES: 'user_preferences'
};

const CACHE_EXPIRY = {
  COINS: 5 * 60 * 1000, // 5 minutes
  FAVORITES: 24 * 60 * 60 * 1000, // 24 hours
  PORTFOLIO: 24 * 60 * 60 * 1000 // 24 hours
};

export const CacheManager = {
  // Cache coin data
  cacheCoins: async (coins) => {
    await Storage.cacheData(CACHE_KEYS.COINS, coins, CACHE_EXPIRY.COINS / 60000);
  },
  
  getCachedCoins: async () => {
    return await Storage.getCachedData(CACHE_KEYS.COINS);
  },
  
  // Cache favorites
  cacheFavorites: async (favorites) => {
    await Storage.saveData(CACHE_KEYS.FAVORITES, favorites);
  },
  
  getCachedFavorites: async () => {
    return await Storage.getData(CACHE_KEYS.FAVORITES) || [];
  },
  
  // Cache portfolio
  cachePortfolio: async (portfolio) => {
    await Storage.saveData(CACHE_KEYS.PORTFOLIO, portfolio);
  },
  
  getCachedPortfolio: async () => {
    return await Storage.getData(CACHE_KEYS.PORTFOLIO) || [];
  },
  
  // User preferences
  savePreferences: async (preferences) => {
    await Storage.saveData(CACHE_KEYS.USER_PREFERENCES, preferences);
  },
  
  getPreferences: async () => {
    return await Storage.getData(CACHE_KEYS.USER_PREFERENCES);
  },
  
  // Clear all cache
  clearCache: async () => {
    await Storage.clearAll();
  }
};
