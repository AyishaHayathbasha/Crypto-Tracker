import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { toggleDarkMode } from '../store/slices/settingsSlice';
import { User, Bell, Moon, Sun } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.settings);
  const { holdings } = useSelector(state => state.portfolio);
  
  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>
      
      {/* Account Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        <View style={styles.accountInfo}>
          <View style={styles.avatar}>
            <User size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.accountName}>{user?.name}</Text>
            <Text style={styles.accountEmail}>{user?.email}</Text>
          </View>
        </View>
      </View>
      
      {/* Notifications Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Price Alerts</Text>
            <Text style={styles.settingDescription}>
              Get notified of major price changes
            </Text>
          </View>
          <Switch value={true} />
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Predictions</Text>
            <Text style={styles.settingDescription}>
              Daily AI prediction summaries
            </Text>
          </View>
          <Switch value={true} />
        </View>
      </View>
      
      {/* Appearance Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <TouchableOpacity onPress={() => dispatch(toggleDarkMode())}>
            {darkMode ? (
              <Moon size={20} color="#3b82f6" />
            ) : (
              <Sun size={20} color="#3b82f6" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Portfolio Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Portfolio</Text>
        {holdings.length === 0 ? (
          <Text style={styles.emptyText}>No coins in portfolio</Text>
        ) : (
          holdings.map((coin, idx) => (
            <View key={idx} style={styles.portfolioItem}>
              <View>
                <Text style={styles.portfolioName}>{coin.name}</Text>
                <Text style={styles.portfolioAmount}>
                  {coin.amount} {coin.symbol}
                </Text>
              </View>
              <Text style={styles.portfolioValue}>
                ${(coin.price * coin.amount).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>
      
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  backButton: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9'
  },
  card: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  accountName: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 16
  },
  accountEmail: {
    color: '#94a3b8',
    fontSize: 14
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  settingInfo: {
    flex: 1
  },
  settingLabel: {
    color: '#f1f5f9',
    fontWeight: '600',
    marginBottom: 4
  },
  settingDescription: {
    color: '#94a3b8',
    fontSize: 12
  },
  emptyText: {
    color: '#94a3b8'
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  portfolioName: {
    color: '#f1f5f9',
    fontWeight: '600'
  },
  portfolioAmount: {
    color: '#94a3b8',
    fontSize: 12
  },
  portfolioValue: {
    color: '#f1f5f9',
    fontWeight: '600'
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center'
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});