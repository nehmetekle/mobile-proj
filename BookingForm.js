import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import test from "./images/test.jpg";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native"; 

import {
  getDatabase,
  get,
  child,
  ref,
} from "firebase/database";
import { db } from "./firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageBooking = () => {
  const [userFlights, setUserFlights] = useState([]);
  const [user, setUser] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(getDatabase());

        const snapshot = await get(child(dbRef, `booking_history`));
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());

          let newUserHistories = data.filter((data) => user && data.user_id === user.userId);
          let userFlights = [];

          const specialOffersSnapshot = await get(child(dbRef, `special_offers`));
          if (specialOffersSnapshot.exists()) {
            const specialData = Object.values(specialOffersSnapshot.val());

            newUserHistories.forEach((history) => {
              specialData.forEach((data) => {
                if (data.id === history.offerId) {
                  let newData = {
                    data,
                    eTicket: history.eTicket,
                    departureCountry: data.departureCountry || 'N/A',
                    arrivalCountry: data.arrivalCountry || 'N/A',
                  };
                  userFlights.push(newData);
                }
              });
            });
          }

          setUserFlights(userFlights);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
          const user = JSON.parse(jsonValue);
          setUser(user);
          fetchData();
        }
      } catch (e) {
        console.error("Error getting user:", e.message);
      }
    };

    getUser();
  }, [isFocused]);

  const navigation = useNavigation();

  return (
    <View style={styles.manageBookingContainer}>
      <ImageBackground source={test} style={styles.image}>
        <Text style={styles.heading}>Manage Booking</Text>
        <View style={styles.customLine} />

        {/* Display booking data */}
        {userFlights.map((booking, index) => (
          <View key={index} style={styles.bookingDetails}>
            <Text style={styles.bookingText}>Offer: {booking.data.offerName}</Text>
            <Text style={styles.bookingText}>eTicket: {booking.eTicket}</Text>
            <Text style={styles.bookingText}>Departure Country: {booking.departureCountry}</Text>
            <Text style={styles.bookingText}>Arrival Country: {booking.arrivalCountry}</Text>
            {/* Add more details as needed */}
          </View>
        ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  manageBookingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  customLine: {
    borderTopWidth: 2,
    borderTopColor: "#fff",
    width: "85%",
    marginVertical: 100,
    marginHorizontal: "9%",
    marginTop: 80,
  },
  bookingDetails: {
    marginTop: 20,
    marginLeft: 20,
  },
  bookingText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ManageBooking;
