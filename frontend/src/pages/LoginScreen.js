import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../AppStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {state, signin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => signin({email, password})}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.loginLink}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up here
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
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
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

export default LoginScreen;