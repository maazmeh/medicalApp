import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { sendPasswordResetEmail, showToastWithGravity } from '../Providers/http'; // You will need to implement this function
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ForgetPassword: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState<any>(false);
  const [email, setEmail] = useState<string>('');

  const handlePasswordReset = () => {
    if (email) {
      setisLoading(true);
      sendPasswordResetEmail(email).then(() => {
        setisLoading(false);
        showToastWithGravity('Password reset email sent. Please check your email for Password recovery');
      }).catch((error: any) => {
        setisLoading(false);
        showToastWithGravity('Failed to send password reset email.');
      });
    } else {
      showToastWithGravity('Email cannot be empty...');
    }
  }

  const handleBack = () => {
    navigation.navigate('Login');
  }

  return (
    <ImageBackground
      source={require('../src/assets/splash1.png')}
      style={styles.backgroundImage}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => handleBack()}>
          <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Forget Password</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.instructionText}>Please enter your email to change the password...</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
            {
              isLoading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.resetButtonText}>Send Reset Email</Text>
            }
          </TouchableOpacity>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef6ccc',
    marginLeft:50
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  instructionText: {
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#22ece2',
  },
  resetButton: {
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 5,
    width: '75%',
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ForgetPassword;