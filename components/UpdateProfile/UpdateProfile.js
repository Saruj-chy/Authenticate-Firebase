/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import profile from '../Images/authen.jpg';
import firestore from '@react-native-firebase/firestore';

const UpdateProfile = ({navigation}) => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id == 'JkRzY0KHroY4Y2E6LEdA') {
            setName(documentSnapshot.data().name);
            setEmail(documentSnapshot.data().email);
            setPassword(documentSnapshot.data().password);
            setAddress(documentSnapshot.data().address);
            setDate(documentSnapshot.data().date_of_birth);
          }
        });
      });
  }, []);

  const OnUpdateProfile = () => {
    setUpdate(true);
  };
  const OnProfileSaved = () => {
    // setUpdate(false);

    console.log(
      name + '  ' + email + '  ' + password + '  ' + address + ' ' + date,
    );
    if (name && email && password) {
      firestore()
        .collection('Users')
        .doc('JkRzY0KHroY4Y2E6LEdA')
        .update({
          name: name,
          email: email,
          password: password,
          address: address,
          date_of_birth: date,
        })
        .then(() => {
          Alert.alert(
            'Success',
            'Updated Successfully',
            [
              {
                text: 'Ok',
                onPress: () => setUpdate(false),
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
                onPress: () => setUpdate(false),
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      alert('Please fill all fields');
    }
  };
  const cancel = () => {
    setUpdate(false);
  };
  const OnLogOut = () => {
    console.log('on log out');
    navigation.navigate('register');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {!update ? (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image style={styles.tinyLogo} source={profile} />
          </View>
          <View style={{marginLeft: 30, marginTop: 50}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 16, color: 'white', width: 90}}>
                Name:{' '}
              </Text>
              <Text style={{fontSize: 25, color: 'white'}}> {name} </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 16, color: 'white', width: 90}}>
                Email{' '}
              </Text>
              <Text style={{fontSize: 25, color: 'white'}}> {email} </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 16, color: 'white', width: 90}}>
                Password{' '}
              </Text>
              <Text style={{fontSize: 22, color: 'white'}}> {password} </Text>
            </View>
            {address != null && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text style={{fontSize: 16, color: 'white', width: 90}}>
                  Address{' '}
                </Text>
                <Text style={{fontSize: 22, color: 'white'}}> {address} </Text>
              </View>
            )}
            {date != null && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text style={{fontSize: 16, color: 'white', width: 90}}>
                  Date of Birth{' '}
                </Text>
                <Text style={{fontSize: 22, color: 'white'}}> {date} </Text>
              </View>
            )}
          </View>

          <View style={styles.view2}>
            <Text
              onPress={OnLogOut}
              style={{
                backgroundColor: '#ffccff',
                color: 'black',
                padding: 10,
              }}>
              Log Out
            </Text>

            <Text
              style={{
                backgroundColor: '#ffccff',
                color: 'black',
                padding: 10,
                paddingHorizontal: 20,
              }}
              onPress={OnUpdateProfile}>
              Update
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image style={styles.tinyLogo} source={profile} />
          </View>
          <View style={{marginLeft: 30, marginTop: 50}}></View>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Date of Birth"
            value={date}
            onChangeText={setDate}
          />
          <View style={styles.view2}>
            <Text
              onPress={cancel}
              style={{
                backgroundColor: '#ffccff',
                color: 'black',
                padding: 10,
              }}>
              Cancel
            </Text>

            <Text
              style={{
                backgroundColor: '#ffccff',
                color: 'black',
                padding: 10,
                paddingHorizontal: 20,
              }}
              onPress={OnProfileSaved}>
              Save
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  tinyLogo: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
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

  input: {
    height: 40,
    margin: 12,
    paddingLeft: 15,

    borderWidth: 1,
    backgroundColor: 'white',
    color: 'blue',
  },
});

export default UpdateProfile;
