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
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import profile from '../Images/authen.jpg';
import firestore from '@react-native-firebase/firestore';
var SharedPreferences = require('react-native-shared-preferences');

import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const UpdateProfile = ({navigation, route}) => {
  const [uid, setUid] = useState('');
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState('');

  // console.log('uid ' + this.props.navigation.getParam('param1', 'NO-VALUE'));

  useEffect(() => {
    SharedPreferences.getItem('uid', function (value) {
      console.log('value: ' + value);
      setUid(value);
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            console.log('doc id: ' + documentSnapshot.id);
            if (documentSnapshot.id == value) {
              // console.log('name: ' + documentSnapshot.data().name);
              // console.log(documentSnapshot.data().email);
              // console.log(documentSnapshot.data().password);
              setName(documentSnapshot.data().name);
              setEmail(documentSnapshot.data().email);
              setPassword(documentSnapshot.data().password);
              setAddress(documentSnapshot.data().address);
              setDate(documentSnapshot.data().date_of_birth);
            }
          });
        });
    });
  }, []);

  const GetFireStoreData = () => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id == uid) {
            setName(documentSnapshot.data().name);
            setEmail(documentSnapshot.data().email);
            setPassword(documentSnapshot.data().password);
            setAddress(documentSnapshot.data().address);
            setDate(documentSnapshot.data().date_of_birth);
          }
        });
      });
  };

  const OnUpdateProfile = () => {
    console.log('update' + update);
    setUpdate(true);
    console.log('update  ' + update);
  };
  const OnProfileSaved = () => {
    // setUpdate(false);

    console.log(
      name + '  ' + email + '  ' + password + '  ' + address + ' ' + date,
    );
    if (name && email && password) {
      firestore()
        .collection('Users')
        .doc(uid)
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
    GetFireStoreData();
    setUpdate(false);
  };
  const OnLogOut = () => {
    console.log('on log out');
    navigation.navigate('register');
  };

  const _selectProfile = async () => {
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log('fileDetails : ' + JSON.stringify(fileDetails));
      //   console.log('fileDetails uri ' + fileDetails[0].uri);
      //   console.log('fileDetails name ' + fileDetails.name);
      // Setting the state for selected File
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      // alert(
      //   DocumentPicker.isCancel(error)
      //     ? 'Canceled'
      //     : 'Unknown Error: ' + JSON.stringify(error),
      // );
    }
    // console.log('filePath: ' + filePath.length);
  };

  React.useEffect(() => {
    const backAction = () => {
      console.log('update' + update);
      if (update) {
        setUpdate(false);
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
            <TouchableOpacity onPress={_selectProfile}>
              {filePath.length == 1 ? (
                <Image
                  style={styles.tinyLogo}
                  source={{uri: filePath[0].uri}}
                />
              ) : (
                <Image style={styles.tinyLogo} source={profile} />
              )}
            </TouchableOpacity>
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
