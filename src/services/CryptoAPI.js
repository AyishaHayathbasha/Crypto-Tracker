export const CryptoAPI = {
  // 🔹 Fetch current prices for top cryptocurrencies
  fetchPrices: async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
        {
          headers: {
            accept: 'application/json',
            // optional but good practice
            'User-Agent': 'MyCryptoApp/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Format response to match your mock data shape
      return data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap
      }));
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      throw error;
    }
  },

  // 🔹 Fetch historical price data for charts
  fetchHistoricalData: async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`,
        {
          headers: {
            accept: 'application/json',
            'User-Agent': 'MyCryptoApp/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Format into objects with readable dates and price/volume
      return data.prices.map((item, index) => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1],
        volume: data.total_volumes[index] ? data.total_volumes[index][1] : 0
      }));
    } catch (error) {
      console.error(`Error fetching historical data for ${coinId}:`, error);
      throw error;
    }
  },

  // 🔹 Get detailed coin info
  fetchCoinDetails: async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          headers: {
            accept: 'application/json',
            'User-Agent': 'MyCryptoApp/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        description: data.description?.en || '',
        image: data.image?.large || '',
        homepage: data.links?.homepage?.[0] || '',
        marketCapRank: data.market_cap_rank,
        currentPrice: data.market_data?.current_price?.usd || 0
      };
    } catch (error) {
      console.error(`Error fetching coin details for ${coinId}:`, error);
      throw error;
    }
  }
};
