import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Price Prediction 🤖</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>24h Prediction</Text>
        <Text style={styles.value}>${prediction.prediction24h.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>7d Prediction</Text>
        <Text style={styles.value}>${prediction.prediction7d.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Confidence</Text>
        <Text style={styles.confidence}>
          {(prediction.confidence * 100).toFixed(0)}%
        </Text>
      </View>
      
      <View style={[
        styles.trendBadge,
        { backgroundColor: prediction.trend === 'bullish' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.trendText,
          { color: prediction.trend === 'bullish' ? '#10b981' : '#ef4444' }
        ]}>
          {prediction.trend === 'bullish' ? '🚀 Bullish Trend' : '📉 Bearish Trend'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  label: {
    color: '#94a3b8'
  },
  value: {
    color: '#f1f5f9',
    fontWeight: '600'
  },
  confidence: {
    color: '#3b82f6',
    fontWeight: '600'
  },
  trendBadge: {
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center'
  },
  trendText: {
    fontWeight: '600'
  }
});