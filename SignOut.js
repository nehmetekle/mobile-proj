import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import nightnight from './images/nightnight.jpg';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut = () => {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.navigate("HomePage");
        console.log("Ss")
    }, [])
    // useEffect(() => {
    //   const t = async () => {
    //     // await AsyncStorage.removeItem('user')
    //     navigation.navigate("HomePage");
    //   }
  
    //   return () => t;
    // }, [navigation]);
};


export default SignOut;
