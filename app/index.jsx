import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import AuthScreen from "../src/screens/AuthScreen";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <AuthScreen />
    </View>
  );
}
