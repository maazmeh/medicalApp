import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import { fetchAllPredinedCategories, fetchAllQuestionAnswers } from '../Providers/http';
import Collapsible from 'react-native-collapsible';

let data:any = [
  {note: 'Thank you for your message. The estimated response time is currently 60 minutes. We will get back to you as soon as possible.  For urgent medical assistance, please get in touch with your local maternity unit, call 111, or dial 999 if it is an emergency. This is not a medical advice service.'},
  {note: 'Midwife Messenger is open between 9 am and 9 pm. We look forward to chatting with you when we are open. For urgent medical assistance, please get in touch with your local maternity unit, call 111, or dial 999 if it is an emergency. This is not a medical advice service.'},
  {note: 'We are currently experiencing a high volume of messages, we will respond to you as soon as possible. For urgent medical assistance, please get in touch with your local maternity unit, call 111, or dial 999 if it is an emergency. This is not a medical advice service.'}
];


const PredefinedMessages = ({navigation}) => {
  const isFocused = useIsFocused();
  const [viewTopic, setViewTopic] = useState<any>(true);
  const [predefinedTopics, setPredefinedTopics] = useState<any>();
  const [predefinedMessages, setPredefinedMessages] = useState<any>();
  const [topicName, setTopicName] =  useState<any>();
  const [expandedItem, setExpandedItem] = useState(null);

  const onConfirm = () => {
    console.log('onConfirm =>');
  };

  useEffect(() => {
    if(isFocused){
      createTwoButtonAlert();
      fetchData();
    }
  },[isFocused])


  const fetchData = () => {
    try {
      fetchAllPredinedCategories().then((resp:any) => {
        console.log("predined Messages resp =>", resp.data);
        setPredefinedTopics(resp.data);
      }).catch((err:any) => {
        console.log("err =>", err);
      })
    } catch (error) {
      console.log("err =>", error);
    }
  }


  const createTwoButtonAlert = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
    Alert.alert('Disclaimer', data[randomNumber].note ? data[randomNumber].note : "Midwife Messenger is currently closed. Our operating hours are 09:00 to 21:00. We look forward to responding to your message in the morning. For urgent medical assistance, please contact your local maternity unit, call 111, or dial 999 if it is an emergency. This is not a medical advice service..", [
      {text: 'OK', onPress: () => {
        console.log('OK Pressed');
      }},
    ]);
  }

  const showTopic = (topic:any) => {
    try {
      console.log("show Topic =>", topic.category);
      setTopicName(topic.category);
       fetchAllQuestionAnswers(topic.category).then((resp:any) => {
        console.log("fetchAllQuestionAnswers resp =>", resp.data);
        setPredefinedMessages(resp.data);
        setViewTopic(false);
      }).catch((err:any) => {
        console.log("err =>", err);
      })
    } catch (error) {
      console.log("err =>", error);
    }
  }

  const goBack = () => {
    setViewTopic(true);
  }
  

  const renderTopic = ({ item }) => (
    <TouchableOpacity style={styles.subscribeButton} onPress={() => { showTopic(item) }}>
      <Text style={styles.subscribeButtonText}>{item.category}</Text>
    </TouchableOpacity>
  );

  const renderMessages = ({ item }) => (
    <View style={styles.questionBox}>
      <Text style={styles.subscribeButtonText}>{item.question}</Text>
      <Text style={styles.answerButtonText}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {viewTopic ? (
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => navigation.navigate('Messages')}>
              <AntDesign name="closecircle" size={25} color={'#ef6ccc'} />
            </TouchableOpacity>
            <Text style={styles.title}>Chat Bot</Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Select which topic you are interested in:</Text>
            <FlatList
              data={predefinedTopics}
              renderItem={renderTopic}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => goBack()}>
              <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
            </TouchableOpacity>
            <Text style={styles.title}>{topicName ? topicName : ''}</Text>
          </View>
          <View style={styles.modalContent}>
            <FlatList
              data={predefinedMessages}
              renderItem={renderMessages}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up full space
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
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flex: 1, // Ensure modal content takes up full available space
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  questionBox: {
    backgroundColor: '#ef6ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  subscribeButton: {
    backgroundColor: '#ef6ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  answerButtonText: {
    color: 'black',
    fontSize: 12,
  },
});

export default PredefinedMessages;