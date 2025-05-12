import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ViewDetails: React.FC = ({route, navigation}) => {
  const { title } = route.params;

  useEffect(() => {
    console.log("View Details title =>", title);
  },[title])

  return (
    <View style={styles.container}>
    <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('ProviderSetting')}>
        <AntDesign name="left" size={25} color={'#ef6ccc'} />
       </TouchableOpacity>
      <Text style={styles.title}>{title ? title : ''}</Text>
    </View>
      <ScrollView style={styles.contentContainer}>

        
      {title === 'Terms & Conditions' && (
         <View style={styles.termsBox}>
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
     )}

            {title === 'About Us' && (
              <View>
                <Text style={styles.sectionTitle}>About Us</Text>
                <Text style={styles.modalText}>This is about us...</Text>
                {/* Add more components specific to About Us here */}
              </View>
            )}

            {title === 'Privacy Policy' && (
              <View>
                <Text style={styles.sectionTitle}>Privacy Policy</Text>
                <Text style={styles.modalText}>This is the privacy policy...</Text>
                {/* Add more components specific to Privacy Policy here */}
              </View>
            )}

            {title === 'Our Values' && (
              <View>
                <Text style={styles.sectionTitle}>Our Values</Text>
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
            )}

            {title === 'Our Mission' && (
              <View>
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.modalText}>
                  Our mission is to provide reliable, friendly, and professional instant messenger advice service to help bridge the gap in overstretched NHS maternity services. We are dedicated to supporting women through the antenatal and postnatal period by providing you with reliable and evidence-based advice, ensuring that we are there for women and their families from the start of their pregnancy up to 28 days postnatal.
                </Text>
                <Text style={styles.modalText}>
                  We aim to complement the NHS maternity services to provide confidential and dependable maternity advice.
                </Text>
                <Text style={styles.modalText}>
                  With our service, it's like having your own midwife in your pocket, ready to answer as many questions as you have—no matter how embarrassing or silly you think the questions may be—from the comfort of your own phone or tablet, from 0900-2100, 7 days a week, 356 days a year.
                </Text>
              </View>
            )}

            {title === 'Vision' && (
              <View>
                <Text style={styles.sectionTitle}>Vision</Text>
                <Text style={styles.modalText}>
                  With 13 years of experience as a midwife, I've had the privilege of working across the UK at various NHS Trust hospitals. My motivation for developing this instant messenger service stems from a desire to bridge the gap between the information provided by the NHS maternity services and the widespread lack of knowledge about basic aspects of pregnancy, labour, birth, and the postnatal period.
                </Text>
                <Text style={styles.modalText}>
                  Throughout my career, I've been frustrated by the time constraints inherent in NHS maternity appointments, which often limit the level of service I can provide. I am passionate about giving more to the women I care for. I want them to feel empowered, strong, and confident during this challenging yet incredible time in their lives. I believe that information is key to achieving this.
                </Text>
                <Text style={styles.modalText}>
                  By offering an instant messenger service available from 09:00 to 21:00 every day, I aim to provide continuous support, reassurance, and credible information. This service will help improve women’s maternity experiences by making them feel supported and informed. No topic is off-limits in our safe, confidential environment where women can message as much as they like, ensuring they receive the help and answers they need.
                </Text>
              </View>
            )}


            {title === 'Profile' && (
                <View>
                    
                </View>
            )}


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef6ccc',
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'black'
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ef6ccc',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color:'black'
  },
  termsBox:{
    marginBottom:50
  }
});

export default ViewDetails;