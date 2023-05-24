import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  // 회원 정보 저장을 위한 state
  const [users, setUsers] = useState([]);

  const login = () => {
    if (username !== '' && password !== '' && users.find((user) => user.username === username && user.password === password)) {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  // 회원가입 로직
  const register = () => {
    if (username === '' || password === '') {
      setErrorMessage('아이디 또는 비밀번호를 설정하지 않았습니다!');
    } else if (users.find((user) => user.username === username)) {
      setErrorMessage('Username already exists!');
    } else {
      setUsers([...users, { username, password }]);
      setIsRegistering(false);
      setErrorMessage('');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const addTask = () => {
    if (task !== '') {
      setTasks([...tasks, { id: tasks.length, task }]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const goToRegister = () => {
    setIsRegistering(true);
  };

  const cancelRegister = () => {
    setIsRegistering(false);
    setErrorMessage('');
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <ScrollView
          contentContainerStyle={styles.taskList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.task}</Text>
              <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        <TextInput
          style={styles.taskInput}
          value={task}
          onChangeText={setTask}
          placeholder="할일을 추가해 주세요!"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={cancelRegister} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
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
        <TouchableOpacity onPress={goToRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
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
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  taskText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    alignItems: 'center',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    padding: 10,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  addButtonText: {
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
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
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
