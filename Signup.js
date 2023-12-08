import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sardinia from './images/sardinia.jpg'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigation = useNavigation(); 

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Validate password criteria
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters, including uppercase and lowercase letters, special characters, and digits.');
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(formData));

    // Redirect to login page
    history.push('/sign-in');
  };
//   style={styles.image}>

  return (
    <ImageBackground source={sardinia} style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupTitle}>Sign Up</Text>
        <View style={styles.signupForm}>
          <Text style={styles.signupLabel}>Email:</Text>
          <TextInput
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            style={styles.signupInput}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
          />
          <Text style={styles.signupLabel}>Password:</Text>
          <TextInput
            value={formData.password}
            secureTextEntry
            onChangeText={(text) => handleChange('password', text)}
            style={styles.signupInput}
            keyboardType="password"
            autoCapitalize="none"
            placeholder="Enter your password"
          />
          <Text style={styles.errorMessage}>{emailError}</Text>
          <Text style={styles.errorMessage}>{passwordError}</Text>

          {/* Similar inputs for password and confirm password */}

          <Button title="Sign Up" onPress={handleNavigateToHome} style={styles.signupButton} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#ffffffb8',
  },
  signupTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  signupForm: {
    width: 300,
  },
  signupLabel: {
    marginBottom: 8,
  },
  signupInput: {
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  signupButton: {
    padding: 10,
    backgroundColor: '#3498db',
    color: '#fff',
  },
  errorMessage: {
    color: 'red',
  },
});

export default SignUp;
