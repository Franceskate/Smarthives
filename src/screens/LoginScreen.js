import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert("Login Failed", error.message);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Email</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate("PasswordReset")} />
    </View>
  );
}
