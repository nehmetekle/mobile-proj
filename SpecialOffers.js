import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Picker, TouchableOpacity } from 'react-native';
// import { getDatabase, ref, child, get } from 'firebase/database';


const countries = [
"Beirut", "Kuwait", "Frankfurt", "Paris", "London", "Jeddah",
"Amsterdam", "Basra", "Geneva", "Milan", "Madrid", "Copenhangen"
];

const OfferDetail = ({ offer }) => (
  <View style={styles.offer}>
    {/* <Image source={('../assets/' + offer.image)} style={styles.img} /> */}
    <Text>Travel between: {offer.departure_date} to {offer.arrival_date}</Text>
    <Text>{offer.depature}-{offer.arrival}</Text>
    <Text>{offer.type}</Text>
    <Text>From Eur {offer.price} €</Text>
    <Button title="Book" onPress={() => {}} />
  </View>
);

const OfferDetails = ({ offersData }) => {
  const listOffers = offersData.map((offer) => <OfferDetail key={offer.id} offer={offer} />);
  return listOffers;
};

const SpecialOffers = () => {
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase());

      try {
        const snapshot = await get(child(dbRef, 'special_offers'));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setOffersData(data);
          setFilteredOffers(data); // Initially, set filtered offers to all offers
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching special offers:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = offersData.filter(
      (offer) =>
        (!fromCountry || offer.depature === fromCountry) &&
        (!toCountry || offer.arrival === toCountry)
    );
    setFilteredOffers(filtered);
  };

  return (
    <View style={styles.specialOffersPage}>
      <View style={styles.firstSection}>
        {/* Video tag doesn't exist in React Native */}
        {/* <Video
          source={video1}
          style={styles.videoBackground}
          autoPlay={true}
          muted={true}
          loop={true}
        /> */}

        <View style={styles.headerSpecial}>
          <Text style={styles.title}>Special Offers</Text>
          <Text style={styles.mainTitle}>Latest travel deals and offers</Text>
          <Text style={styles.description}>Discover your next adventure with us!</Text>
        </View>

        <View style={styles.filterSection}>
          <Text>From:</Text>
          <Picker
            selectedValue={fromCountry}
            onValueChange={(itemValue) => setFromCountry(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            {countries.map((country, index) => (
              <Picker.Item key={index} label={country} value={country} />
            ))}
          </Picker>
          <Text>To:</Text>
          <Picker
            selectedValue={toCountry}
            onValueChange={(itemValue) => setToCountry(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            {countries.map((country, index) => (
              <Picker.Item key={index} label={country} value={country} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.btnFilter} onPress={handleFilter}>
            <Text style={styles.specialButton}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.offerDetails}>
        <OfferDetails offersData={filteredOffers} />
      </View>
    </View>
  );
};

// Styles will need to be defined based on your design
const styles = {
    
        specialOffersPage: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        },
        firstSection: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        },
        videoBackground: {
        width: '100%',
        height: 'auto',
        },
        headerSpecial: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translate: ['-50%', '-50%'] }],
        textAlign: 'center',
        color: '#fff',
        },
        title: {
        fontSize: 24,
        fontWeight: 'bold',
        },
        mainTitle: {
        fontSize: 48,
        marginVertical: 10,
        },
        description: {
        fontSize: 16,
        },
        filterSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        },
        label: {
        marginRight: 10,
        },
        picker: {
        padding: 8,
        marginRight: 10,
        },
        btnFilter: {
        marginTop: 10,
        },
        specialButton: {
        marginBottom: 10,
        backgroundColor: '#007bff',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 16,
        },
        offerDetails: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        },
        offer: {
        width: 300,
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        textAlign: 'center',
        },
        img: {
        width: '100%',
        height: 'auto',
        borderRadius: 5,
        marginBottom: 10,
        },
        h2: {
        fontSize: 24,
        marginVertical: 10,
        },
    };
    


export default SpecialOffers;