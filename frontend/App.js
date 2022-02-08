import React, { useState, useContext } from "react";
import { Stylesheet, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from './src/pages/SignupScreen'
import LoginScreen from './src/pages/LoginScreen'
import HomeScreen from './src/pages/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
import {Context as AuthContext} from './src/context/AuthContext';

const AuthStack = createStackNavigator();

function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Signin"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={SignupScreen}
      />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeFlow() {
  const {state, signout} = useContext(AuthContext);
  return (
    <Tab.Navigator
    initialRouteName="Feed"
    tabBarOptions={{
      activeTintColor: '#42f44b',
    }}>
    <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          title: "Home",
          tabBarLabel: "Home",
          headerRight: () => <Button title="Sign out" onPress={() => signout({})} />,
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

function App() {
  const {state, signout} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {console.log(state.token === null),
        state.token === null ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Auth"
              component={AuthFlow}
            />
          </>
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeFlow}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
