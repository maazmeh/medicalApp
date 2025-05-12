import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchCommunityData} from '../Providers/http';

const CommunityScreen: React.FC = ({navigation}) => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchCommunityData()
      .then((resp: any) => {
        console.log('REsp community new =>', resp.data[0].imageUrls[0]);
        setPosts(resp.data);
      })
      .catch((err: any) => {
        console.log('err =>', err);
      });
  };

  const renderItem = ({item}) => (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <View key={item.id} style={styles.postCard}>
        <View style={styles.profileStatus}>
          <View style={styles.details}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Image
            source={{uri : encodeURI('https://dev.dotnetiks.com/midWife/uploads/community/1.jpeg')}}
            style={styles.postImage}
          />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.icons}>
            <AntDesign name="eye" size={20} color="#ef6ccc" />
            <Text style={styles.iconText}>{item.views}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Hot Topics</Text>
      </View>

      <ScrollView>
        <View>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={renderItem}/>
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
  postImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
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
  postCard: {
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 25,
  },
  profileStatus: {
    flexDirection: 'row',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 25,
  },
  statusCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    marginLeft: 'auto',
  },
  details: {
    flex: 1,
  },

  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
    color:'black'
  },
  date: {
    color: 'gray',
    fontSize: 10,
  },
  text: {
    color: '#666',
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 0,
    borderWidth: 1,
    width: '33%',
    borderColor: '#ef6ccc',
  },
  buttonText: {
    color: '#ef6ccc',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  icons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CommunityScreen;
