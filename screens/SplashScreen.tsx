import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/userReducer';

// App ID:
// b20efc02-5fdb-4de3-8011-7a22e6ee7da1

const SplashScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(()=>{
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  },[])

  useEffect(() => {
    const retrieveData = async () => {
      try {
        AsyncStorage.getItem('userData').then((resp:any) => {
          console.log("splash resp =>", resp);
          if(resp === 'empty' || resp === null){
            setTimeout(() => {
            navigation.navigate('Login');
          }, 4000); 
          } else {
          const parsedData = JSON.parse(resp);
          dispatch(setUserData(parsedData));
          console.log("parsedData =>", parsedData.userType);
          if(parsedData.userType === 'patient'){
            navigation.navigate('Home');
          } else if(parsedData.userType === 'midWife'){
            navigation.navigate('ProviderHome');
          }
          }
        }).catch((err:any) => {
          console.log("err =>", err);
        })
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
    retrieveData();
  }, [dispatch]);


  return (
    <ImageBackground
    source={require('../src/assets/splash5.png')}
    style={styles.backgroundImage}>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // width:'105%',
    // marginLeft:-20
  },
  container: {
    flex: 1,
    marginTop:'30%',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the width and height based on your logo size
    height: 200,
  },
  heading:{
    fontSize:30,
    fontWeight: 'bold',
  },
  subHeading:{
    fontSize:28,
    fontWeight: 'bold',
  }
});

export default SplashScreen;