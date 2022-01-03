/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const Testing1 = () => {
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState('');

  const _chooseFile = async () => {
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log('fileDetails : ' + JSON.stringify(fileDetails));
      // Setting the state for selected File
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  const _uploadFile = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert('Please Select any File');
      setLoading(true);

      // Create Reference
      console.log(filePath.uri.replace('file://', ''));
      console.log(filePath.name);
      const reference = storage().ref(`/myfiles/${filePath.name}`);

      // Put File
      const task = reference.putFile(filePath.uri.replace('file://', ''));
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      task.on('state_changed', taskSnapshot => {
        setProcess(
          `${taskSnapshot.bytesTransferred} transferred 
               out of ${taskSnapshot.totalBytes}`,
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
               out of ${taskSnapshot.totalBytes}`,
        );
      });
      task.then(() => {
        alert('Image uploaded to the bucket!');
        setProcess('');
      });
      setFilePath({});
    } catch (error) {
      console.log('Error->', error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{backgroundColor: 'red', padding: 20, marginVertical: 100}}
        onPress={_chooseFile}>
        {' '}
        Image Process
      </Text>

      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      {filePath !== null ? (
        <Image source={{uri: filePath.uri}} style={styles.tinyLogo} />
      ) : null}

      <Text
        style={{backgroundColor: 'red', padding: 20, marginVertical: 100}}
        onPress={_uploadFile}>
        {' '}
        Image Upload
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Testing1;
