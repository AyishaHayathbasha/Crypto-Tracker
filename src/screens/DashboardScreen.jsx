// app/DashboardScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import LearningProgress from "../components/LearningProgress";
import RiskScanner from "../components/RiskScanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MessageCircle } from "lucide-react-native";
import { handleChat } from "../services/chatbot";
import LearningModule from "./LearningModule";


export default function DashboardScreen() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const holdings = useSelector((state) => state.portfolio.holdings);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // 🔹 Chatbot states
  const [messages, setMessages] = useState([{ from: "bot", text: "Hello! Ask any crypto price…" }]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  // 🔹 Keyboard height for moving chat above keyboard
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height + 20);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Load favorites
  useEffect(() => {
    AsyncStorage.getItem("favorites").then((saved) => {
      if (saved) setFavorites(JSON.parse(saved));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch initial 20 coins
  useEffect(() => {
    const socket = io("http://10.91.234.6:3000", { transports: ["websocket"] });

    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.log("⚠️ Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    socket.on("connect", () => console.log("✅ Socket Connected!"));
    socket.on("disconnect", () => console.log("❌ Socket Disconnected!"));
    socket.on("crypto", (cryptodata) => {
      if (Array.isArray(cryptodata)) {
        const validData = cryptodata.filter((c) => c?.id);
        setData(validData.slice(0, 20));
      }
    });

    return () => socket.disconnect();
  }, []);

  const toggleFavorite = (coinId) => {
    setFavorites((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]
    );
  };

  const formatPrice = (price) => {
    if (price === undefined) return "N/A";
    if (price >= 1) return `$${price.toLocaleString()}`;
    return `$${price.toFixed(3)}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/coin/${item.id}`)} style={styles.item}>
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.coinIcon} />
          ) : (
            <Text style={{ color: "#94A3B8", fontSize: 12 }}>N/A</Text>
          )}
        </View>
        <View>
          <Text style={styles.title}>{item.name ?? "Unknown"}</Text>
          <Text style={styles.symbol}>{item.symbol?.toUpperCase() ?? "N/A"}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>{formatPrice(item.current_price)}</Text>
        <Text
          style={[
            styles.change,
            { color: item.price_change_percentage_24h >= 0 ? "#3FBF6B" : "#E65A5A" },
          ]}
        >
          {item.price_change_percentage_24h
            ? `${item.price_change_percentage_24h >= 0 ? "▲" : "▼"} ${Math.abs(
                item.price_change_percentage_24h
              ).toFixed(2)}%`
            : "N/A"}
        </Text>
      </View>

      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.starIcon}>
        <Ionicons
          name={favorites.includes(item.id) ? "star" : "star-outline"}
          size={22}
          color={favorites.includes(item.id) ? "#FACC15" : "#94A3B8"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // 🔹 Send chatbot message
  const send = async () => {
    if (!input.trim()) return;

    const message = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setInput("");
    Keyboard.dismiss();

    const reply = await handleChat(message);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Animate chatbot window
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showChat ? 1 : 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [showChat]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  // ✅ Moved inside component
  const handleLearningPress = () => {
    router.push({
      pathname: "/learning",
      params: {
        title: "Crypto Basics",
        completed: 2,
        total: 8,
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color="#3FBF6B" />
        <Text style={{ color: "#E2E8F0", marginTop: 10 }}>Loading data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <View>
                  <Text style={styles.welcomeText}>Welcome back, {user?.name}</Text>
                  <Text style={styles.subtitleText}>
                    Your crypto intelligence dashboard
                  </Text>
                </View>
              </View>

              <LearningProgress onOpenLearning={handleLearningPress} />
              {holdings?.length > 0 && <RiskScanner holdings={holdings} />}

              <View style={styles.coinListHeader}>
                <Text style={styles.headerTitle}>Top Cryptocurrencies</Text>
                <TouchableOpacity onPress={() => console.log("🔄 Refresh requested")}>
                  <Text style={styles.refresh}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
        />

        {/* 🧠 Chatbot */}
        <Animated.View
          pointerEvents={showChat ? "auto" : "none"}
          style={[
            styles.chatContainer,
            {
              transform: [{ translateY }],
              opacity: slideAnim,
              bottom: keyboardHeight > 0 ? keyboardHeight : 20,
            },
          ]}
        >
          <KeyboardAwareScrollView
            ref={scrollRef}
            extraScrollHeight={Platform.OS === "ios" ? 90 : 40}
            enableOnAndroid={true}
            keyboardOpeningTime={0}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
            onKeyboardWillShow={() => scrollRef.current?.scrollToEnd({ animated: true })}
            onKeyboardDidShow={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.msgBubble,
                  msg.from === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.message}>{msg.text}</Text>
              </View>
            ))}
          </KeyboardAwareScrollView>

          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              placeholder="Ask something..."
              placeholderTextColor="#aaa"
              style={styles.input}
              onSubmitEditing={send}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={send}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.chatbot}
          onPress={() => {
            setShowChat((p) => !p);
            Keyboard.dismiss();
          }}
        >
          <MessageCircle size={20} color="#fff" />
          <Text style={styles.chatbotText}>{showChat ? "Close Chat" : "Chat with AI"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// ---------------------------------------------
// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "#f1f5f9" },
  subtitleText: { color: "#94a3b8", marginTop: 4 },
  coinListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerTitle: { color: "#E2E8F0", fontSize: 18, fontWeight: "700" },
  refresh: { color: "#22C55E", fontSize: 14, fontWeight: "500" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  leftSection: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  coinIcon: { width: 28, height: 28, borderRadius: 14 },
  title: { fontSize: 16, fontWeight: "600", color: "#F8FAFC", flexShrink: 1, flexWrap: "wrap" },
  symbol: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  starIcon: { padding: 6, marginLeft: 10 },
  rightSection: { minWidth: 100, alignItems: "flex-end", justifyContent: "center", paddingRight: 8 },
  price: { fontSize: 16, fontWeight: "700", color: "#F1F5F9", textAlign: "right" },
  change: { fontSize: 13, fontWeight: "600", marginTop: 4, textAlign: "right" },
  chatbot: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  chatbotText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
  chatContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  msgBubble: {
    maxWidth: "90%",
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  userBubble: { backgroundColor: "#3b82f6", marginLeft: "auto" },
  botBubble: { backgroundColor: "#475569", marginRight: "auto" },
  message: { color: "#fff" },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  input: {
    flex: 1,
    backgroundColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
  },
  sendBtn: { padding: 10, backgroundColor: "#3b82f6", borderRadius: 8, marginLeft: 8 },
});
