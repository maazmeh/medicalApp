import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { uploadNotes } from '../Providers/http';

const AddNotes = ({ modalVisible, onCancel, onConfirm, patientData }) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [noteData, setNoteData] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setNoteData(prevState => ({ ...prevState, date: currentDate }));
  }, []);

  useEffect(() => {
    console.log("patientData =>", patientData);
  },[patientData])

  const addNote = () => {
    if (noteData.title && noteData.description && noteData.date) {
      setIsLoading(true);
      setNoteData({
        title: '',
        description: '',
        date: '',
      });
      console.log("noteData ==>", noteData);
      uploadNotes(patientData.patientId,noteData.date,noteData.title,noteData.description,patientData.midwifeId).then((resp:any) => {
        console.log("resp uploadnotes =>", resp)
        setIsLoading(false);
        onConfirm(noteData);
      }).catch((err:any) => {
        console.log("err uploadnotes =>", err);
      })
    } else {
      console.log('Please fill in all fields');
    }
  };

  const closeModal = () => {
    onCancel();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>

        <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={closeModal}>
          <AntDesign name="close" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Consultation Note</Text>
        </View>

        <View style={styles.modalContent}>
            {/* Title Input */}
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={'black'}
              value={noteData.title}
              onChangeText={(text) => setNoteData({ ...noteData, title: text })}
            />

            {/* Description Input */}
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Description"
              placeholderTextColor={'black'}
              multiline
              value={noteData.description}
              onChangeText={(text) => setNoteData({ ...noteData, description: text })}
            />

            {/* Date Input */}
            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Date"
              placeholderTextColor={'black'}
              value={noteData.date}
              editable={false}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={addNote}>
            {
                isLoading ?
                <ActivityIndicator size="small" color="white" />
                : 
                <Text style={styles.saveButtonText}>Save</Text>
            }
            </TouchableOpacity>
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    backgroundColor: '#ededed'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'black'
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  dropdownButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dropdownText: {
    color: 'black',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding:3
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
    marginTop:14
  },
});

export default AddNotes;