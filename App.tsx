import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import { sidebarStyles } from './Providers/Styles';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import SignupScreen from './screens/SignupScreen';
import ViewPatientScreen from './screens/ViewPatientScreen';
import SettingsScreen from './screens/SettingsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import MessagesScreen from './screens/MessagesScreen';
import CommunityScreen from './screens/CommunityScreen';
import PregnancyWellness from './screens/PregnancyWellness';
import ContentScreen from './screens/ContentScreen';
import AboutScreen from './screens/AboutScreen';
import TermsScreen from './screens/TermsScreen';
import SavedMessages from './screens/SavedMessages';
import { useSelector } from 'react-redux';
import PaymentBanner from './screens/PaymentBanner';
import PredefinedMessages from './screens/predefinedMessages';

//push notification
import { LogLevel, OneSignal } from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';
import ForgetPassword from './screens/ForgetPassword';

//Provider Screen
import ProviderLogin from './screens/ProviderLogin';
import ProviderSignupScreen from './screens/ProviderSignupScreen';
import ProviderChatScreen from './screens/ProviderChatScreen';
import ProviderHome from './screens/ProviderHome';
import ProviderSetting from './screens/ProviderSetting';
import ProviderViewProfile from './screens/ProviderViewProfile';
import ProviderWalletScreen from './screens/ProviderWalletScreen';
import ViewDetails from './Modals/ViewDetails';

const CustomDrawerContent = ({ navigation, state }) => {
  const isScreenSelected = (routeName:any) => state.routes[state.index].name === routeName;
  let [modifiedUrl, setModifiedUrl] = useState<any>();
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(() => {
    if (userData && userData.profilePicture) {
      let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
      console.log('Modified URL:', updateURL);
      setModifiedUrl(updateURL);
    }
  }, [userData]);

  return(
    <ImageBackground
        source={require('./src/assets/sideNav.png')}
        style={sidebarStyles.backgroundImage}>
    <View style={sidebarStyles.profileContainer}>

      <Image
        source={userData ? { uri: modifiedUrl } : require('./src/assets/logo.png')}
        style={userData ? sidebarStyles.profileImage : sidebarStyles.defaultProfileImage }
      />
      <View>
        <Text style={sidebarStyles.username}>{userData ? userData.name : 'Welcome User'}</Text>
      </View>
    </View>

    <View style={{paddingLeft:10, marginTop:'10%',}}>
    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Home')}>
      <AntDesign name="home" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('About')}>
      <Octicons name="code-of-conduct" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Who we are</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => {
          navigation.navigate('Profile');
      }}>
      <AntDesign name="switcher" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>My Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => {
          navigation.navigate('Messages');
      }}>
      <AntDesign name="inbox" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Chat</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => {  navigation.navigate('Content', {contentType: 'hotTopics'}) }}>
      <AntDesign name="profile" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Hot Topics</Text>
    </TouchableOpacity>
    
    
    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => {  navigation.navigate('Content', {contentType: 'pregnancy'}) }}>
      <AntDesign name="appstore-o" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Pregnancy Wellness</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Terms')}>
      <AntDesign name="appstore-o" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Terms & Conditions</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Settings')}>
      <AntDesign name="setting" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Settings</Text>
    </TouchableOpacity>

  </View>
  </ImageBackground>
  )};

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  useEffect(() => {
     // OneSignal Initialization
     OneSignal.initialize("b20efc02-5fdb-4de3-8011-7a22e6ee7da1");
     OneSignal.Notifications.requestPermission(true);
      // Method for listening for notification clicks
      OneSignal.Notifications.addEventListener('click', (event:any) => {
        console.log('OneSignal: notification clicked =>', event);
      });
      console.log("id =>", DeviceInfo.getDeviceId());
      OneSignal.login(DeviceInfo.getDeviceId());
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Splash" 
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="ViewPatient" component={ViewPatientScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Appointment" component={AppointmentScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Community" component={CommunityScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Wellness" component={PregnancyWellness} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="Content" component={ContentScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="About" component={AboutScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="Terms" component={TermsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />    
        <Drawer.Screen name="SavedMessages" component={SavedMessages} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="PaymentBanner" component={PaymentBanner} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />   
        <Drawer.Screen name="PredefinedMsg" component={PredefinedMessages} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="Forget" component={ForgetPassword} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
          
        {/* Provider App screens */}
        <Drawer.Screen name="ProviderLogin" component={ProviderLogin} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderSignup" component={ProviderSignupScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderChatScreen" component={ProviderChatScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderHome" component={ProviderHome} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderSetting" component={ProviderSetting} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderViewProfile" component={ProviderViewProfile} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ProviderWalletScreen" component={ProviderWalletScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="ViewDetails" component={ViewDetails} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;