import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: true,
    notifications: {
      priceAlerts: true,
      predictions: true,
      news: true
    },
    currency: 'USD',
    language: 'en'
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    updateNotificationSettings: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});

export const { 
  toggleDarkMode, 
  updateNotificationSettings, 
  setCurrency, 
  setLanguage 
} = settingsSlice.actions;

export default settingsSlice.reducer;