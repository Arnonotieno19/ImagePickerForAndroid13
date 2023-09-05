import React, {useState} from 'react';
import { StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function App () {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, (response) => {
      console.log('Camera Response:', response); // Log the entire response object
  
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log('Image URI:', imageUri); // Log the image URI
      }
    });
  };
  
  
 
  return ( 
    <View style={styles.container}>
      <Text>My Text App</Text>
      <View style={styles.bodyButtons}>
        <TouchableOpacity onPress={openImagePicker}>
            <Text style={styles.button}>Launch Libray</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraLaunch}>
            <Text style={styles.button}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  bodyButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:windowWidth,
    height:windowHeight*0.4,
    alignItems:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  button:{
    backgroundColor:'blue',
    color:'white',
    fontSize:15,
    borderRadius:5,
    height:30,
    width: windowWidth*0.4,
    alignItems:'center',
    textAlign:'center'
  }
  
});
