import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PregnancyWellness: React.FC = ({navigation}) => {


  const showContent = (name:any) => { 
    console.log("showContent =>", name)      
    navigation.navigate('Content', {contentType: name})
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
        <Text style={styles.title}>Knowledge Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {/* List Item: Pregnancy Wellness */}
        <TouchableOpacity style={styles.listItem} onPress={() => {showContent('pregnancy')}}>
          <Image
            source={require('../src/assets/logo.png')}
            style={styles.icon}
          />
          <Text style={styles.itemName}>Pregnancy Wellness</Text>
        </TouchableOpacity>

        {/* List Item: Nutritional Guide */}
        <TouchableOpacity style={styles.listItem} onPress={() => {showContent('nutrition')}}>
          <Image
            source={require('../src/assets/logo.png')}
            style={styles.icon}
          />
          <Text style={styles.itemName}>Hot Topics</Text>
        </TouchableOpacity>

       
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
  listContainer: {
    alignItems: 'center', // Center the items horizontally
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '90%',
    elevation: 3, // Add elevation for a shadow effect
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
});

export default PregnancyWellness;
