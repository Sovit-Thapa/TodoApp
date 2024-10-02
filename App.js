import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Switch,
  Alert,
} from 'react-native';
import styles from './styles'; // Importing the styles

const App = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      status: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Todo Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        multiline // Enable multiple lines
        numberOfLines={2} // Set the number of lines
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          taskTitle.trim() ? styles.addButtonActive : styles.addButtonInactive,
        ]}
        onPress={addTask}
        disabled={!taskTitle.trim()}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {tasks.length > 0 && <Text style={styles.taskListTitle}>Your Tasks</Text>}
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskDetails}>
              <Text style={[styles.taskTitle, item.status && styles.done]}>
                Title: {item.title}
              </Text>
              <Text style={styles.taskStatus}>
                Status: {item.status ? 'Done' : 'Due'}
              </Text>
            </View>
            <View style={styles.taskActions}>
              <Switch
                value={item.status}
                onValueChange={() => toggleTaskStatus(item.id)}
              />
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
