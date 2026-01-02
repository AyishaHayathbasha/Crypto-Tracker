import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user?.username || "—"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email || "—"}</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 20,
  },

  profileCard: {
    width: "90%",
    backgroundColor: "#1e293b",   // SAME as AuthScreen formContainer
    padding: 24,
    borderRadius: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f1f5f9",             // matches AuthScreen title color
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    color: "#94a3b8",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
  },

  logoutBtn: {
    backgroundColor: "#3b82f6",   // SAME blue button as login/signup
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
