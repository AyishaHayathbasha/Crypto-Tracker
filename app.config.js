export default {
  expo: {
    name: "CryptoTracker",
    slug: "crypto-tracker",

    icon: "./assets/images/icon2.png",

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon2.png",
        backgroundColor: "#ffffff",
      },
    },

    extra: {
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket:
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId:
        process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
};
