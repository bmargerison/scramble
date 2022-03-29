import React, { useState, useContext } from "react";
import { Stylesheet, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import SignupScreen from './src/pages/SignupScreen'
import LoginScreen from './src/pages/LoginScreen'
import HomeScreen from './src/pages/HomeScreen'
import ListScreen from './src/pages/ListScreen'
import SearchScreen from './src/pages/SearchScreen'
import AccountScreen from './src/pages/AccountScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
import {Context as AuthContext} from './src/context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles} from './src/AppStyles';

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

const HomeStack = createStackNavigator()

function HomeFlowNavigator() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" component={HomeScreen}
        options={{headerShown: false}}
        />
      <HomeStack.Screen 
        name="ListScreen" component={ListScreen}
        options={{headerShown: false}}
        />
    </HomeStack.Navigator>
  )
}

const SearchStack = createStackNavigator()

function SearchFlowNavigator() {
  return(
    <SearchStack.Navigator>
      <SearchStack.Screen 
        name="SearchRecipes" component={SearchScreen}
        options={{headerShown: false}}
        />
    </SearchStack.Navigator>
  )
}

const AccountStack = createStackNavigator()

function AccountFlowNavigator() {
  return(
    <AccountStack.Navigator>
      <AccountStack.Screen 
        name="MyAccount" component={AccountScreen}
        options={{headerShown: false}}
        />
    </AccountStack.Navigator>
  )
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
        name="HomeTab"
        component={HomeFlowNavigator}
        options={{ 
          headerShown: false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={AppStyles.color.tint} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchFlowNavigator}
        options={{ 
          headerShown: false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <Icon name="table-search" color={AppStyles.color.tint} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="MyRecipes"
        component={HomeFlowNavigator}
        options={{ 
          headerShown: false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <Icon name="notebook" color={AppStyles.color.tint} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountFlowNavigator}
        options={{ 
          headerShown: false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={AppStyles.color.tint} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AppStack = createStackNavigator();

function App() {
  const {state, signout} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {state.token === null ? (
          <>
            <AppStack.Screen
              options={{headerShown: false}}
              name="Auth"
              component={AuthFlow}
            />
          </>
        ) : (
          <AppStack.Screen
            options={{headerShown: false}}
            name="HomeFlow"
            component={HomeFlow}
          />
        )}
      </AppStack.Navigator>
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
