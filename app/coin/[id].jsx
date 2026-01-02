// app/coin/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import CoinChart from "@/components/CoinChart";
import LiveCoinChart from "@/components/LiveCoinChart";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coin: ${response.status}`);
        }

        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCoinData();
  }, [id]);

  // --- Loading state ---
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0f0" />
        <Text style={{ color: "#ccc", marginTop: 10 }}>Loading {id}...</Text>
      </View>
    );

  // --- If no data or missing fields ---
  if (!coinData || !coinData.market_data) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Unable to load coin data.</Text>
      </View>
    );
  }

  const priceUsd = coinData?.market_data?.current_price?.usd ?? "N/A";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 50 }}
        nestedScrollEnabled
      >
        <Text style={styles.title}>{coinData.name}</Text>
        <Text style={styles.price}>💰 ${priceUsd.toLocaleString()}</Text>

        {/* Chart Component */}
        {coinData.market_data.sparkline_7d?.price ? (
          <CoinChart sparkline={coinData.market_data.sparkline_7d.price} />
        ) : (
          <Text style={{ color: "#888", marginTop: 10 }}>
            No sparkline data available.
          </Text>
        )}

        {/* ✅ Live Coin Chart */}
        <View style={{ marginTop: 20 }}>
          <LiveCoinChart />
        </View>

        <Text style={styles.description}>
          {coinData.description?.en
            ? coinData.description.en.split(". ")[0] + "."
            : "No description available."}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f172a" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  price: { fontSize: 22, color: "#0f0", marginBottom: 20 },
  description: {
    color: "#aaa",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
});
