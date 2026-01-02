import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';

export default function LearningProgress({ onOpenLearning }) {
  const progress = {
    completed: 3,
    total: 10,
    currentLesson: 'Understanding Market Cap',
  };

  const percentage = (progress.completed / progress.total) * 100;

  return (
    <TouchableOpacity style={styles.container} onPress={onOpenLearning} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Learning Module</Text>
          <Text style={styles.subtitle}>{progress.currentLesson}</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          </View>

          <Text style={styles.progressText}>
            {progress.completed}/{progress.total} lessons completed
          </Text>
        </View>
        <BookOpen size={32} color="#3b82f6" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 10,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});