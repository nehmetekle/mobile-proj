import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDatabase, child, ref, get, set } from "firebase/database";
import { db } from "./firebase";

import nature from "./images/nature.jpg";

const HomePage = ({ route }) => {
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const generateETicket = () => {
    const firstLetter = currentUser.email.charAt(0).toUpperCase();
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return `${firstLetter}${randomNumbers}`;
  };

  const handleBook = async (offerId) => {
    try {
      const dbRef = ref(getDatabase());
      const bookingHistoryRef = child(dbRef, "booking_history");

      const data = await get(bookingHistoryRef);

      if (data.exists()) {
        const flightHistory = Object.values(data.val());

        const isFlightBooked = flightHistory.some(
          (entry) =>
            entry.offerId === offerId && entry.user_id.userId === currentUser.userId
        );

        if (!isFlightBooked) {
          const db = getDatabase();
          const length = flightHistory.length;
          const lastId = length > 0 ? flightHistory[length - 1].id + 1 : 1;

          const eTicket = generateETicket();

          set(ref(db, `booking_history/${lastId.toString()}`), {
            id: lastId,
            offerId: offerId,
            user_id: currentUser.userId,
            eTicket: eTicket,
          });

          console.log(
            `Flight with offer ID ${offerId} booked for user ${currentUser.userId}. E-ticket: ${eTicket}`
          );
        }
      } else {
        const eTicket = generateETicket();

        set(ref(db, "booking_history/1"), {
          id: 1,
          offerId: offerId,
          user_id: currentUser.userId,
          eTicket: eTicket,
        });

        window.localStorage.setItem("eTicket", eTicket);
        console.log(
          `Flight with offer ID ${offerId} booked for user ${currentUser.userId}. E-ticket: ${eTicket}`
        );
      }
    } catch (error) {
      console.error("Error booking the flight:", error.message);
    }
  };

  const handleStartDatePress = () => {
    setShowStartDatePicker(true);
  };

  const handleEndDatePress = () => {
    setShowEndDatePicker(true);
  };

  const handleSearch = () => {
    console.log("Search clicked");
    const fetchData = async () => {
      const dbRef = ref(getDatabase());

      try {
        const snapshot = await get(child(dbRef, "special_offers"));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setOffersData(data);
        }
      } catch (error) {
        console.error("Error fetching special offers:", error.message);
      }
    };

    fetchData();
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(selectedDate || endDate);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const user = JSON.parse(jsonValue);
        setCurrentUser(user);
      } catch (e) {
        // error reading value
      }
    };

    getUser();
  }, [route]);

  console.log(offersData);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <ImageBackground source={nature} style={styles.image}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Where do you want to explore?</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>From</Text>
            <TextInput
              style={styles.input}
              value={fromDestination}
              onChangeText={(text) => setFromDestination(text)}
              placeholder="Enter origin"
              placeholderTextColor={"black"}
            />

            <Text style={styles.label}>To</Text>
            <TextInput
              style={styles.input}
              value={toDestination}
              onChangeText={(text) => setToDestination(text)}
              placeholder="Enter destination"
              placeholderTextColor={"black"}
            />

            <TouchableOpacity onPress={handleStartDatePress}>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Departure </Text>
                <Text style={styles.input}>{startDate.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="datetime"
                display="default"
                onChange={handleStartDateChange}
                style={styles.dateTimePicker}
              />
            )}

            <TouchableOpacity onPress={handleEndDatePress}>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Arrival</Text>
                <Text style={styles.input}>{endDate.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="datetime"
                display="default"
                onChange={handleEndDateChange}
                style={styles.dateTimePicker}
              />
            )}

            <Button title="Search" onPress={handleSearch} color="#000" />

            {offersData.map((flight) => (
              <View key={flight.id} style={styles.offerContainer}>
                <Text style={styles.text}>Departure: {flight.depature}</Text>
                <Text style={styles.text}>Arrival: {flight.arrival}</Text>
                <Text style={styles.text}>
                  Departure Date: {flight.departure_date}
                </Text>
                <Text style={styles.text}>
                  Arrival Date: {flight.arrival_date}
                </Text>
                <Text style={styles.text}>Price: {flight.price}</Text>
                <Button title="Book now" onPress={() => handleBook(flight.id)} />
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "black",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateTimePicker: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  offerContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
};

export default HomePage;