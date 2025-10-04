import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName.trim()) return Alert.alert("Validation", "Please enter your full name.");
    if (!email.includes("@")) return Alert.alert("Validation", "Please enter a valid email.");
    if (password.length < 8) return Alert.alert("Validation", "Password must be at least 8 characters.");
    if (password !== confirm) return Alert.alert("Validation", "Passwords do not match.");

    setLoading(true);
    try {
      await signUp({ email, password, full_name: fullName });
      Alert.alert("Success", "Account created. Check your email if verification is required.");
    
    } catch (err) {
      Alert.alert("Signup failed", err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Full name" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry style={styles.input} />

      <Button title={loading ? "Creating..." : "Sign up"} onPress={handleSignup} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      <View style={{ marginTop: 12 }}>
        <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
});
