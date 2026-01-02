import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../store/slices/authSlice';
import { Eye, EyeOff, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector(state => state.auth);

  const handleAuth = async () => {
    try {
      if (authMode === 'login') {
        await dispatch(signIn({ email, password })).unwrap();
      } else {
        await dispatch(signUp({ email, password, username })).unwrap();
      }
      router.push('/dashboard');
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <TrendingUp size={40} color="#fff" />
        </View>
        <Text style={styles.title}>CryptoTracker</Text>
        <Text style={styles.subtitle}>AI-Powered Crypto Intelligence</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, authMode === 'login' && styles.activeTab]}
            onPress={() => setAuthMode('login')}
          >
            <Text style={[styles.tabText, authMode === 'login' && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, authMode === 'signup' && styles.activeTab]}
            onPress={() => setAuthMode('signup')}
          >
            <Text style={[styles.tabText, authMode === 'signup' && styles.activeTabText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {authMode === 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#94a3b8" />}
          </TouchableOpacity>
        </View>

        {error && (
          <Text style={styles.errorText}>
            {typeof error === 'string' ? error : error.message || JSON.stringify(error)}
          </Text>
        )}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : authMode === 'login' ? 'Login' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#f1f5f9', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8' },
  formContainer: { backgroundColor: '#1e293b', borderRadius: 16, padding: 24 },
  tabContainer: { flexDirection: 'row', marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#3b82f6' },
  tabText: { textAlign: 'center', color: '#94a3b8', fontWeight: '600' },
  activeTabText: { color: '#3b82f6' },
  input: { backgroundColor: '#0f172a', color: '#f1f5f9', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  passwordContainer: { position: 'relative', marginBottom: 16 },
  passwordInput: { backgroundColor: '#0f172a', color: '#f1f5f9', padding: 16, paddingRight: 50, borderRadius: 12, fontSize: 16 },
  eyeIcon: { position: 'absolute', right: 16, top: 16 },
  errorText: { color: '#ef4444', marginBottom: 16, textAlign: 'center' },
  button: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
