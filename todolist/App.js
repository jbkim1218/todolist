import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tasks, setTasks] = useState({});
  const [task, setTask] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const login = () => {
    if (
      username !== '' &&
      password !== '' &&
      users.find((user) => user.username === username && user.password === password)
    ) {
      const loggedInUser = users.find(
        (user) => user.username === username && user.password === password
      );
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다.');
    }
  };
  const App = () => {
  const handleOpenVideo = async () => {
    return (<View> <iframe width="560" height="315" src="https://www.youtube.com/embed/tHf7tE4XaLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>  </View>)

    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <Button title="영상 재생" onPress={handleOpenVideo} />
     
    </View>
  );
};

  const register = () => {
    if (username === '' || password === '') {
      setErrorMessage('아이디 또는 비밀번호를 설정하지 않았습니다!');
    } else if (users.find((user) => user.username === username)) {
      setErrorMessage('Username already exists.');
    } else {
      const newUser = {
        id: users.length + 1,
        username,
        password,
      };
      setUsers([...users, newUser]);
      setIsRegistering(false);
      setErrorMessage('');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setCurrentUser(null);
  };

  const addTask = () => {
    if (selectedDate && task !== '') {
      const newTasks = { ...tasks };
      if (newTasks[selectedDate]) {
        if (newTasks[selectedDate][currentUser.id]) {
          newTasks[selectedDate][currentUser.id] = [
            ...newTasks[selectedDate][currentUser.id],
            { id: newTasks[selectedDate][currentUser.id].length, task },
          ];
        } else {
          newTasks[selectedDate][currentUser.id] = [{ id: 0, task }];
        }
      } else {
        newTasks[selectedDate] = { [currentUser.id]: [{ id: 0, task }] };
      }
      setTasks(newTasks);
      setTask('');
    } else {
      Alert.alert('Error', 'Select a date and enter a task');
    }
  };

  const deleteTask = (id) => {
    if (selectedDate) {
      const newTasks = { ...tasks };
      if (newTasks[selectedDate] && newTasks[selectedDate][currentUser.id]) {
        newTasks[selectedDate][currentUser.id] = newTasks[selectedDate][currentUser.id].filter(
          (task) => task.id !== id
        );
        if (newTasks[selectedDate][currentUser.id].length === 0) {
          delete newTasks[selectedDate][currentUser.id];
          if (Object.keys(newTasks[selectedDate]).length === 0) {
            delete newTasks[selectedDate];
          }
        }
        setTasks(newTasks);
      }
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
              <Text style={styles.title}>Todo List</Text>
        <Calendar onDayPress={onDayPress} />
        {selectedDate && <Text style={styles.text}>Selected date: {selectedDate}</Text>}
        
        <View style={styles.inputContainer}>
          <TextInput
            value={task}
            onChangeText={setTask}
            placeholder="할일을 추가해 주세요"
            style={styles.input}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

    
        </View>
           <View style={styles.container}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/tHf7tE4XaLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <Text style={styles.explainText}> 공부할 때 듣기 좋은 노래입니다 </Text>
      </View>

        <ScrollView contentContainerStyle={styles.taskList}>
          {selectedDate &&
            tasks[selectedDate] &&
            tasks[selectedDate][currentUser.id] &&
            tasks[selectedDate][currentUser.id].map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <Text style={styles.taskText}>{task.task}</Text>
                <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (isRegistering) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="아이디"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry
        />
        <TouchableOpacity onPress={register} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="아이디"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry
        />


        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRegistering(true)} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Sign up</Text>
        </TouchableOpacity>
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
   input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#fff',
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  deleteButton: {
    backgroundColor: '#f00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
