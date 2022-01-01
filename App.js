/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import * as React from 'react';
import {Button, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import HomeScreen from './components/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="profile">
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            title: 'Register', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={UpdateProfile}
          options={{
            title: 'Second Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'Third Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
