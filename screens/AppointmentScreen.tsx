import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { sidebarStyles } from '../Providers/Styles';
import AppointmentsModal from '../Providers/AppointmentsModal';

const AppointmentScreen: React.FC = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('current');
  const [isModalVisible, setIsModalVisible] = useState<any>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-02-20', day: 'Monday', status: 'Done' },
    { id: 2, date: '2024-02-20', day: 'Monday', status: 'Done' },
    { id: 3, date: '2024-02-20', day: 'Monday', status: 'Done' },
    { id: 4, date: '2024-02-23', day: 'Thursday', status: 'Requested' },
  ]);

  const requestAppointment = () => {
    console.log("Requesting new appointment...");
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedTab === 'current') {
      return appointment.status === 'Done';
    } else {
      return appointment.status === 'Requested';
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
            <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
          </TouchableOpacity>
          <Text style={styles.title}>My Appointments</Text>
        </View>

        <AppointmentsModal isVisible={isModalVisible} closeModal={toggleModal} />

    <View style={sidebarStyles.switchCardContainer}>
      <View style={sidebarStyles.header}>
        <TouchableOpacity
          style={[sidebarStyles.tabButton, selectedTab === 'current' && sidebarStyles.selectedTab]}
          onPress={() => handleTabChange('current')}>
          <Text style={[sidebarStyles.tabText, selectedTab === 'current' && sidebarStyles.selectedTabText]}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[sidebarStyles.tabButton, selectedTab === 'requested' && sidebarStyles.selectedTab]}
          onPress={() => handleTabChange('requested')}>
          <Text style={[sidebarStyles.tabText, selectedTab === 'requested' && sidebarStyles.selectedTabText]}>Requested</Text>
        </TouchableOpacity>
      </View>
      <View style={sidebarStyles.content}>
      {filteredAppointments.map(appointment => (
            <View key={appointment.id} style={styles.appointmentItem}>
              <Text>{appointment.date}</Text>
              <Text>{appointment.day}</Text>
              <Text>{appointment.status}</Text>
            </View>
          ))}
      </View>
    </View>


      <TouchableOpacity style={styles.requestButton} onPress={toggleModal}>
        <Text style={styles.requestButtonText}>Request New Appointment</Text>
      </TouchableOpacity>


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
  appointmentList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 0,
  },
  requestButton: {
    backgroundColor: '#ef6ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    marginTop:20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AppointmentScreen;