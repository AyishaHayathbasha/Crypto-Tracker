import { useState, useCallback } from 'react';
import { VoiceAssistant } from '../utils/voiceAssistant';
import { useRouter } from 'expo-router';

export function useVoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const router = useRouter();
  
  const startListening = useCallback(() => {
    const recognition = VoiceAssistant.initialize();
    
    if (!recognition) {
      alert('Voice recognition not supported on this device');
      return;
    }
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      
      const result = await VoiceAssistant.processCommand(text);
      
      switch (result.action) {
        case 'get_price':
        case 'get_prediction':
          router.push(`/details/${result.coin}`);
          break;
        case 'show_portfolio':
          router.push('/settings');
          break;
        default:
          VoiceAssistant.speak(result.response);
      }
      
      setIsListening(false);
    };
    
    recognition.onerror = (error) => {
      console.error('Voice recognition error:', error);
      setIsListening(false);
    };
    
    recognition.start();
  }, [router]);
  
  return { isListening, transcript, startListening };
}
