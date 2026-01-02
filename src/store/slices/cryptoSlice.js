import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CryptoAPI } from '../../services/CryptoAPI';
import { MLPredictionService } from '../../services/MLPredictionService';
import { SentimentAPI } from '../../services/SentimentAPI';

export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async () => {
    return await CryptoAPI.fetchPrices();
  }
);

export const fetchCoinDetails = createAsyncThunk(
  'crypto/fetchCoinDetails',
  async (coinId) => {
    const [details, historical, prediction, sentiment] = await Promise.all([
      CryptoAPI.fetchCoinDetails(coinId),
      CryptoAPI.fetchHistoricalData(coinId),
      MLPredictionService.predictPrice(coinId),
      SentimentAPI.analyzeSentiment(coinId)
    ]);
    
    return { details, historical, prediction, sentiment };
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    coins: [],
    selectedCoin: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedCoin: (state) => {
      state.selectedCoin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.selectedCoin = action.payload;
      });
  }
});

export const { clearSelectedCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;