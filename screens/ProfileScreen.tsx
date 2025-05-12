import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchMyData, updateProfileData} from '../Providers/http';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';


const ProfileScreen: React.FC = ({ navigation }) => {
  const userData = useSelector((state:any) => state.user.userData);
  const isFocused = useIsFocused();
  const [dob, setDob] = useState<any>();
  const [age, setAge] = useState<any>();
  const [emergencyContact, setEmergencyContact] = useState<any>();
  const [relationsipWithContact, setrelationsipWithContact] = useState<any>();
  const [priorPregnancies, setpriorPregnancies] = useState<any>();
  const [complications, setcomplications] = useState<any>();
  const [miscariages, setmiscariages] = useState<any>();
  const [currentPregnancyAge, setcurrentPregnancyAge] = useState<any>();
  const [expectedDueDate, setexpectedDueDate] = useState<any>();
  const [familyMedicalHistory, setfamilyMedicalHistory] = useState<any>();
  const [AddiotionalInfo, setAddiotionalInfo] = useState<any>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // Dummy patient data
  const patientInfo = {
    name: 'Joane Roxanne',
    profilePicture: require('../src/assets/logo.png'),
  };

  useEffect(() => {
    try {
      fetchMyData(userData.id).then((resp:any) => {
        console.log("resp fetchMydata =>", resp.data[0]);
        setAge(resp.data[0].age)
        setpriorPregnancies(resp.data[0].priorPregnancies)
        setcomplications(resp.data[0].complications)
        setmiscariages(resp.data[0].miscariages)
        setcurrentPregnancyAge(resp.data[0].currentPregnancyAge)
        setexpectedDueDate(resp.data[0].expectedDueDate)
        setAddiotionalInfo(resp.data[0].AddiotionalInfo)
      }).catch((err:any) => {
        console.log("fetchMydata err =>", err);
      })  
    } catch (error) {
      
    }

    if(isFocused && userData && userData.isPaid === '0'){
    navigation.navigate('PaymentBanner')
    }
  },[isFocused])

  const updateProfile = () => {
    console.log('Update Profile Pressed');
    console.log('medicalChecklist ==>',);
    setisLoading(true)
    let dateOfBirth:any = dob ? dob.toLocaleDateString() : '';
    updateProfileData(
      userData.id,
      dateOfBirth,
      age,
      emergencyContact,
      relationsipWithContact,
      priorPregnancies,
      complications,
      miscariages,
      currentPregnancyAge,
      expectedDueDate,
      familyMedicalHistory,
      AddiotionalInfo, 
    )
      .then((resp: any) => {
        console.log("resp =>", resp);
        setisLoading(false)
      })
      .catch((err: any) => {
        console.log("err =>", err)
        setisLoading(false)
      });
  };
  
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event:any, selectedDate:any) => {
    if (selectedDate) {
      setDob(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <ScrollView>
        <View style={{padding: 20}}>
          {/* Profile Card */}
          <View style={styles.card}>
            <View style={styles.patientInfoContainer}>
              <Image
                source={patientInfo.profilePicture}
                style={styles.profilePicture}
              />
              <View style={styles.patientDetails}>
                <Text style={styles.patientName}>{userData ? userData.name : 'User'}</Text>
              </View>
            </View>
          </View>

          {/* Medical Checklist Card */}
          <View style={styles.medicalChecklistCard}>
            <Text style={styles.checklistTitle}>Personal Information</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.input}>
            <Text style={styles.inputText}>{dob ? dob.toLocaleDateString() : 'Select Date of Birth'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor={'gray'}
              value={age}
              onChangeText={setAge}
            />
          </View>

          <View style={styles.medicalChecklistCard}>
            <Text style={styles.checklistTitle}>Medical History:</Text>
            <TextInput
              style={styles.input}
              placeholder="Previous Pregnancies"
              placeholderTextColor={'gray'}
              value={priorPregnancies}
              onChangeText={setpriorPregnancies}
            />

            <TextInput
              style={styles.input}
              placeholder="Complications"
              placeholderTextColor={'gray'}
              value={complications}
              onChangeText={setcomplications}
            />
            <TextInput
              style={styles.input}
              placeholder="Miscarriages"
              placeholderTextColor={'gray'}
              value={miscariages}
              onChangeText={setmiscariages}
            />
            <TextInput
              style={styles.input}
              placeholder="Gestation"
              placeholderTextColor={'gray'}
              value={currentPregnancyAge}
              onChangeText={setcurrentPregnancyAge}
            />
            <TextInput
              style={styles.input}
              placeholder="Expected Due Date"
              placeholderTextColor={'gray'}
              value={expectedDueDate}
              onChangeText={setexpectedDueDate}
            />

            <TextInput
              style={styles.input}
              placeholder="Additional Information"
              placeholderTextColor={'gray'}
              value={AddiotionalInfo}
              onChangeText={setAddiotionalInfo}
            />
          </View>

          <TouchableOpacity style={styles.chatButton} onPress={updateProfile}>
          {
                isLoading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.chatButtonText}>Update Profile</Text>
          }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 3,
  },
  inputText: {
    color: 'gray',
    paddingTop:7
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
  },
  medicalChecklistCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
  },
  patientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'black'
  },
  chatButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  chatButtonText: {
    color: '#22ece2',
    fontWeight: 'bold',
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
});

export default ProfileScreen;
