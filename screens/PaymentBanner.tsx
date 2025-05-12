import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PaymentBanner = ({navigation}) => {
  const onConfirm = () => {
    console.log('onConfirm =>');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate('Home')}>
          <AntDesign name="closecircle" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Pay to Upgrade</Text>
      </View>

      <View style={styles.modalContent}>
        <Text style={styles.heading}>Unlock Exclusive Benefits:</Text>
        <Text style={styles.bulletPoint}>
          - Selected Feature is a Premium Feature.
        </Text>
        <Text style={styles.bulletPoint}>
          - A months notice is required to cancel the subscription.
        </Text>
        <Text style={styles.bulletPoint}>
          - The payment will be taken automatically on a monthly basis unless
          stopped by the subscriber.{' '}
        </Text>
        <Text style={styles.bulletPoint}>
          - A subscriber can join and cancel as many times as they like.
        </Text>
        <Text style={styles.bulletPoint}>
          - Get all this in £8.99 per month.
        </Text>
        <TouchableOpacity style={styles.subscribeButton} onPress={onConfirm}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
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
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bulletPoint: {
    marginBottom: 10,
    color: 'black'
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
});

export default PaymentBanner;
