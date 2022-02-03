import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password
      })
      .then((res) => {
        res.data.forEach((user, index) => {
          if (user.email == email && user.password == password) {
            console.log(res.data[index])
          }
        })
      })
      .catch((err) => console.log(err));
  };

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