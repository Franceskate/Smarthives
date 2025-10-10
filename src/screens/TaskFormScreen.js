import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { supabase } from "../supabase";

export default function TaskFormScreen() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    required_skills: "",
  });

  const handleSubmit = async () => {
    const { error } = await supabase.from("tasks").insert([task]);
    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Task created!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Task</Text>
      <TextInput placeholder="Title" value={task.title} onChangeText={(v) => setTask({ ...task, title: v })} style={styles.input} />
      <TextInput placeholder="Description" value={task.description} onChangeText={(v) => setTask({ ...task, description: v })} style={styles.input} />
      <TextInput placeholder="Category" value={task.category} onChangeText={(v) => setTask({ ...task, category: v })} style={styles.input} />
      <TextInput placeholder="Required Skills" value={task.required_skills} onChangeText={(v) => setTask({ ...task, required_skills: v })} style={styles.input} />
      <Button title="Post Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
});
