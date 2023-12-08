import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import create from './images/create.jpg'
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const writeUserData = async (email, password) => {
    const dbRef = ref(getDatabase());
    
    const snapshot = await get(child(dbRef, "users"));
    let lastId = 1;
    if (snapshot.exists()) {
      const users = snapshot.val();
      lastId = users.length;
    }

    const db = getDatabase();
    set(ref(db, "users/" + lastId), {
      userId: lastId,
      email,
      password,
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, including uppercase and lowercase letters, special characters, and digits."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    writeUserData(formData.email, formData.password);
  };

  return (
    <ImageBackground source={create} style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeading}>Create Account</Text>
        <View>
          <Text style={styles.loginLabel}>Email:</Text>
          {/* <TextInput
            style={styles.loginInput}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Email"
          />
          {formSubmitted && !formData.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )} */}
        </View>
        <View>
          <Text style={styles.loginLabel}>Password:</Text>
          {/* <TextInput
            style={styles.loginInput}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Password"
          />
          {formSubmitted && !formData.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )} */}
        </View>
        <View>
          <Text style={styles.loginLabel}>Confirm Password:</Text>
          {/* <TextInput
            style={styles.loginInput}
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            placeholder="Confirm Password"
          />
          {formSubmitted && !formData.confirmPassword && (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          )} */}
        </View>

        <TouchableOpacity onPress={handleNavigateToHome} style={styles.createAccountButton}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    backgroundColor: '#ffffffb8',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  loginHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  loginLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  loginInput: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#333',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
};

export default CreateAccount;
