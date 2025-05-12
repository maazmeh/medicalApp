import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TermsScreen: React.FC = ({ navigation }) => {
  return (
    <ImageBackground
    source={require('../src/assets/checkbg.png')}
    style={styles.backgroundImage}>
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <View style={{padding:10}}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
              <Text style={styles.modalText}>
                Welcome to Midwife Messenger (the "App"). These Terms and Conditions ("Terms") govern your use of our antenatal and postnatal advice services ("Services"). By downloading, installing, or using the App, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the App.
              </Text>

                <Text style={styles.sectionTitle}>2. Privacy Policy</Text>
                <Text style={styles.modalText}>
                  Your use of the App is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the App, you agree to the terms of the Privacy Policy.
                </Text>

                <Text style={styles.sectionTitle}>3. Eligibility</Text>
                <Text style={styles.modalText}>
                  The App is designed for users from early pregnancy to 28 days postnatal. By using the App, you confirm that you fall within this category.
                </Text>

                <Text style={styles.sectionTitle}>4. Account Registration and Fees</Text>
                <Text style={styles.modalText}>
                  To use the Services, you must create an account by providing accurate and complete information and agree to the subscription fee of £8.99 per month. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </Text>

                <Text style={styles.sectionTitle}>5. Subscription and Payments</Text>
                <Text style={styles.modalText}>
                  Subscription Fee: £8.99 per month.
                </Text>
                <Text style={styles.modalText}>
                  Payment Method: Auto monthly payments until you unsubscribe and stop the payments.
                </Text>
                <Text style={styles.modalText}>
                  Cancellation Policy: You must provide a one-month notice to cancel your subscription. Cancellation will take effect at the end of the current billing cycle after the notice period. You are free to resubscribe to Midwife Messenger if you choose to.
                </Text>
                <Text style={styles.modalText}>
                  Messages: You are entitled to an unlimited amount of messages and responses.
                </Text>

                <Text style={styles.sectionTitle}>6. Service Availability</Text>
                <Text style={styles.modalText}>
                  A qualified midwife is available from 0900-2100, 7 days a week, 365 days a year. While we aim to provide instant responses where possible, we guarantee a response within 24 hours of the original message.
                </Text>

                <Text style={styles.sectionTitle}>7. Nature of Advice</Text>
                <Text style={styles.modalText}>
                  The advice provided through the App is antenatal and postnatal advice only and is NOT medical advice. You agree to seek all medical advice from your NHS maternity service provider, such as your community midwife, GP, Obstetrician or your Maternity Triage. Any urgent medical needs must be reported by you appropriately to 111 or 999. You should seek further information from NHS Maternity Services if you are unsure or disagree with the advice provided by Midwife Messenger.
                </Text>

                <Text style={styles.sectionTitle}>8. Urgent Medical Enquiries</Text>
                <Text style={styles.modalText}>
                  You agree not to await a response from Midwife Messenger before seeking advice if your enquiry is urgent or medical. This service does not replace routine maternity care provided by the NHS, and you agree to continue accessing NHS care as directed by your community midwife, GP, and obstetric consultant.
                </Text>

                <Text style={styles.sectionTitle}>9. Quality of Advice</Text>
                <Text style={styles.modalText}>
                  All advice given on Midwife Messenger is based on credible, professional sources of evidence-based information. Midwife Messenger will not be held responsible for your actions following the advice given.
                </Text>

                <Text style={styles.sectionTitle}>10. User Information</Text>
                <Text style={styles.modalText}>
                  The advice provided by the midwife is based on the information you provide. Midwife Messenger will not be held responsible if the information given by you is incorrect or misunderstood.
                </Text>

                <Text style={styles.sectionTitle}>11. Confidentiality and Use of Advice</Text>
                <Text style={styles.modalText}>
                  The advice given is intended for the subscribed user only and not for a third party. You agree not to share, screenshot, or distribute the advice provided by Midwife Messenger on social media or any other platform.
                </Text>

                <Text style={styles.sectionTitle}>12. Disclaimer of Warranties</Text>
                <Text style={styles.modalText}>
                  The App is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the App will be uninterrupted, error-free.
                </Text>

                <Text style={styles.sectionTitle}>13. Acceptable Use</Text>
                <Text style={styles.modalText}>
                  You agree not to use the App for any unlawful or prohibited activities, including but not limited to:
                </Text>
                <Text style={styles.modalText}>
                  - Harassing, threatening, or defaming others.
                </Text>
                <Text style={styles.modalText}>
                  - Sending spam or unsolicited messages.
                </Text>
                <Text style={styles.modalText}>
                  - Sharing content that is illegal, offensive, or violates the rights of others.
                </Text>
                <Text style={styles.modalText}>
                  - Impersonating any person or entity.
                </Text>

                <Text style={styles.sectionTitle}>14. Limitation of Liability</Text>
                <Text style={styles.modalText}>
                  To the maximum extent permitted by law, Midwife Messenger shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the App.
                </Text>

                <Text style={styles.sectionTitle}>15. Termination</Text>
                <Text style={styles.modalText}>
                  Midwife Messenger reserves the right to terminate or suspend your account and access to the App at our sole discretion, without notice, if you violate these Terms or engage in any activity that we deem harmful to the App or its users.
                </Text>

                <Text style={styles.sectionTitle}>16. Indemnification</Text>
                <Text style={styles.modalText}>
                  You agree to indemnify and hold harmless Midwife Messenger, its affiliates, and its and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way connected with your use of the App or violation of these Terms.
                </Text>

                <Text style={styles.sectionTitle}>17. Changes to the Terms</Text>
                <Text style={styles.modalText}>
                  We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on the App. Your continued use of the App after any changes indicates your acceptance of the new Terms.
                </Text>

                <Text style={styles.sectionTitle}>18. Governing Law</Text>
                <Text style={styles.modalText}>
                  These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.
                </Text>

                <Text style={styles.sectionTitle}>19. Contact Us</Text>
                <Text style={styles.modalText}>
                  If you have any questions about these Terms, please contact us at midwiferymessenger@gmail.com.
                </Text>
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
    color: 'white',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
  },
  modalContent: {
    backgroundColor: 'transparent',
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
    color:'black'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color:'black'
  },
});

export default TermsScreen;