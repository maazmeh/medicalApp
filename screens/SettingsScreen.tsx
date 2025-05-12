import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity, StyleSheet, ImageBackground, Switch, ActivityIndicator, Modal, TextInput, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { deleteAccountRequest, showToastWithGravity, updatePassword } from '../Providers/http';

const SettingsScreen: React.FC = ({ navigation }) => {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [helpText, setHelpText] = useState('');
  const [comp, setComp] = useState<any>(false);
  const [msg, setMsg] = useState<any>('');
  
  const userData = useSelector((state: any) => state.user.userData);

  // Placeholder settings options
  const settingsOptions = [
    { name: 'Change Password', icon: 'unlock' },
    { name: 'Help', icon: 'exclamationcircleo' },
    { name: 'Delete Account', icon: 'delete' },
    { name: 'Logout', icon: 'logout' },
  ];

  const handleSettingPress = (setting: any) => {
    if (setting === 'Logout') {
      createTwoButtonAlert('Do you want to Proceed?', 'By Clicking on Ok you will be Logged out.');
    } else if (setting === 'Delete Account') {
      createTwDeleteAlert('Do you want to Proceed?', 'By Clicking on Ok your Account will be Deleted and you will be Logged out.');
    } else if (setting === 'Change Password') {
      setShowPasswordModal(true);
    } else if (setting === 'Help') {
      setShowHelpModal(true);
    }
  };

  const createTwoButtonAlert = (msg: any, subMsg: any) =>
    Alert.alert(msg, subMsg, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log('OK Pressed');
          AsyncStorage.setItem('userData', 'empty');
          navigation.navigate('Login');
        }
      },
    ]);

  const createTwDeleteAlert = (msg: any, subMsg: any) =>
    Alert.alert(msg, subMsg, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log('OK Pressed');
          setIsLoading(true);
          deleteAccountRequest(userData.id).then((resp: any) => {
            showToastWithGravity('Account Deleted Successfully...')
            AsyncStorage.setItem('userData', 'empty');
            setIsLoading(false);
            navigation.navigate('Login');
          }).catch((err: any) => {
            console.log("err deleteAccReq =>", err);
            setIsLoading(false);
          })
        }
      },
    ]);

  const handlePasswordSave = () => {
    if(currentPassword && newPassword && confirmPassword){
      if (newPassword !== confirmPassword) {
        // Alert.alert("Error", "Passwords do not match.");
        setMsg('* Passwords do not match')
        setComp(true);
        setTimeout(() => {
          setComp(false);
        }, 3000);
        return;
      } else {
        setIsLoading(true);
        // Password update logic here
        updatePassword(newPassword,userData.id ).then((resp:any) => {
          console.log("Password Updated =>");
          setIsLoading(false);
          setShowPasswordModal(false);
          showToastWithGravity('Password Updated Successfully, Login again to continue.')
          AsyncStorage.setItem('userData', 'empty');
          navigation.navigate('Login');
        }).catch((err:any) => {
          console.log("Errror while update password");
        })
      }
    } else {
      setMsg('* All fields are required')
      setComp(true);
      setTimeout(() => {
        setComp(false);
      }, 3000);
    }
  }

  const handleHelpSubmit = () => {
    // Handle help submission logic here
    if(helpText){
      console.log("Help submitted:", helpText);
      Alert.alert("Thank you!", "We will look into this, and get back to you shortly.");
      setShowHelpModal(false);
    } else {
      setComp(true);
      setTimeout(() => {
        setComp(false);
      }, 3000);
    }
  };

  return (
    <ImageBackground
      source={require('../src/assets/checkbg.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
            <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
          </TouchableOpacity>
          <Text style={styles.title}>My Settings</Text>
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ef6ccc" />
          </View>
        ) : (
          <View style={{ padding: 15 }}>
            <View style={styles.settingsList}>
              {settingsOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.settingOption}
                  onPress={() => handleSettingPress(option.name)}>
                  <View style={styles.iconContainer}>
                    <AntDesign name={option.icon} size={24} color="#ef6ccc" />
                  </View>
                  <Text style={styles.settingText}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Modal for Change Password */}
        <Modal visible={showPasswordModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header with Title and Close Icon */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Change Password</Text>
                <TouchableOpacity onPress={() => setShowPasswordModal(false)} style={styles.closeIcon}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/* Input Fields for Password */}
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {/* Error Message */}
              {comp ? (
                <Text style={{ color: 'red', marginBottom: 10 }}>{msg ? msg : ''}</Text>
              ) : (
                <Text></Text>
              )}
              {
                isLoading ?
                <ActivityIndicator size="large" color="#ef6ccc" />
                :
                <Button title="Submit" onPress={handlePasswordSave} />
              }
            </View>
          </View>
        </Modal>

        {/* Modal for Help */}
        <Modal visible={showHelpModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header with Title and Close Icon */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Help and Support</Text>
                <TouchableOpacity onPress={() => setShowHelpModal(false)} style={styles.closeIcon}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/* Input Field for Help */}
              <TextInput
                style={styles.input}
                placeholder="Describe your issue"
                value={helpText}
                onChangeText={setHelpText}
                multiline
              />

              {/* Error Message */}
              {comp ? (
                <Text style={{ color: 'red', marginBottom: 10 }}>* Please describe your issue</Text>
              ) : (
                <Text></Text>
              )}
                <Button title="Submit" onPress={handleHelpSubmit} />
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 3
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ef6ccc',
    textAlign: 'center',
    marginTop: 14
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  iconContainer: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 17,
    color: 'gray',
    flex: 1,
  },
  settingsList: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 24
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    padding: 5,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default SettingsScreen;