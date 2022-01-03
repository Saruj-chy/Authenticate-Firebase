/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import * as React from 'react';
import {Button, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import HomeScreen from './components/HomeScreen/HomeScreen';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Testing from './components/Testing/Testing';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={UpdateProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="forget_pass"
          component={ForgetPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
