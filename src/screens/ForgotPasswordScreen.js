import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Password reset email sent!");
  };

  return (
    <View style={styles.container}>
      <Text>Enter your email to reset password</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Send Reset Link" onPress={handleReset} />
      <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
});
ssss