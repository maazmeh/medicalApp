import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchPatientData } from '../Providers/http';
// import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


const ProviderHome = ({ navigation }) => {
  const [patientData, setPatientData] = useState([]);
  const [filteredPatientData, setFilteredPatientData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState<any>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("HomeScreen Called");
    AsyncStorage.getItem('userData').then((resp:any) => {
      if (resp === 'empty') {
        // Handle empty case
      } else {
        const parsedData = JSON.parse(resp);
        console.log("parsed Data on Home =>", parsedData.id);
        fetchData();
      }
    }).catch((err) => {
      console.log("error while fetching data =>", err);
    });
  }, []);


  useEffect(() => {
    if(isFocused){
      fetchData();
    }
  }, [isFocused]);
  
  const fetchData = () => {
    setIsLoading(true)
    fetchPatientData().then((resp:any) => {
      setPatientData(resp.data);
      // if (userData && userData.profilePicture) {
      //   let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
      //   console.log('Modified URL:', updateURL);
      //   setModifiedUrl(updateURL);
      // }
      // setFilteredPatientData(resp.data);
      const updatedData = resp.data.map((item:any) => {
        if (item.profilePicture) {
          item.profilePicture = item.profilePicture.replace('/profileImage/', '/profileImage%2F');
        }
        return item;
      });
      setIsLoading(false);
      // Save the modified data in the state
      setFilteredPatientData(updatedData);
    })
    .catch((err) => {
      console.log('err =>', err);
    });
  };

  const handleSearch = (text:any) => {
    setSearchQuery(text);
    if (text) {
      const newData = patientData.filter((item:any) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredPatientData(newData);
    } else {
      setFilteredPatientData(patientData);
    }
  };

  const openPatientView = (item:any) => {
    console.log("openPatientView =>", item);
    navigation.navigate('ProviderViewProfile', { clientData: item });
  };

  const openChat = (item:any) => {
    console.log("openChat ==>", item);
    navigation.navigate('ProviderChatScreen', { connectionId: item.chatConnectionID, receiverId: item.userId, name: item.name });
  };

  const renderPatientCard = ({ item }) => (
    <View style={styles.card}>
       <Image
        source={filteredPatientData ? { uri: item.profilePicture } : require('../src/assets/logo.png')}
        style={styles.profileImage}
      />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientAge}>Age: {item.age}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => openPatientView(item)}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={() => openChat(item)}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Patients View</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <AntDesign name="search1" size={20} color={'black'} />
        </TouchableOpacity>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>My Patients</Text>
      </View>

      {
        isLoading ? 
        <ActivityIndicator size="large" color="white" />
        :
        <FlatList
        data={filteredPatientData}
        renderItem={renderPatientCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.patientList}/>
      }
      

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProviderHome')}>
          <AntDesign name="home" size={26} color={'#ef6ccc'} />
          <Text style={styles.navButtonTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProviderSetting')}>
          <AntDesign name="setting" size={24} color={'lightgrey'} />
          <Text style={styles.navButtonText}>Settings</Text>
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
  headingContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef6ccc',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: '#22ece2',
    borderRadius: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ef6ccc',
  },
  patientAge: {
    color: '#666',
  },
  chatButton: {
    backgroundColor: '#22ece2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  chatButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  viewButtonText: {
    color: '#22ece2',
    fontWeight: 'bold',
  },
  patientList: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomNav: {
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
    color:'lightgrey',
    fontSize: 12,
    marginTop: 2,
  },
  navButtonTextActive:{
    color: '#ef6ccc',
    fontSize: 12,
    marginTop: 2,
  }
});

export default ProviderHome;