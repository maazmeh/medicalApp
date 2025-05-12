import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { providerLoginUser, showToastWithGravity } from '../Providers/http';
import { useDispatch } from 'react-redux';
import { setUserData } from '../actions/userActions';

const ProviderLogin: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const LoginButton = () => {
    if (email && password) {
      setisLoading(true);
      providerLoginUser(email, password).then((result) => {
        console.log('Login resp =>', result);
        navigation.navigate('ProviderHome');
        dispatch(setUserData(result));
        setisLoading(false);
        setEmail('');
        setPassword('');
      }).catch((error) => {
        setisLoading(false);
      });
    } else {
      showToastWithGravity('Email or Password cannot be empty...');
    }
  };

  const openRegister = () => {
    navigation.navigate('ProviderSignup');
  };

  const moveToForget = () => {
    // navigation.navigate('Forget');
  };

  const switchToProviderApp = () => {
    console.log('Switch to Provider App clicked');
    navigation.navigate('Login');
  }

  return (
    <ImageBackground
    source={require('../src/assets/splash6.png')}
    style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../src/assets/logo.png')}
            style={styles.logo}/>
            <Text style={styles.logoText}>Provider App</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={{ alignSelf: 'flex-end', marginBottom: '5%' }}>
            <TouchableOpacity onPress={moveToForget}>
              <Text style={styles.forgetPass}>Forgot Password ?&nbsp;&nbsp;</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={LoginButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.subtitle}>
            <Text style={{ color: 'black' }}>Don't have an Account ?</Text>
            <TouchableOpacity onPress={openRegister}>
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>&nbsp;&nbsp;Register Now !</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={switchToProviderApp}>
          <Text style={styles.footerText}>Switch to Patient App</Text>
        </TouchableOpacity>
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
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2
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
    marginTop: '-50%',
    marginBottom: '10%',
    alignItems:'center'
  },
  loginButton: {
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '75%',
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
  logoText:{
    fontWeight: 'bold',
    // color:'#ef6ccc',
    color:'black',
    fontSize: 24,
    marginTop:'-7%'
  },
  linkText: {
    fontWeight: 'bold',
    color: '#ef6ccc',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProviderLogin;