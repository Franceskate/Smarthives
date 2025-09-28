import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert("Signup Failed", error.message);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Email</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
