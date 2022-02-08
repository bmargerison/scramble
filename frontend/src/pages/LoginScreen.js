import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context as AuthContext} from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {state, signin} = useContext(AuthContext);

  const login = () => {
    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password
      })
      .then(async (res) => {
        console.log(res.data.token)
        setLoginStatus(true)
        AsyncStorage.setItem("token", res.data.token)
        AsyncStorage.setItem("userId", res.data.user._id) 
      })
      .catch((err) => console.log(err));
  };

  console.log(state)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        title='Login'
        onPress={() => signin({email, password})}
      />
      <Text style={{color: 'blue'}}
            onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up here
      </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#AFEEEE',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoginScreen;