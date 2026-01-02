import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function LearningScreen() {
  const [lessons, setLessons] = useState([
    { id: "1", title: "Introduction to Cryptocurrency", completed: false },
    { id: "2", title: "What is Blockchain Technology?", completed: false },
    { id: "3", title: "Understanding Market Capitalization", completed: false },
    { id: "4", title: "How Bitcoin Works", completed: false },
    { id: "5", title: "Basics of Crypto Trading", completed: false },
  ]);

  const handleLessonPress = (id) => {
    setLessons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Learning Mode 🎓</Text>
      <Text style={styles.subText}>Tap each topic to mark as completed</Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.lessonItem,
              item.completed && { backgroundColor: "#2a3245" },
            ]}
            onPress={() => handleLessonPress(item.id)}
          >
            <Text
              style={[
                styles.lessonTitle,
                item.completed && { textDecorationLine: "line-through", color: "#9aa0b1" },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E1A",
    padding: 20,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    color: "#9aa0b1",
    marginBottom: 15,
  },
  lessonItem: {
    backgroundColor: "#131c2e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonTitle: {
    color: "white",
    fontSize: 16,
  },
});