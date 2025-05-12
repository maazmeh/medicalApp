import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ViewPatientScreen: React.FC = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy patient data
  const patientInfo = {
    name: 'John Doe',
    profilePicture: require('../src/assets/logo.png'),
    dateOfBirth: 'January 1, 1990',
    pregnancyDuration: '25 weeks',
  };

  // Dummy report data
  const reportData = [
    {id: 1, testName: 'Ultrasound'},
    {id: 2, testName: 'Blood Test'},
    {id: 3, testName: 'X-Ray'},
    // Add more report data as needed
  ];

  // Dummy notes data
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', date: '2024-02-14' },
    { id: 2, title: 'Note 2', date: '2024-02-15' },
    // Add more notes as needed
  ]);

  const openChat = () => {
    navigation.navigate('Chat');
  }

  const handleNotesModal = () => {
    console.log("Here");
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const onConfirm = (selectedReason: any) => {
    console.log(`Ride canceled due to: ${selectedReason.reason}`);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Patient Details</Text>
      </View>


      <ScrollView>
      <View style={{padding:20}}>

      {/* <AddNotes modalVisible={modalVisible} onCancel={onCancel} onConfirm={onConfirm} /> */}

      
      <View style={styles.card}>
        <View style={styles.patientInfoContainer}>
          <Image
            source={patientInfo.profilePicture}
            style={styles.profilePicture}
          />
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patientInfo.name}</Text>
            <Text>Date of Birth: {patientInfo.dateOfBirth}</Text>
            <Text>Pregnancy Duration: {patientInfo.pregnancyDuration}</Text>
          </View>
        </View>
      </View>

      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reports</Text>
        {reportData.map(report => (
          <View style={styles.reportItem} key={report.id}>
            <Text>{report.testName}</Text>
            <TouchableOpacity style={styles.viewReportButton}>
              <Text style={styles.viewReportButtonText}>Download Report</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>


        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consultation Notes</Text>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDate}>Date: {item.date}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={() => <Text>No notes available</Text>}
          />
          <TouchableOpacity style={styles.addNoteButton} onPress={()=> handleNotesModal()}>
            <Text style={styles.addNoteButtonText}>Add New Note</Text>
          </TouchableOpacity>
        </View>

     
      <TouchableOpacity style={styles.chatButton} onPress={openChat}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>

      </View>



      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5ef',
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
  card: {
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewReportButton: {
    backgroundColor: '#22ece2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  viewReportButtonText: {
    color: 'grey',
    fontWeight: 'bold',
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
  noteItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addNoteButton: {
    backgroundColor: '#ee6dca',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addNoteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteTitle: {
    fontWeight: 'bold',
  },
  noteDate: {
    color: '#777',
    marginTop: 5,
  },
});

export default ViewPatientScreen;
