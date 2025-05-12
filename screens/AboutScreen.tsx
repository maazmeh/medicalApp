import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchAboutUsInfo } from '../Providers/http';

const AboutScreen: React.FC = ({ navigation }) => {
  let [ourMission, setOurMission] = useState<any>();
  let [ourVision, setOurVision] = useState<any>();
  let [ourValues, setOurValues] = useState<any>();

  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
    <ScrollView>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>About Us</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View>
                <Text style={styles.modalText}>
                  Our mission is to provide reliable, friendly, and professional instant messenger advice service to help bridge the gap in over stretched NHS maternity services. We are dedicated to supporting women through the antenatal and postnatal period by providing you with reliable and evidence-based advice, ensuring that we are there for women and their families from the start of their pregnancy up to 28 days postnatal.
                </Text>
                <Text style={styles.modalText}>
                  We aim to complement the NHS maternity services to provide confidential and dependable maternity advice.
                </Text>
                <Text style={styles.modalText}>
                  With our service, it's like having your own midwife in your pocket, ready to answer as many questions as you have—no matter how embarrassing or silly you think the questions may be—from the comfort of your own phone or tablet, from 0900-2100, 7 days a week, 356 days a year.
                </Text>
              </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <View>
          <Text style={styles.modalText}>
          With 13 years of experience as a midwife, I've had the privilege of working across the UK at various NHS Trust hospitals. My motivation for developing this instant messenger service stems from a desire to bridge the gap between the information provided by the NHS maternity services and the widespread lack of knowledge about basic aspects of pregnancy, labour, birth, and the postnatal period.</Text>
          <Text style={styles.modalText}> Throughout my career, I've been frustrated by the time constraints inherent in NHS maternity appointments, which often limit the level of service I can provide. I am passionate about giving more to the women I care for. I want them to feel empowered, strong, and confident during this challenging yet incredible time in their lives. I believe that information is key to achieving this.
          By offering an instant messenger service available from 09:00 to 21:00 every day, I aim to provide continuous support, reassurance, and credible information. This service will help improve women’s maternity experiences by making them feel supported and informed. No topic is off-limits in our safe, confidential environment where women can message as much as they like, ensuring they receive the help and answers they need.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View>
                <Text style={styles.modalText}>
                  Midwife Messenger is a midwifery-led service, we are committed to providing a professional, friendly, confidential service grounded in evidence-based advice. Our practice is built on years of NHS experience, ensuring that our care is both up-to-date and compliant with NMC standards.
                </Text>
                <Text style={styles.modalText}>We prioritise:</Text>
                <Text style={styles.subSectionTitle}>Professional Service</Text>
                <Text style={styles.modalText}>Delivering high-quality, respectful, and compassionate care advice.</Text>
                <Text style={styles.subSectionTitle}>Evidence-Based Advice</Text>
                <Text style={styles.modalText}>Utilising the latest research and best practices to inform our guidance.</Text>
                <Text style={styles.subSectionTitle}>NHS Experience</Text>
                <Text style={styles.modalText}>Drawing on extensive experience within the NHS to offer reliable and trusted care.</Text>
                <Text style={styles.subSectionTitle}>NMC Compliance</Text>
                <Text style={styles.modalText}>Adhering to all guidelines and standards set by the Nursing and Midwifery Council to ensure safe and effective practice.</Text>
              </View>
      </View>

      {/* Add more sections as needed */}

    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ef6ccc',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color:'black'
  },
});

export default AboutScreen;