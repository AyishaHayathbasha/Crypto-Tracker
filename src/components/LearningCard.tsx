import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";
import { Lesson } from "../data/lessons";

interface LearningCardProps {
  lesson: Lesson;
  onPress: (lesson: Lesson) => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({ lesson, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(lesson)}>
      <View style={styles.icon}>
        {lesson.progress?.completed ? (
          <CheckCircle color="#22c55e" size={24} />
        ) : (
          <Circle color="#64748b" size={24} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 4,
  },
});