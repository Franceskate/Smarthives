import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function PasswordResetScreen() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Check your email for reset instructions");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Enter your email to reset password</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} value={email} onChangeText={setEmail} />
      <Button title="Send Reset Email" onPress={handleReset} />
    </View>
  );
}
