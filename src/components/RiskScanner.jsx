import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RiskAnalyzer } from '../utils/riskAnalyzer';
import { AlertCircle } from 'lucide-react-native';

export default function RiskScanner({ holdings }) {
  if (!holdings || holdings.length === 0) return null;
  
  const risk = RiskAnalyzer.calculateRisk(holdings);
  
  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#94a3b8';
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Risk Analysis 📊</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Risk Level</Text>
        <Text style={[styles.value, { color: getRiskColor(risk.level) }]}>
          {risk.level}
        </Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Diversification</Text>
        <Text style={styles.value}>{risk.diversification}</Text>
      </View>
      
      <View style={styles.recommendationBox}>
        <AlertCircle size={16} color="#94a3b8" />
        <Text style={styles.recommendation}>
          💡 {risk.recommendation}
        </Text>
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
  recommendationBox: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  recommendation: {
    color: '#94a3b8',
    fontSize: 12,
    flex: 1
  }
});
