import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {state, signup} = useContext(AuthContext);

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder='Username'
      autoCapitalize="none"
      placeholderTextColor='white'
      onChange={(e) => setUsername(e.target.value)}
    />
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
      onPress={() => signup({username, email, password})}
    />
    <Text style={{color: 'blue'}}
      onPress={() => navigation.navigate('Signin')}>
      Already have an account? Login here
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

export default SignupScreen;