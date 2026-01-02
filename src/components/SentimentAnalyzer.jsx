import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SentimentAnalyzer({ sentiment }) {
  if (!sentiment) return null;
  
  const getSentimentColor = (label) => {
    switch (label) {
      case 'Positive': return '#10b981';
      case 'Neutral': return '#f59e0b';
      case 'Negative': return '#ef4444';
      default: return '#94a3b8';
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Sentiment 📊</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{sentiment.score.toFixed(0)}</Text>
        <Text style={[
          styles.label,
          { color: getSentimentColor(sentiment.label) }
        ]}>
          {sentiment.label}
        </Text>
      </View>
      
      <View style={styles.sourcesContainer}>
        <Text style={styles.sourcesTitle}>Sources:</Text>
        {Object.entries(sentiment.sources).map(([source, score]) => (
          <View key={source} style={styles.sourceRow}>
            <View style={styles.sourceHeader}>
              <Text style={styles.sourceName}>
                {source.charAt(0).toUpperCase() + source.slice(1)}
              </Text>
              <Text style={styles.sourceScore}>{score.toFixed(0)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${score}%` }]} 
              />
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.keywordsContainer}>
        <Text style={styles.sourcesTitle}>Trending Keywords:</Text>
        <View style={styles.keywordsList}>
          {sentiment.keywords.map((keyword, idx) => (
            <View key={idx} style={styles.keyword}>
              <Text style={styles.keywordText}>#{keyword}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 0,
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
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8
  },
  sourcesContainer: {
    marginBottom: 16
  },
  sourcesTitle: {
    color: '#94a3b8',
    marginBottom: 12,
    fontSize: 14
  },
  sourceRow: {
    marginBottom: 12
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  sourceName: {
    color: '#f1f5f9'
  },
  sourceScore: {
    color: '#94a3b8'
  },
  progressBar: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6'
  },
  keywordsContainer: {
    marginTop: 16
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  keyword: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  keywordText: {
    color: '#f1f5f9',
    fontSize: 14
  }
});

