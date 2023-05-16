import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTodoItem = () => {
    if (inputText.trim() !== '') {
      setTodoList([...todoList, inputText]);
      setInputText('');
    }
  };

  const deleteTodoItem = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Add a task..."
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodoItem}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        {todoList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.todoItem}
            onPress={() => deleteTodoItem(index)}
          >
            <Text style={styles.todoItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    justifyContent: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  todoItemText: {
    fontSize: 16,
  },
});