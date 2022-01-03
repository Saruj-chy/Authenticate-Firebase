/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  ToastAndroid,
  AlertIOS,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
var SharedPreferences = require('react-native-shared-preferences');

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const _onResetEmail = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Please check your email...');
      })
      .catch(function (e) {});
  };
  const _onCancel = () => {
    navigation.navigate('register');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'brown'}}>
      <ImageBackground style={styles.image}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 50,
          }}>
          <Text style={{fontSize: 40, color: 'white'}}>Authentication</Text>
          <Text style={{fontSize: 18, color: 'white'}}>Password Reset</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Enter Your Email Address"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.view2}>
          <Text
            style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
            onPress={_onCancel}>
            cancel
          </Text>

          <Text
            style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
            onPress={_onResetEmail}>
            Reset
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    paddingLeft: 15,

    borderWidth: 1,
    backgroundColor: 'white',
    color: 'blue',
    marginVertical: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  view2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 1,
    justifyContent: 'space-between',
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ForgetPassword;
