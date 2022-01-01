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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState(0);
  const [loginHide, setLoginHide] = useState(false);

  const OnRegister = () => {
    console.log(name);
    console.log(number);

    firestore()
      .collection('Users')
      .add({
        name: name,
        contact: number,
      })
      .then(() => {
        Alert.alert(
          'Success',
          'You are Registered Successfully',
          [
            {
              text: 'Ok',
              onPress: () => console.log('Success'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        Alert.alert(
          'Exception',
          error,
          [
            {
              text: 'Ok',
              onPress: () => console.log('error'),
            },
          ],
          {cancelable: false},
        );
      });
  };

  const OnNewAccount = () => {
    setLoginHide(true);
  };
  const OnExistAccount = () => {
    setLoginHide(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'brown'}}>
      <ImageBackground style={styles.image}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 24, color: 'yellow'}}>Authentication</Text>
          {loginHide ? (
            <Text style={{fontSize: 25, color: '#ff0000'}}>Sign Up</Text>
          ) : (
            <Text style={{fontSize: 25, color: '#ff0000'}}>Sign In</Text>
          )}
        </View>
        {loginHide ? (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              placeholder="Enter Your Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setNumber}
              placeholder="Your Phone Number"
              keyboardType="numeric"
            />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setNumber}
              placeholder="Your Phone Number"
              keyboardType="numeric"
            />
          </View>
        )}
        {loginHide ? (
          <View style={styles.view2}>
            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnExistAccount}>
              Already Have Account?
            </Text>

            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnRegister}>
              Sign Up
            </Text>
          </View>
        ) : (
          <View style={styles.view2}>
            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnNewAccount}>
              Create New Account?
            </Text>

            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnRegister}>
              Sign In
            </Text>
          </View>
        )}
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

export default Register;
