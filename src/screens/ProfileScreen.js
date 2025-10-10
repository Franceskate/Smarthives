import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    skills: "",
    location: "",
  });

  // Load profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase.from("profiles").select("*").single();
    if (error) Alert.alert("Error", error.message);
    else setProfile(data);
  };

  const handleSave = async () => {
    const { error } = await supabase.from("profiles").update(profile).eq("id", profile.id);
    if (error) Alert.alert("Update failed", error.message);
    else Alert.alert("Success", "Profile updated!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TextInput placeholder="Name" value={profile.name} onChangeText={(v) => setProfile({ ...profile, name: v })} style={styles.input} />
      <TextInput placeholder="Bio" value={profile.bio} onChangeText={(v) => setProfile({ ...profile, bio: v })} style={styles.input} />
      <TextInput placeholder="Skills" value={profile.skills} onChangeText={(v) => setProfile({ ...profile, skills: v })} style={styles.input} />
      <TextInput placeholder="Location" value={profile.location} onChangeText={(v) => setProfile({ ...profile, location: v })} style={styles.input} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
});
