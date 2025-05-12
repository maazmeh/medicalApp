import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchMyConnections } from '../Providers/http';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';


const MessagesScreen: React.FC = ({ navigation }) => {
  const userData = useSelector((state:any) => state.user.userData);
  const [contacts, setContacts] = useState<any>();
  const image:any = require('../src/assets/logo.png');
  const isFocused = useIsFocused();


  useEffect(() => {
    if(isFocused && userData && userData.isPaid === '0'){
    navigation.navigate('PaymentBanner')
    } else {
      fetchData();
    }
  },[isFocused])


  const fetchData = () => {
    try {
      fetchMyConnections(userData.id).then((resp:any) => {
        console.log("userData.id =>", userData.id);
        console.log("fetchMyConnections resp =>", resp);
        setContacts(resp);
      }).catch((err:any) => {
        console.log("err =>", err);
      })
    } catch (error) {
      console.log("err =>", error);
    }
  }

    
    const renderContact = ({ item }) => (
        <TouchableOpacity onPress={() => {
          if (item.onlineStatus === '1') {
            navigation.navigate('Chat', { data: item });
          } else {
            navigation.navigate('PredefinedMsg');
          }
        }}>
        <View style={styles.contactContainer}>
          <Image source={image} style={styles.profilePic} />
          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>{item.names ? item.names : 'MidWife User'}</Text>
          </View>
          <Text style={[styles.timestamp, { color: item.onlineStatus === '1' ? 'green' : 'red' }]}>
            {item.onlineStatus === '1' ? 'Online' : 'Away'}
          </Text>
        </View>
        </TouchableOpacity>
      );
    
      return (
        <ImageBackground
        source={require('../src/assets/checkbg.png')}
        style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
              <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
            </TouchableOpacity>
            <Text style={styles.title}>My Messages</Text>
          </View>
    

        <View style={{padding:10}}>
          <FlatList
            data={contacts}
            renderItem={renderContact}
            keyExtractor={(item) => item.id}
          />
        </View>
        </ScrollView>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
      contactContainer: {
        backgroundColor:'white',
        padding:10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius:14
      },
      profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      contactDetails: {
        flex: 1,
      },
      contactName: {
        fontWeight: 'bold',
        color:'black'
      },
      lastMessage: {
        color: '#888',
      },
      timestamp: {
        color: '#888',
        fontSize: 12,
      },
    });

export default MessagesScreen;