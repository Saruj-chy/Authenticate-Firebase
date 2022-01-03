/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
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

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginHide, setLoginHide] = useState(false);

  const OnSignUp = () => {
    if (!name) {
      alert('Please fill Name');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        console.log(user.user.uid);
        console.log('Registration Successful. Please Login to proceed');

        if (user) {
          SharedPreferences.setItem('uid', user.user.uid);
          firestore()
            .collection('Users')
            .doc(user.user.uid)
            .set({
              name: name,
              email: email,
              password: password,
            })
            .then(() => {
              setLoginHide(false);
              clear();
              navigation.navigate('profile');
            })
            .catch(error => {
              console.log('error firestore');
            });

          // auth()
          //   .currentUser.updateProfile({
          //     displayName: userName,
          //     photoURL:
          //       "https://aboutreact.com/profile.png",
          //   })
          //   .then(() => navigation.replace("HomeScreen"))
          //   .catch((error) => {
          //     alert(error);
          //     console.error(error);
          //   });
        }
      })
      .catch(error => {
        console.log('error auth' + error);
        alert('Auth failed');
        // if (error.code === 'auth/email-already-in-use') {
        //   setErrortext('That email address is already in use!');
        // } else {
        //   setErrortext(error.message);
        // }
      });
  };

  const OnSignIn = () => {
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user:' + user);
        console.log('uid:' + user.user.uid);
        // If server response message same as Data Matched
        if (user) {
          setLoginHide(false);
          clear();

          SharedPreferences.setItem('uid', user.user.uid);
          navigation.navigate('profile');
        }
      })
      .catch(error => {
        console.log('sign in error' + error);
        alert('Please check your valid details...');
        // if (error.code === "auth/invalid-email")
        //   setErrortext(error.message);
        // else if (error.code === "auth/user-not-found")
        //   setErrortext("No User Found");
        // else {
        //   setErrortext(
        //     "Please check your email id or password"
        //   );
        // }
      });
  };

  const OnNewAccount = () => {
    clear();
    setLoginHide(true);
  };
  const OnExistAccount = () => {
    clear();
    setLoginHide(false);
  };
  const clear = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  const OnForgetPassword = () => {
    navigation.navigate('forget_pass');
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
          <Text style={{fontSize: 24, color: 'blue'}}>Authentication</Text>
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
              onChangeText={setPassword}
              placeholder="Enter Your Password"
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
              onChangeText={setPassword}
              placeholder="Enter Your Password"
            />
          </View>
        )}
        <Text
          style={{
            color: 'white',
            marginTop: 50,
            marginHorizontal: 20,

            alignSelf: 'flex-end',
          }}
          onPress={OnForgetPassword}>
          forget password?
        </Text>
        {loginHide ? (
          <View style={styles.view2}>
            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnExistAccount}>
              Already Have Account?
            </Text>

            <Text
              style={{backgroundColor: '#ffccff', color: 'black', padding: 10}}
              onPress={OnSignUp}>
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
              onPress={OnSignIn}>
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
