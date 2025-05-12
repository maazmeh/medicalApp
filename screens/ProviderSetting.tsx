import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProviderSetting: React.FC = ({ navigation }) => {
  // Placeholder settings options
  const settingsOptions = [
    { name: 'Terms & Conditions', icon: 'copyright' },
    { name: 'Our Values', icon: 'copyright' },
    { name: 'Our Mission', icon: 'copyright' },
    { name: 'Vision', icon: 'copyright' },
    { name: 'Payment', icon: 'creditcard' },
    { name: 'Change Password', icon: 'unlock' },
    { name: 'Logout', icon: 'logout' },
  ];
  
  
  

  const handleSettingPress = (setting: any) => {
    console.log(`Selected setting`, setting);
    if (setting === 'Logout') {
      createTwoButtonAlert();
    } else if (setting === 'Terms & Conditions') {
      navigation.navigate('ViewDetails', { title: setting });
    } else if (setting === 'Our Values') {
      navigation.navigate('ViewDetails', { title: setting });
    } else if (setting === 'Our Mission') {
      navigation.navigate('ViewDetails', { title: setting });
    } else if (setting === 'Vision') {
      navigation.navigate('ViewDetails', { title: setting });
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Do you want to Proceed ?', 'By Clicking on Ok you will be Logged out.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log('OK Pressed');
          AsyncStorage.setItem('userData', 'empty');
          navigation.navigate('ProviderLogin');
        }
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {/* <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity> */}
        <Text style={styles.title}>My Settings</Text>
      </View>

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

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProviderHome')}>
          <AntDesign name="home" size={24} color={'lightgrey'} />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProviderSetting')}>
          <AntDesign name="setting" size={26} color={'#ef6ccc'} />
          <Text style={styles.navButtonTextActive}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 3,
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
    marginTop: 14,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  settingsList: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ededed',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: 'lightgrey',
    fontSize: 12,
    marginTop: 2,
  },
  navButtonTextActive: {
    color: '#ef6ccc',
    fontSize: 12,
    marginTop: 2,
  },
});

export default ProviderSetting;