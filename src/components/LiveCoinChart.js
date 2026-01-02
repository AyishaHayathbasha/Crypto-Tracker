import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import io from "socket.io-client";

export default function LiveCoinChart() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io("http://192.168.1.100:3000"); // 👈 change this IP

    socket.on("connect", () => console.log("✅ Connected to server"));
    socket.on("crypto", (data) => {
      console.log("Received data:", data);
      setCoins(data);
      setLoading(false);
    });

    socket.on("disconnect", () => console.log("❌ Disconnected from server"));
    return () => socket.disconnect();
  }, []);

  //if (loading) return <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.coinRow}>
            <Text style={styles.coinName}>{item.name}</Text>
            <Text style={styles.coinPrice}>${item.current_price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 16 },
  title: { fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 10 },
  coinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#333",
  },
  coinName: { color: "#fff", fontSize: 16 },
  coinPrice: { color: "#0f0", fontSize: 16 },
});
