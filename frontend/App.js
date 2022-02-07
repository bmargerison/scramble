import * as React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './src/pages/SignupScreen'
import LoginScreen from './src/pages/LoginScreen'
import HomeScreen from './src/pages/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
import {Context as AuthContext} from './src/context/AuthContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
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
                tabBarLabel: "Home"
              }}
            />
          <Tab.Screen
              name="Signup"
              component={SignupScreen}
              options={{ 
                title: "Sign up here",
                tabBarLabel: "Signup"
              }}
            />
          <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{ 
                title: "Please login",
                tabBarLabel: "Login"
              }}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
