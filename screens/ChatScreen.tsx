import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ToastAndroid,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchAllChats, fetchMyReports, insertChat, uploadDocument} from '../Providers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Sound from 'react-native-sound';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import RNFS from 'react-native-fs';

const ChatScreen: React.FC = ({navigation, route}) => {
  const userData = useSelector((state:any) => state.user.userData);
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  let {data} = route.params;
  const [chatData, setChatData] = useState<any>();
  const [savedMessages, setSavedMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Messages'); // State to track the selected option
  const [userInput, setUserInput] = useState('');
  const [suggestedResponse, setSuggestedResponse] = useState<any>(null);
  const [clickSound, setClickSound] = useState<any>(); 
  const [attachments, setattachments] = useState<any>();

  useEffect(() => {
    let clickSound:any = new Sound(require('../src/assets/sound/clickSound.wav'), (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
      } else {
        setClickSound(clickSound);
      }
    });
    },[])


  const sendButtonSound = () => {
    clickSound.play((success:any) => {
      if (!success) {
        console.log('Sound playback failed');
      } else {
        console.log("sound played =>");
      }
    });
  }


  useEffect(() => {
    if (isFocused) {
      // Reset all relevant state when the screen is focused
      setChatData([]);
      setUserInput('');
      setattachments([]);
      
        getMychats(data.sno);  
        fetchUserDocs(userData.id)

      
      const interval = setInterval(() => {
        getMychats(data.sno);
        fetchUserDocs(userData.id)
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const getMychats = (id: any) => {
    fetchAllChats(id)
      .then((resp: any) => {
        setChatData(resp.data);
      })
      .catch((err: any) => {
        console.log('getMychats err =>', err);
      });
  };


  const handleLongPress = (item: any) => {
    console.log('item =>', item);
    saveMessage(item);
  };

  const saveMessage = async (message: any) => {
    try {
      // Retrieve existing saved messages from AsyncStorage
      const savedMessages = await AsyncStorage.getItem('savedMessages');
      let updatedSavedMessages = [];
      if (savedMessages) {
        updatedSavedMessages = JSON.parse(savedMessages);
      }
      // Add the new message to the saved messages
      updatedSavedMessages.push(message);
      await AsyncStorage.setItem(
        'savedMessages',
        JSON.stringify(updatedSavedMessages),
      );
      setSavedMessages(updatedSavedMessages);
      ToastAndroid.show('Message saved successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error saving message:', error);
      // Handle errors, if any
    }
  };

  const handleRightIconPress = () => {
    navigation.navigate('SavedMessages', { data });
  }


  const renderChatBubble = ({item}) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={[
        styles.chatBubble,
        item.textType === 'user'
          ? styles.userChatBubble
          : styles.otherChatBubble,
      ]}>
      <Text
        style={item.textType === 'user' ? styles.chatText : styles.otherchatText}>
        {item.message}
      </Text>
      <Text style={item.textType === 'user' ? styles.messageDate : styles.otherMessageDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderAttachmentItem = ({ item }) => (
    <TouchableOpacity style={styles.attachmentItem} onPress={() => handleDownloadAttachment(item.reportURL)}>
      <Text style={styles.attachmentName}>{item.filename}</Text>
      <Text style={styles.attachmentDate}>{item.uploadedOn}</Text>
      <AntDesign name="download" size={24} color="black" />
    </TouchableOpacity>
  );

  const handleDownloadAttachment = async (url:any) => {
    try {
      console.log('Downloading attachment:', url);
      let updateURL = url.replace('/reports/', '/reports%2F');
      console.log('Modified URL:', updateURL);
      const supported = await Linking.canOpenURL(updateURL);
      if (supported) {
        await Linking.openURL(updateURL);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const chat = () => {
    try {
      sendButtonSound();
      console.log("data =>", data);
      insertChat(data.sno, userInput, data.midWifeID).then((resp:any) => {
      console.log("resp");
      setUserInput('');
      getMychats(data.sno);
      }).catch((err:any) => {
        console.log("error while insert chat ==>", err);
      })
    } catch (error) {
      console.log("err => chat");
    }
  }

  const fetchUserDocs = (userId:any) => {
    fetchMyReports(userId).then((resp:any) => {
      console.log("resp from fetch docs =>", resp.data);
      setattachments(resp.data);
    }).catch((err:any) => {
      console.log("err fetching reports =>", err);
    })
  }

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }

  const handleUserInput = (text: string) => {
    setUserInput(text);
  }

  const requestStoragePermission = async () => {
    try {
      const permission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (permission === 'granted') {
        console.log('Storage permission granted');
        uploadAttachment();
      } else {
        console.log('Storage permission denied');
        // Handle the case where permission is denied
      }
    } catch (error) {
      console.log('Error requesting permission:', error);
    }
  }

  const uploadAttachment = async () => {
    try {
      const res:any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Picked file:', res);

      const uri = res[0].uri;
      const filename = res[0].name;

      // Copy the file to a location accessible by Firebase
      const destPath = `${RNFS.TemporaryDirectoryPath}/${filename}`;
      await RNFS.copyFile(uri, destPath);

      const storageRef = storage().ref(`reports/${filename}`);
      const task = storageRef.putFile(destPath);

      task.on('state_changed', (taskSnapshot) => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });

      await task;
      const url = await storageRef.getDownloadURL();
      console.log('File uploaded to Firebase Storage:', url);
      uploadDocument(userData.id, filename ,url).then((resp:any) => {
        console.log("Upload Success");
        fetchUserDocs(userData.id);
      }).catch((err:any) => {
        console.log("err while uploading Document");
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error uploading file:', err);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate('Messages')}>
          <AntDesign name="arrowleft" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}></Text>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => handleRightIconPress()}>
          <AntDesign name="hourglass" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={[
            styles.optionButtonLeft,
            selectedOption === 'Messages' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('Messages')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Messages' && styles.selectedOptionText,
            ]}>
            Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'Attachments' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('Attachments')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Attachments' && styles.selectedOptionText,
            ]}>
            Attachments
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {selectedOption === 'Messages' ? (
          <View style={styles.chatContainer}>
            <FlatList
              data={chatData}
              renderItem={renderChatBubble}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.chatList}
              ref={flatListRef}
              onContentSizeChange={scrollToBottom}
              onLayout={scrollToBottom}
              inverted
            />

      {suggestedResponse ? (
        <View>
          <Text>Suggested Response:</Text>
          <Text>{suggestedResponse}</Text>
        </View>
      ) : null}


          </View>
        ) : (
          <View style={styles.attachmentContainer}>
            <FlatList
              data={attachments}
              renderItem={renderAttachmentItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </ScrollView>

      {selectedOption === 'Messages' ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#777"
            onChangeText={handleUserInput}
            value={userInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={chat}>
            <AntDesign name="login" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={{paddingLeft:20, paddingRight:20}} onPress={requestStoragePermission}>
          <View style={styles.loginButton}><Text style={styles.loginButtonText}>Upload File</Text></View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5ef',
  },
  webview: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chatList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#66b2b2',
  },
  otherChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  chatText: {
    color: '#ffff',
    fontSize: 16,
  },
  messageDate: {
    color: '#000',
    fontSize: 12, 
    textAlign: 'right',
  },
  otherMessageDate:{
    color: '#ef6ccc',
    fontSize: 12,
    textAlign: 'right',
  },
  otherchatText: {
    color: 'black',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#66b2b2',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  fullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22ece2',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  attachmentButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    color:'black'
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
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
  rightIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#ef6ccc',
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionButtonLeft: {
    paddingVertical: 10,
  },
  optionText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: 'white',
  },
  selectedOptionText: {
    color: '#ef6ccc',
    textDecorationLine: 'underline',
  },
  attachmentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    backgroundColor:'white'
  },
  attachmentName: {
    fontSize: 16,
    color:'black'
  },
  attachmentDate: {
    fontSize: 14,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#ef6ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  suggestedResponseContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  suggestedResponseText: {
    color: '#333',
  },
});

export default ChatScreen;
