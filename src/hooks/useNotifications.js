import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { FirebaseService } from '../services/FirebaseService';

export function useNotifications() {
  useEffect(() => {
    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
      })
    });
    
    // Request permissions and get token
    const registerForPushNotifications = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      const token = await FirebaseService.requestNotificationPermission();
      console.log('Push notification token:', token);
    };
    
    registerForPushNotifications();
  }, []);
  
  const sendPriceAlert = async (coin, price) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${coin.symbol} Price Alert`,
        body: `${coin.name} has reached $${price.toLocaleString()}`,
        data: { coinId: coin.id }
      },
      trigger: null // Send immediately
    });
  };
  
  const sendPredictionAlert = async (coin, prediction) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${coin.symbol} Prediction Update`,
        body: `AI predicts ${coin.name} will reach $${prediction.toFixed(2)} in 24h`,
        data: { coinId: coin.id }
      },
      trigger: null
    });
  };
  
  return { sendPriceAlert, sendPredictionAlert };
}
