import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Search, ChevronDown } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";



const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("Market Cap");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch crypto data (CoinGecko public API)
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setFilteredCoins(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  // Search logic
  useEffect(() => {
    const results = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoins(results);
  }, [searchQuery, coins]);

  // Sorting filters
  const handleFilter = (type) => {
    let sorted = [...filteredCoins];
    switch (type) {
      case "Price":
        sorted.sort((a, b) => b.current_price - a.current_price);
        break;
      case "24h Change":
        sorted.sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        break;
      default:
        sorted.sort((a, b) => b.market_cap - a.market_cap);
    }
    setFilteredCoins(sorted);
    setFilterType(type);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Search Cryptocurrencies</Text>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Search size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <ChevronDown size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {showFilters && (
        <View style={styles.filterContainer}>
          {["Market Cap", "Price", "24h Change"].map((type) => (
            <TouchableOpacity key={type} onPress={() => handleFilter(type)}>
              <Text
                style={[
                  styles.filterOption,
                  filterType === type && styles.activeFilter,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* List of Coins */}
      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.coinCard}>
            <View>
              <Text style={styles.coinName}>{item.name}</Text>
              <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
<Text style={styles.coinPrice}>
  ${item?.current_price != null ? item.current_price.toFixed(2) : "0.00"}
</Text>
              <Text
                style={[
                  styles.changeText,
                  {
                    color:
                      item.price_change_percentage_24h >= 0
                        ? "#22C55E"
                        : "#EF4444",
                  },
                ]}
              >
{(item?.price_change_percentage_24h ?? 0).toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // deep navy blue background
    paddingHorizontal: 16,
    paddingTop: 20,
      paddingTop: Platform.OS === "android" ? 40 : 0,  // 👈 add this only

  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    color: "#E2E8F0",
  },
  filterContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 6,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: "#CBD5E1",
    fontSize: 15,
  },
  activeFilter: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  coinCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  coinName: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
  },
  coinSymbol: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 2,
  },
  coinPrice: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
  },
  changeText: {
    fontSize: 13,
    marginTop: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
});