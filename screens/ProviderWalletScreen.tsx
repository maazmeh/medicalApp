import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProviderWalletScreen: React.FC = ({navigation}) => {
  const [showBalance, setShowBalance] = useState(true)
  const [isChecked, setChecked] = useState(false);
  const [showPaymentOpt, setShowPaymentOpt] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!isChecked);
  };

  const handlePaymentOptions = () => {
    setShowPaymentOpt(!showPaymentOpt);
  }


  return (
    <View style={styles.container}>
        
    <View style={styles.topRow}>
    <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
      <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
    </TouchableOpacity>
    <Text style={styles.title}>My Wallet</Text>
    </View>

  <View style={styles.screenContainer}>
    <View style={styles.cardContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Account Balance</Text>
        <TouchableOpacity
          style={styles.balanceToggle}
          onPress={() => setShowBalance(!showBalance)}>
          <MaterialIcons
            name={showBalance ? 'visibility-off' : 'visibility'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.amountText}>{'XXXX USD'}</Text>
    </View>



    <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Options</Text>
          <View style={styles.paymentOptionsContainer}>
        <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
          {isChecked && <View style={styles.checkmark} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Payment Method A</Text>
      </View>


      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
          {isChecked && <View style={styles.checkmark} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Payment Method B</Text>
      </View>
      </View>
        </View>
     
      
      
   

       

       </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#ededed'
      },
      topRow: {
        backgroundColor: '#ffffff',
        padding:3
      },
      headingContainer:{
        alignItems:'center',
        paddingTop: 20,
        paddingBottom:20
      },
      headingText:{
        fontSize:20,
        fontWeight: 'bold',
        color:'#ef6ccc'
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
  screenContainer:{
    padding:10
  },

  //card design
  cardBgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toggleText: {
    color: '#007eff',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#ee6dca',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width:'100%',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"white"
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color:"white"
  },
  accountNumberText: {
    fontSize: 14,
    marginBottom: 10,
    color:"white"
  },
  refundTag: {
    backgroundColor: '#4caf50',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: 'gray',
    marginRight: 5
  },
  buttonText:{
    color:'white'
  },
  searchButton: {
    backgroundColor: '#007eff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'pink',
    borderRadius: 3,
  },
  checkboxLabel: {
    color: '#ef6ccc',
    fontSize: 16,
  },
  paymentOptionsContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceToggle: {
    padding: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
    width: '100%',
    flex: 1, // Add flex: 1 to take remaining space
    justifyContent: 'flex-end', // Align options to the bottom
  },
  optionBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8, // Add border radius to all options
  },

  selectedOption: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8, // Add border radius to all options
    color:'white',
    backgroundColor:'white'
  },

  optionIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  optionText: {
    color: '#3498db',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
    marginTop:'10%'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProviderWalletScreen;