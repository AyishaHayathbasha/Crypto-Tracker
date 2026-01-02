import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();

  // Example progress (you can dynamically update from AsyncStorage or props later)
  const completed = 3;
  const total = 10;
  const progress = completed / total;
  const xp = 120;
  const badge = xp >= 150 ? "Crypto Master" : xp >= 50 ? "Blockchain Pro" : "Rookie";

  // Animated circular progress
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  useEffect(() => {
    animatedValue.addListener((v) => {
      const strokeDashoffset = circumference - circumference * v.value;
      if (circleRef.current) {
        circleRef.current.setNativeProps({ strokeDashoffset });
      }
    });
    return () => animatedValue.removeAllListeners();
  }, []);

  const handleLearningModePress = () => {
    navigation.navigate("LearningScreen", {
      title: "Understanding Market Cap",
      completed,
      total,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>👋 Welcome back</Text>

      <View style={styles.progressContainer}>
        <Svg width={150} height={150}>
          <Circle
            stroke="#1E293B"
            fill="none"
            cx={75}
            cy={75}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={circleRef}
            stroke="#22c55e"
            fill="none"
            cx={75}
            cy={75}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressPercent}>{(progress * 100).toFixed(0)}%</Text>
          <Text style={styles.progressLabel}>Progress</Text>
        </View>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statTitle}>🏅 Badge</Text>
        <Text style={styles.statValue}>{badge}</Text>
        <Text style={styles.statTitle}>⚡ XP</Text>
        <Text style={styles.statValue}>{xp}</Text>
      </View>

      <TouchableOpacity
        style={styles.learningBox}
        onPress={handleLearningModePress}
        activeOpacity={0.85}
      >
        <Text style={styles.learningTitle}>Learning Mode 🎓</Text>
        <Text style={styles.learningSubtitle}>Understanding Market Cap</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.progressText}>
          {completed}/{total} lessons completed
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0E1A",
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  welcome: {
    fontSize: 22,
    color: "white",
    fontWeight: "700",
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercent: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  progressLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },
  statsBox: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  statTitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 4,
  },
    statValue: {
    color: "#3b82f6",
    fontSize: 20,
    fontWeight: "bold",
  },
  learningBox: {
    backgroundColor: "#131c2e",
    padding: 20,
    borderRadius: 16,
    width: "90%",
  },
  learningTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  learningSubtitle: {
    color: "#9aa0b1",
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#2a3245",
    borderRadius: 4,
    width: "100%",
    marginVertical: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 4,
  },
  progressText: {
    color: "#9aa0b1",
    fontSize: 13,
  },
});