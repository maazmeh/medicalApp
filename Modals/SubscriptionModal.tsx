import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNIap, { requestSubscription, getSubscriptions, initConnection, purchaseUpdatedListener } from 'react-native-iap';
import { useSelector } from 'react-redux';
import { showToastWithGravity, updateUserPaymentStatus } from '../Providers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


const itemSubs = Platform.select({
  android: ['premium'],
  ios: ['premium'] // Ensure your product ID is correct for iOS
});

const SubscriptionModal = ({ modalVisible, onCancel, onConfirm, navigation }) => {
  const [subscriptionOffers, setSubscriptionOffers] = useState([]);
  const [paymentPackage, setPaymentPackage] = useState<any>(itemSubs);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state:any) => state.user.userData);
 
  const closeModal = () => {
    onCancel();
  }


  useEffect(() => {
    const initializeIAPConnection = async () => {
      try {
        console.log("Initializing IAP connection...");
        await initConnection();
        console.log("IAP connection initialized");
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initializeIAPConnection();

    const purchaseUpdateSubscription = purchaseUpdatedListener((purchase) => {
      console.log('purchaseUpdatedListener', purchase);
      // Handle purchase updates here, such as verifying purchase and granting subscription benefits
    });

  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);
    console.log("Handling purchase for package ==>", paymentPackage);
    try {
      const subscriptions:any = await getSubscriptions({ skus: paymentPackage });
      setSubscriptionOffers(subscriptions);
      console.log("Available subscriptions =>", subscriptions);

      if (subscriptions.length > 0) {
        const productId = subscriptions[0].productId;
        const offerToken = subscriptions[0].subscriptionOfferDetails?.[0]?.offerToken;
        try {
          await requestSubscription({
            sku: productId,
            ...(offerToken && {
              subscriptionOffers: [{ sku: productId, offerToken }],
            }),
          });
          console.log("Subscription request successful");
          updateUserPaymentStatus(userData.id).then((resp:any) => {
            console.log("updateUserPaymentStatus success =>");
            showToastWithGravity('Subscription Successful ! Please Login again to continue...')
            AsyncStorage.setItem('userData', 'empty');
            navigation.navigate('Login');
          }).catch((err:any) => {
            console.log("updateUserPaymentStatus failed =>");
          })
        } catch (error) {
          console.log('requestSubscription error', error);
        }
      } else {
        console.log("No subscriptions found");
      }
    } catch (err) {
      console.log("handlePurchase function error =>", err);
    }
    setIsLoading(false);
  }
  
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
       
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.menuIcon} onPress={closeModal}>
            <AntDesign name="close" size={25} color={'#ef6ccc'} />
          </TouchableOpacity>
            <Text style={styles.title}></Text>
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.heading}>Unlock Exclusive Benefits:</Text>
          <Text style={styles.bulletPoint}>- A months notice is required to cancel the subscription.</Text>
          <Text style={styles.bulletPoint}>- The payment will be taken automatically on a monthly basis unless stopped by the subscriber. </Text>
          <Text style={styles.bulletPoint}>- A subscriber can join and cancel as many times as they like.</Text>
          <Text style={styles.bulletPoint}>- Get all this in £8.99 per month.</Text>
          <TouchableOpacity style={styles.subscribeButton} onPress={ () => handlePurchase()}>
          {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
            )
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  bulletPoint: {
    marginBottom: 10,
    color:'black'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ef6ccc',
    textAlign: 'center',
    marginTop: 14,
  },
});

export default SubscriptionModal;