import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { supabase } from "../supabase";

export default function TaskFeedScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error) setTasks(data);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.category}</Text>
      <Button title="View" onPress={() => navigation.navigate("TaskDetails", { task: item })} />
    </View>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 10, borderWidth: 1, borderRadius: 8 },
  title: { fontWeight: "bold", fontSize: 16 },
});
