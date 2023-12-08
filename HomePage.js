import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import nature from "./images/nature.jpg";
import { AntDesign } from "@expo/vector-icons";
// import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getDatabase,
  set,
  get,
  child,
  ref,
  remove,
  onValue,
} from "firebase/database";
import { db } from "./firebase";
import { ScrollView } from "react-native-gesture-handler";

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomePage = ({route}) => {
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)

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
    setShowStartDatePicker(Platform.OS === "ios"); // On iOS, the picker doesn't close automatically
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === "ios"); // On iOS, the picker doesn't close automatically
    setEndDate(selectedDate || endDate);
  };

  useEffect(() => {
   
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const user = JSON.parse(jsonValue)
        setCurrentUser(user)
        // console.log(jsonValue)
        // return jsonValue != null ?  jsonValue : null;
      } catch (e) {
        // error reading value
      }
    };

    getUser()
    console.log("user:: ", currentUser);




  }, [route]);

  console.log(offersData);
  // const [currentLocation, setCurrentLocation] = useState(null);

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       setCurrentLocation(position.coords);
  //     },
  //     (error) => {
  //       console.log(error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  return (
    <ScrollView>
          <View style={styles.container}>
      <ImageBackground source={nature} style={styles.image}>
        <View style={styles.wrapper}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.iconContainer}>
                {/* <AntDesign name="appstore-o" size={24} style={styles.NavLogo}/> */}
              </View>
            </TouchableOpacity>
          </View>
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

            {/* <TouchableOpacity onPress={getLocation}>
  <Text>Get Current Location</Text>
</TouchableOpacity>


<View>
  {currentLocation && (
    <Text>
      Latitude: {currentLocation.latitude}, Longitude: {currentLocation.longitude}
    </Text>
  )}
</View> */}

            <Button title="Search" onPress={handleSearch} color="#000" />
            {/* <Button title="Get Location" onPress={getLocation} color='#000' /> */}

            {
            offersData.map((flight) => <Text key={flight.id}>{flight.arrival}</Text>)
          }
          </View>

          
        </View>
        
      </ImageBackground>
      
    </View>
    </ScrollView>
  );
};

const styles = {
  NavLogo: {
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    width: "100%",
    height: "100%",
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 2,
    marginTop: 20,
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
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  datePickerContainer: {
    flex: 1,
  },
  dateTimePicker: {
    backgroundColor: "transparent",
    color: "white",
    marginTop: 10,
  },
};

export default HomePage;
