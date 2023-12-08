import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ImageBackground, StyleSheet } from 'react-native';
import test from './images/test.jpg'
import { useNavigation } from '@react-navigation/native';

const ManageBooking = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookingData, setBookingData] = useState(null);


  const navigation = useNavigation(); 

  const handleNavigateToFlightStatus = () => {
    navigation.navigate('Flight Status');
  };

  const handleSearch = () => {
    // Sample data for demonstration purposes
    const sampleBooking = {
      // Sample booking data...
      bookingReference,
      lastName,
      flightDetails: {
        departureDate: '2023-12-01',
        departureTime: '08:00 AM',
        arrivalTime: '12:00 PM',
        departureAirport: 'DOH',
        arrivalAirport: 'LHR',
        flightNumber: 'QR123',
        seatNumber: '21A',
      },
      passengerDetails: {
        passengerName: 'Zeina',
        ticketClass: 'Business',
        baggageAllowance: '24 kg',
      },
      // Other booking details...
      if (bookingData) {
        navigation.navigate('Flight Status', { ManageBooking }); // Navigate to the new page with booking data
      }
    };

    setBookingData(sampleBooking);
  };

  return (
    <View style={styles.manageBookingContainer}>
      <ImageBackground source={test} style={styles.image}>
      <Text style={styles.heading}>Manage Booking</Text>
      <View style={styles.customLine} />
      <View style={styles.searchSection}>
        <View style={styles.inputSection}>
          <Text style={styles.parag}>
            Retrieve booking with Booking reference (PNR) {"\n"}Or E-ticket number
          </Text>
          <TextInput
            style={styles.input}
            value={bookingReference}
            onChangeText={(text) => setBookingReference(text)}
            placeholder="Booking Reference (PNR) or E-ticket number"
            placeholderTextColor={'white'}
            
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
            placeholderTextColor={'white'}
            
          />
          {/* Other TextInput for last name */}
        </View>
        <View style={styles.customLine} />
        <TouchableOpacity style={styles.smallBtn} onPress={handleNavigateToFlightStatus}>
          <Text style={styles.btnText}>Find Booking</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleNavigateToFlightStatus}>
        <Text>Go to Flight Status</Text>
      </TouchableOpacity> */}
      </View>
      {/* Display booking data */}
      {/* Use Text components to display booking details */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  manageBookingContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start'
    // Merge other styles from the second set of styles here...
    // Add other styles as needed...
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    marginTop: 30,
      // Merge other styles from the second set of styles here...
    // Add other styles as needed...
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20,
    // Add other styles as needed...
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
    // Add other styles as needed...
  },
  input: {
    padding: 10,
    margin: 5,
    width: 311,
    color: 'white',
    marginLeft: 70,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'ffffffb8',
    color: '#fff',
    borderColor: '#fff',
    // Add other styles as needed...
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },
  smallBtn: {
    padding: 8,
    paddingHorizontal: 18,
    margin: -33,
    fontSize: 14,
    backgroundColor: 'white',
    width: 120,
    marginLeft: '35%',
    textAlign:'center',
    borderRadius: 6,
    // Add other styles as needed...
  },
  btnText: {
    color: '#000',
     // Text color for the button
    // Add other styles as needed...
  },
  parag: {
    fontWeight: 'light',
    color: '#fff',
    fontSize: 24, // Font size in React Native uses numeric values
    marginLeft: 70,
    marginTop: 0,
    marginBottom: 30,
    // Add other styles as needed...
  },
  customLine: {
    borderTopWidth: 2,
    borderTopColor: '#fff',
    width: '85%',
    marginVertical: 100,
    marginHorizontal: '9%',
    marginTop: 80,
    // Add other styles as needed...
  },
  // Add other styles as needed...
});
  // Merge the rest of the styles from the second set here...
  // Add other styles as needed...


export default ManageBooking;