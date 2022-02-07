import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginStatus, setLoginStatus] = useState(false);

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

  const userAuthenticated = async () => {
    console.log(AsyncStorage.getItem('userId'))
    const userId = await AsyncStorage.getItem('userId')
    const token = await AsyncStorage.getItem('token')
    console.log(userId)
    axios
      .get(`http://localhost:3000/users/${userId}`, {
        headers: {
          "x-access-token": token
        }
      }).then((response) => {
        console.log(response)
      })
  }

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
        title='Sign Up'
        onPress={() => login()}
      />
      <Button
        title='Sign Up'
        onPress={() => userAuthenticated()}
      />
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