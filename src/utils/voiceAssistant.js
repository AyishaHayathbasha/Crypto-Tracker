export const VoiceAssistant = {
  // Initialize speech recognition
  initialize: () => {
    // For React Native, use expo-speech or react-native-voice
    // For web, use Web Speech API
    
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      return recognition;
    }
    return null;
  },
  
  // Process voice command
  processCommand: async (transcript) => {
    const command = transcript.toLowerCase();
    
    // Price queries
    if (command.includes('price of') || command.includes('what is')) {
      const coinMatch = command.match(/bitcoin|ethereum|cardano|solana|ripple/i);
      if (coinMatch) {
        return {
          action: 'get_price',
          coin: coinMatch[0],
          response: `Fetching ${coinMatch[0]} price...`
        };
      }
    }
    
    // Prediction queries
    if (command.includes('predict') || command.includes('forecast')) {
      const coinMatch = command.match(/bitcoin|ethereum|cardano|solana|ripple/i);
      if (coinMatch) {
        return {
          action: 'get_prediction',
          coin: coinMatch[0],
          response: `Getting ${coinMatch[0]} prediction...`
        };
      }
    }
    
    // Portfolio queries
    if (command.includes('portfolio') || command.includes('holdings')) {
      return {
        action: 'show_portfolio',
        response: 'Opening your portfolio...'
      };
    }
    
    return {
      action: 'unknown',
      response: 'Sorry, I didn\'t understand that command.'
    };
  },
  
  // Text-to-speech response
  speak: (text) => {
    // For React Native, use expo-speech
    // For web, use Web Speech API
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
};