import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {providerRegisterUser, uploadImage} from '../Providers/http';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import storage from '@react-native-firebase/storage';
import DeviceInfo from 'react-native-device-info';


const ProviderSignupScreen: React.FC = ({navigation}) => {
  const [isLoading, setisLoading] = useState<any>(false);
  const [name, setname] = useState<any>(null);
  const [password, setpassword] = useState<any>(null);
  const [email, setemail] = useState<any>(null);
  const [phoneNumber, setphoneNumber] = useState<any>(null);
  const [address, setaddress] = useState<any>(null);
  const [profilePicture, setprofilePicture] = useState<any>(null);
  const [nmc, setnmc] =  useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const [deviceToken, setdeviceToken] = useState<any>('');
  
  useEffect(() => {
    setdeviceToken(DeviceInfo.getDeviceId());
  },[])

  const registerButton = () => {
    setisLoading(true)
    console.log('Register');
    providerRegisterUser(name, password, email, phoneNumber, address, imageURL, nmc)
      .then((resp: any) => {
        setisLoading(false)
        console.log("register resp =>", resp);
        openLogin();
      })
      .catch((err: any) => {
        setisLoading(false)
        console.log("error register button =>", err);
      });
  };

  const openLogin = () => {
    navigation.navigate('ProviderLogin');
  };

  const handleImageUpload = async () => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, async (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setprofilePicture(response?.assets[0].uri);

        // Upload the image to Firebase Storage
        const uploadUri = uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to file name to ensure unique filenames
        const timestamp = new Date().getTime();
        const name = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();
        filename = `${name}_${timestamp}.${extension}`;

        const storageRef = storage().ref(`profileImage/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', (taskSnapshot:any) => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        try {
          await task;
          const url = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase Storage:', url);
          setImageURL(url);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }


  return (
    <ImageBackground
      source={require('../src/assets/splash6.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>


        <View style={styles.logoContainer}>   
        {profilePicture ? (
            <TouchableOpacity onPress={handleImageUpload}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} resizeMode="cover" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleImageUpload}>
              <Image source={require('../src/assets/profilePic.png')} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={setname}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setpassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Address"
            placeholderTextColor="grey"
            value={address}
            onChangeText={setaddress}
          />
           <TextInput
            style={styles.input}
            placeholder="Enter Your Contact Number"
            placeholderTextColor="grey"
            value={phoneNumber}
            onChangeText={setphoneNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your NMC Pin"
            placeholderTextColor="grey"
            value={nmc}
            onChangeText={setnmc}
          />

          <TouchableOpacity style={styles.loginButton} onPress={registerButton}> 
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.subtitle}>
            <Text style={{color:'black'}}>Already have an Account ?</Text>
            <TouchableOpacity onPress={openLogin}>
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>&nbsp;&nbsp;Login Now !</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 140,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5, // Half of width and height to make it circular
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderTopColor: '#22ece2',
    borderLeftColor: '#22ece2',
    borderRightColor: '#22ece2',
    borderBottomColor: '#22ece2',
  },
  forgetPass: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoContainer: {
    marginTop: '-20%',
    marginBottom: '10%',
  },
  loginButton: {
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '75%',
    marginTop: '8%',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  subtitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  },

  linkContainer: {
    borderBottomWidth: 1, // Add an underline
    borderBottomColor: 'white',
    marginVertical: 10,
  },

  linkText: {
    fontWeight: 'bold',
    color: '#ef6ccc',
  },
});

export default ProviderSignupScreen;
