import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../styles/AppStyles';
import styles from '../styles/styleSheet'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {state, signin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.authTitle}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signin({email, password})}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.link}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up here
      </Text>
    </View>
  );
}

export default LoginScreen;
