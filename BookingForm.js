import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ManageBooking = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookingData, setBookingData] = useState(null);

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
    };

    setBookingData(sampleBooking);
  };

  return (
    <View style={styles.manageBookingContainer}>
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
          />
          {/* Other TextInput for last name */}
        </View>
        <View style={styles.customLine} />
        <TouchableOpacity style={styles.smallBtn} onPress={handleSearch}>
          <Text style={styles.btnText}>Find Booking</Text>
        </TouchableOpacity>
      </View>
      {/* Display booking data */}
      {/* Use Text components to display booking details */}
    </View>
  );
};

const styles = StyleSheet.create({
  manageBookingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    // Merge other styles from the second set of styles here...
    // Add other styles as needed...
  },
  heading: {
    fontWeight: 'bold',
    color: '#555555',
    fontSize: 20,
    marginVertical: 10,
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
    marginBottom: 20,
    // Add other styles as needed...
  },
  input: {
    padding: 10,
    margin: 5,
    width: 400,
    color: '#555555',
    marginLeft: 70,
    // Add other styles as needed...
  },
  smallBtn: {
    padding: 8,
    paddingHorizontal: 12,
    margin: 5,
    fontSize: 14,
    backgroundColor: '#900562',
    width: 120,
    marginLeft: '88%',
    // Add other styles as needed...
  },
  btnText: {
    color: '#fff', // Text color for the button
    // Add other styles as needed...
  },
  parag: {
    fontWeight: 'light',
    color: '#900562',
    fontSize: 24, // Font size in React Native uses numeric values
    marginLeft: 70,
    // Add other styles as needed...
  },
  customLine: {
    borderTopWidth: 1,
    borderTopColor: '#900562',
    width: '92%',
    marginVertical: 20,
    marginHorizontal: 'auto',
    marginTop: 8,
    // Add other styles as needed...
  },
  // Add other styles as needed...
});
  // Merge the rest of the styles from the second set here...
  // Add other styles as needed...


export default ManageBooking;