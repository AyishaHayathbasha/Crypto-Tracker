import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addHolding } from '../store/slices/portfolioSlice';
import { X } from 'lucide-react-native';

export default function AddPortfolioModal({ visible, onClose, coin }) {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  
  const handleAdd = () => {
    if (!amount || !coin) return;
    
    dispatch(addHolding({
      ...coin,
      amount: parseFloat(amount)
    }));
    
    setAmount('');
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#94a3b8" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Add to Portfolio</Text>
          <Text style={styles.subtitle}>
            How much {coin?.symbol} do you own?
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#94a3b8"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add to Portfolio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modal: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 16
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})