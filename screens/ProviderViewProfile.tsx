import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddNotes from '../Modals/AddNotes';
import { fetchNotes } from '../Providers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProviderViewProfile: React.FC = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState<any>();
  const [midWifeId, setMidWifeId] = useState<any>();
  const [patientData, setPatientData] = useState<any>();
  const { clientData } = route.params;
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [modalVisible2, setModalVisible2] = useState(false);

  // Dummy patient data
  const patientInfo = {
    name: 'John Doe',
    profilePicture: require('../src/assets/logo.png'),
    dateOfBirth: 'January 1, 1990',
    pregnancyDuration: '25 weeks',
  };


  useEffect(()=> {
    console.log("HomeScreen Called");
    AsyncStorage.getItem('userData').then((resp:any) => {
      if(resp === 'empty'){
      } else {
      const parsedData = JSON.parse(resp);
      console.log("parsed Data on Home =>", parsedData.id);
      setMidWifeId(parsedData.id);
      }
    }).catch((err:any) => {
      console.log("error while fetching data =>", err);
    })
  },[])

  useEffect(() => {
    console.log("clientData =>", clientData.dob);
    fetchNotesData(clientData.userId);
  },[clientData])

  const fetchNotesData = (patientId:any) => {
    fetchNotes(patientId).then((resp:any) => {
      console.log("fetch Data from notes =>", resp);
      setNotes(resp);
    }).catch((err:any) => {
      console.log("err in fetch data =>", err);
    })
  }

  const openChat = () => {
    navigation.navigate('ProviderChatScreen', {connectionId:clientData.chatConnectionID});
  }

  const handleNotesModal = () => {
    console.log("Here");
    let d:any = {patientId: clientData.userId, midwifeId: midWifeId};
    setPatientData(d);
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const onConfirm = (response: any) => {
    console.log("onConfirm =>", response);
    fetchNotesData(clientData.userId);
    setModalVisible(false);
  }

  const openNotes = (note:any) => {
    console.log("note =>", note);
    setSelectedNote(note);
    setModalVisible2(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setModalVisible2(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate('ProviderHome')}>
          <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Patient Details</Text>
      </View>


      <ScrollView>
      <View style={{padding:20}}>

      <AddNotes modalVisible={modalVisible} onCancel={onCancel} onConfirm={onConfirm} patientData={patientData} />

      
      <View style={styles.card}>
        <View style={styles.patientInfoContainer}>
          <Image
          source={clientData ? { uri: clientData.profilePicture } : require('../src/assets/logo.png')}
          style={styles.profilePicture}
        />
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{clientData.name}</Text>
            <Text style={{color:'black'}}>Date of Birth: {clientData.dob}</Text>
            <Text style={{color:'black'}}>Gestation: {clientData.currentPregnancyAge}</Text>
            <Text style={{color:'black'}}>Addiotional Info: {clientData.AddiotionalInfo}</Text>
            <Text style={{color:'black'}}>Age: {clientData.age}</Text>
            <Text style={{color:'black'}}>Complications: (if any) {clientData.complications}</Text>
            <Text style={{color:'black'}}>Email: {clientData.email}</Text>
            <Text style={{color:'black'}}>Expected Due Date: {clientData.expectedDueDate}</Text>
            <Text style={{color:'black'}}>Medical History: {clientData.familyMedicalHistory}</Text>
            {/* <Text>isPaid: {clientData.isPaid}</Text> */}
            <Text style={{color:'black'}}>Miscariages:(if any) {clientData.miscariages}</Text>
            <Text style={{color:'black'}}>Contact Number: {clientData.phoneNumber}</Text>
            <Text style={{color:'black'}}>Prior Pregnancies: {clientData.priorPregnancies}</Text>
            <Text style={{color:'black'}}>Reported On: {clientData.reportedOn}</Text>
          </View>
        </View>
      </View>

    
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consultation Notes</Text>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.noteItem} onPress={() => openNotes(item)}>
                <Text style={styles.noteTitle}>{item.notesTitle}</Text>
                <Text style={styles.noteDate}>Date: {item.notesDate}</Text>
              </TouchableOpacity>
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


      {selectedNote && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible2}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedNote.notesTitle}</Text>
              <Text style={styles.modalDate}>Date: {selectedNote.notesDate}</Text>
              <Text style={styles.modalDetail}>{selectedNote.notesDescription}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}



      </ScrollView>
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
    color: '#ef6ccc',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
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
    color: '#ef6ccc',
  },
  noteDate: {
    color: '#777',
    marginTop: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ef6ccc',
  },
  modalDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    marginBottom: 20,
    color:'black'
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProviderViewProfile;