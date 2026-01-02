import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    holdings: [],
    favorites: [],
    alerts: []
  },
  reducers: {
    addHolding: (state, action) => {
      state.holdings.push(action.payload);
    },
    removeHolding: (state, action) => {
      state.holdings = state.holdings.filter(h => h.id !== action.payload);
    },
    updateHolding: (state, action) => {
      const index = state.holdings.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.holdings[index] = { ...state.holdings[index], ...action.payload };
      }
    },
    toggleFavorite: (state, action) => {
      const index = state.favorites.indexOf(action.payload);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    }
  }
});

export const { 
  addHolding, 
  removeHolding, 
  updateHolding, 
  toggleFavorite, 
  addAlert, 
  removeAlert 
} = portfolioSlice.actions;

export default portfolioSlice.reducer;