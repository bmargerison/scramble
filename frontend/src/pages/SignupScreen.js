import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../styles/AppStyles';
import styles from '../styles/styleSheet'

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {state, signup} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.authTitle}>Create new account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail Address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signup({username, email, password})}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.link}
        onPress={() => navigation.navigate('Signin')}>
        Already have an account? Login here
      </Text>
    </View>
  );
}

export default SignupScreen;
