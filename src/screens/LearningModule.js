import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

export default function LearningModule() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Pass some default course info
    navigation.navigate("LearningScreen", {
      title: "Understanding Market Cap",
      completed: 3,
      total: 10,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>Learning Module</Text>
      <Text style={styles.subtitle}>Understanding Market Cap</Text>

      <Progress.Bar progress={0.3} width={null} color="#4A90E2" />
      <Text style={styles.lessonText}> 6 lessons </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2F",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },
  lessonText: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 8,
  },
});