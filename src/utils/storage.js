import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  // Save data
  saveData: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },
  
  // Get data
  getData: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  },
  
  // Remove data
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },
  
  // Clear all data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
  
  // Cache management
  cacheData: async (key, data, expiryMinutes = 5) => {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiry: expiryMinutes * 60 * 1000
    };
    await Storage.saveData(key, cacheItem);
  },
  
  getCachedData: async (key) => {
    const cacheItem = await Storage.getData(key);
    if (!cacheItem) return null;
    
    const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiry;
    if (isExpired) {
      await Storage.removeData(key);
      return null;
    }
    
    return cacheItem.data;
  }
};