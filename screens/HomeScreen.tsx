import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  TextInput,
  BackHandler,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import SubscriptionModal from '../Modals/SubscriptionModal';
import {ScrollView} from 'react-native-gesture-handler';
import {
  fetchCommunityData,
  fetchExcerciseData,
  fetchNutritionData,
  fetchPregnancyData,
} from '../Providers/http';
import ShowPostModal from '../Providers/ShowPostModal';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';



const HomeScreen: React.FC = ({navigation}) => {
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const isFocused = useIsFocused();
  const [pregnancyData, setPregnancyData] = useState<any>();
  const [nutritionData, setNutritionData] = useState<any>();
  const [exerciseData, setExerciseData] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const image: any = require('../src/assets/logo.png');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove(); // Cleanup the event listener when component unmounts
  }, []);

  const openPostModal = (post: any) => {
    console.log("post =>", post);
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const closePostModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if(isFocused){
      console.log("userData home =>", userData);
      fetchData();
    }
  }, [isFocused]);

  const fetchData = () => {
    setIsLoading(true)
    fetchPregnancyData()
      .then((resp: any) => {
        setIsLoading(false)
        setPregnancyData(resp.data);
      })
      .catch((err: any) => {
        console.log('err =>', err);
      });

    fetchCommunityData()
      .then((resp: any) => {
        setIsLoading(false)
        setNutritionData(resp.data);
      })
      .catch((err: any) => {
        console.log('err =>', err);
        setIsLoading(false)
      });
  };

  const handleNotesModal = () => {
    console.log('Here');
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const onConfirm = (selectedReason: any) => {
    console.log(`Ride canceled due to: ${selectedReason.reason}`);
    setModalVisible(false);
  };

  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Home</Text>
      </View>

      <ShowPostModal
        isVisible={isModalVisible}
        postDetails={selectedPost}
        closeModal={closePostModal}
      />

      <ScrollView>
        <SubscriptionModal
          modalVisible={modalVisible}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

      {
        userData && userData.isPaid === '0' ?
        
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#69e9e8', '#ee6dca']}
          style={styles.card}>
          <Text style={styles.cardText}>
           Chat with a Midwife now !
          </Text>

          <TouchableOpacity style={styles.payButton} onPress={handleNotesModal}>
            <Text style={styles.payButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </LinearGradient>
        :

        <View>

        </View>
      }
        

        {/* <BannerCarousel /> */}

        {/* Educational Content List */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Knowledge Hub</Text>
        </View>

        {
          isLoading ?
          <ActivityIndicator size="large" color="white"/>
          :
          <FlatList
          data={pregnancyData}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          renderItem={({item}) => (
            <View style={styles.educationalContentItem}>
              <Image source={{uri: `https://dev.dotnetiks.com/midWife${item.image}`}} style={styles.educationalContentImage} />
              <Text style={styles.educationalContentTitle}>{item.title}</Text>
              <Text style={styles.educationalContentDescription}>
                {item.description.length > 50
                  ? `${item.description.substring(0, 50)}...`
                  : item.description}
              </Text>
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => openPostModal(item)}>
                <Text style={styles.readMoreButtonText}>Read More</Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{width: 20}} />} // Add some space between items
        />
        }
        

        {/* Nutritional Content List */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Hot Topics</Text>
        </View>

        {
          isLoading ?
          <ActivityIndicator size="large" color="white"/>
          :
        <FlatList
          data={nutritionData}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          renderItem={({item}) => (
            <View style={styles.educationalContentItem}>
              <Image source={{uri: `https://dev.dotnetiks.com/midWife${item.image}`}} style={styles.educationalContentImage} />
              <Text style={styles.educationalContentTitle}>{item.title}</Text>
              <Text style={styles.educationalContentDescription}>
                {item.description.length > 50
                  ? `${item.description.substring(0, 50)}...`
                  : item.description}
              </Text>
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => openPostModal(item)}>
                <Text style={styles.readMoreButtonText}>Read More</Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{width: 10}} />} // Add some space between items
        />
        }


      </ScrollView>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'white'
  },
  payButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ef72ce',
  },
  payButtonText: {
    color: '#ef72ce',
    fontWeight: 'bold',
    fontSize: 16,
  },
  educationalContentItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5, // Adjust spacing between items
    padding: 10,
    width: 160
  },
  educationalContentImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  educationalContentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  educationalContentDescription: {
    fontSize: 14,
    marginBottom: 10,
    color:'black'
  },
  readMoreButton: {
    backgroundColor: '#ef6ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  readMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  headingContainer: {
    paddingLeft: 10,
    marginTop: 20,
  },
  appointmentheadingContainer: {
    paddingLeft: 10,
    marginTop: 30,
  },
});

export default HomeScreen;
