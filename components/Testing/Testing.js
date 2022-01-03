/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';

import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const Testing = () => {
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState('');
  const [transferred, setTransferred] = useState(0);

  const _chooseFile = async () => {
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
      alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  const _uploadFile = async () => {
    // const {uri} = filePath[0].uri;
    // // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // //   setUploading(true);
    // setTransferred(0);
    // const task = storage()
    //   .ref(`/myfiles/${filePath[0].name}`)
    //   .putFile(filePath[0].uri);
    // // set progress state
    // task.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    //   );
    // });
    // try {
    //   await task;
    // } catch (e) {
    //   console.error(e);
    // }
    // //   setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!',
    // );
    //   setImage(null);

    let reference = storage().ref(`/myfiles/${filePath[0].name}`);
    let task = reference.putFile(filePath[0].uri);
    task
      .then(() => {
        console.log('Image uploaded to the bucket!');
        // this.setState({ isLoading: false, status: 'Image uploaded successfully' });
      })
      .catch(e => {
        // status = 'Something went wrong';
        console.log('uploading image error => ', e);
        // this.setState({ isLoading: false, status: 'Something went wrong' });
      });
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{backgroundColor: 'red', padding: 20, marginVertical: 100}}
        onPress={_chooseFile}>
        {' '}
        Image Process
      </Text>

      {/* <Image
        style={styles.tinyLogo}
        source={{
          uri: filePath[0].uri,
        }}
        defaultSource={{
          uri: 'content://com.android.providers.media.documents/document/image%3A141643',
        }}
      /> */}
      {filePath.length == 1 ? (
        <Image source={{uri: filePath[0].uri}} style={styles.tinyLogo} />
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

export default Testing;
