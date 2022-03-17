import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../AppStyles';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {state, signup} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => signup({username, email, password})}>
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.loginLink}
        onPress={() => navigation.navigate('Signin')}>
        Already have an account? Login here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 50,
    marginBottom: 50,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
  },
  loginText: {
    color: AppStyles.color.white,
    alignSelf: "center",
    fontSize: AppStyles.fontSize.content,
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginBottom: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
    fontSize: AppStyles.fontSize.content,
  },
  loginLink: {
    marginTop: 20,
    marginBottom: 20,
    color: AppStyles.color.blue,
    fontSize: AppStyles.fontSize.sub,
  },
});

export default SignupScreen;
