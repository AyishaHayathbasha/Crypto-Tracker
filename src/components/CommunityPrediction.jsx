import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';

export default function CommunityPrediction({ prediction }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{prediction.user}</Text>
        <Text style={styles.timeframe}>{prediction.timeframe}</Text>
      </View>
      
      <Text style={styles.predictionText}>
        Predicts {prediction.coin} will reach ${prediction.prediction.toLocaleString()}
      </Text>
      
      <View style={styles.votesContainer}>
        <Users size={14} color="#3b82f6" />
        <Text style={styles.votes}>{prediction.votes} votes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  username: {
    color: '#f1f5f9',
    fontWeight: '600'
  },
  timeframe: {
    color: '#94a3b8',
    fontSize: 12
  },
  predictionText: {
    color: '#94a3b8',
    marginBottom: 8
  },
  votesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  votes: {
    color: '#3b82f6',
    fontSize: 12
  }
});