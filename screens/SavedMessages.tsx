import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SavedMessages: React.FC = ({ route, navigation }) => {
  const { data } = route.params;
  const [savedMessages, setSavedMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('savedMessages');
        if (storedMessages !== null) {
          setSavedMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error fetching saved messages:', error);
      }
    };

    fetchData();
  }, [data]);

  const back = () => {
    navigation.navigate('Chat', { data });
  };

  const deleteMessage = async (messageIndex: number) => {
    try {
      const updatedMessages = savedMessages.filter((_, index) => index !== messageIndex);
      await AsyncStorage.setItem('savedMessages', JSON.stringify(updatedMessages));
      setSavedMessages(updatedMessages);
      Alert.alert('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      Alert.alert('Failed to delete message');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => back()}>
          <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Messages</Text>
      </View>

      <View style={{ padding: 12 }}>
        <FlatList
          data={savedMessages}
          renderItem={({ item, index }) => (
            <View style={styles.savedMessage}>
              <Text style={styles.savedMessageText}>{item.message}</Text>
              <Text style={styles.savedMessageDate}>{item.date}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    'Delete Message',
                    'Are you sure you want to delete this message?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', onPress: () => deleteMessage(index) },
                    ]
                  )
                }>
                <AntDesign name="delete" size={20} color={'#fff'} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  savedMessage: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ef6ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedMessageText: {
    fontSize: 16,
    color:'black'
  },
  savedMessageDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#008080',
    padding: 8,
    borderRadius: 5,
  },
});

export default SavedMessages;