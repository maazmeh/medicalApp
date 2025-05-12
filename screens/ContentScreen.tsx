import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  fetchCommunityData,
  fetchExcerciseData,
  fetchNutritionData,
  fetchPregnancyData,
} from '../Providers/http';
import ShowPostModal from '../Providers/ShowPostModal';
import { useIsFocused } from '@react-navigation/native';

const ContentScreen: React.FC = ({navigation, route}) => {
  const {contentType} = route.params;
  const [heading, setHeading] = useState<any>('');
  const [pregnancyData, setPregnancyData] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const isFocused = useIsFocused();



  const openPostModal = (post: any) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const closePostModal = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    if(isFocused){
    console.log('contentType =>', contentType);
    if (contentType === 'pregnancy') {
      setHeading('Pregnancy Wellness');
      fetchData('pregnancy');
    } else if (contentType === 'hotTopics') {
      setHeading('Hot Topics');
      fetchData('hotTopics');
    } 
   }
  }, [route.params, isFocused]);

  const fetchData = (data: any) => {
    if (data === 'pregnancy') {
      setIsLoading(true)
      fetchPregnancyData()
        .then((resp: any) => {
          console.log('resp pregnancy data =>', resp);
          setIsLoading(false)
          setPregnancyData(resp.data);
        })
        .catch((err: any) => {
          console.log('err =>', err);
        });
    } else if (data === 'hotTopics') {
      setIsLoading(true)
      fetchCommunityData()
      .then((resp: any) => {
        console.log('REsp community new =>', resp.data);
        setIsLoading(false)
        setPosts(resp.data);
      })
      .catch((err: any) => {
        console.log('err =>', err);
      });
    }
  }

  const renderItem = ({item}) => (
      <TouchableOpacity
        key={item.id}
        style={styles.blogPostCard}
        onPress={() => openPostModal(item)}>
        <Image source={{uri: `https://dev.dotnetiks.com/midWife${item.image}`}} style={styles.coverImage} />
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postMeta}>
            {item.author} - {item.date}
          </Text>
        </View>
      </TouchableOpacity>
  );


  const renderHotTopics = ({item}) => (
    <TouchableOpacity
    key={item.id}
    style={styles.blogPostCard}
    onPress={() => openPostModal(item)}>
    <Image source={{uri: `https://dev.dotnetiks.com/midWife${item.image}`}} style={styles.coverImage} />
    <View style={styles.postContent}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postMeta}>
        {item.date}
      </Text>
    </View>
  </TouchableOpacity>
  );


  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>{heading}</Text>
      </View>

      <ShowPostModal
        isVisible={isModalVisible}
        postDetails={selectedPost}
        closeModal={closePostModal}
      />

      <ScrollView style={{marginTop: 15}}>
        {contentType === 'pregnancy' ? (
          <View>
            {
              isLoading ?
              <ActivityIndicator size="large" color="white" style={styles.activityIndicate} />
              :
                <FlatList
                data={pregnancyData}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderItem}/>
            }
              
          </View>
        ) : contentType === 'hotTopics' ? (
          <View>
          {
            isLoading ?
            <ActivityIndicator size="large" color="white" style={styles.activityIndicate}/>
            :
             <FlatList
             data={posts}
             keyExtractor={(item, index) => item.id || index.toString()}
             renderItem={renderHotTopics}
            />
          }
        </View>
        ) : null}
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
  activityIndicate:{
    marginTop:'10%'
  },
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
  blogPostCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  postMeta: {
    fontSize: 14,
    color: '#ef74ce',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postContent: {
    padding: 15,
  },
});

export default ContentScreen;
