import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import { onValue, ref } from 'firebase/database';
// import { db } from '../../firebase';
import create from './images/create.jpg'
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [usersData, setUsersData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigation = useNavigation(); 

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const dataRef = ref(db, 'users');
        onValue(dataRef, (snapshot) => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            const users = Object.values(fetchedData);
            setUsersData(users);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUsersData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const isValidEmail = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(text);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        confirmPassword: !formData.confirmPassword ? 'Confirm Password is required' : '',
        username: !formData.username ? 'Username is required' : '',
      });
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address',
      });
      return;
    }

    if (!isValidPassword(formData.password)) {
      setErrors({
        ...errors,
        password:
          'Password must be at least 8 characters long with an uppercase letter, a lowercase letter, and a special character.',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    const userExists = usersData.some(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (!userExists) {
      setErrors({
        ...errors,
        password: 'Incorrect password',
      });
      return;
    } else {
      setErrors({
        ...errors,
        password: '',
      });
    
      
      const currentUser = usersData.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      const { userID } = currentUser;
      // Handle navigation in React Native (e.g., using React Navigation)
      // You may want to replace the following line with your navigation logic
      // navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground source={create} style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeading}>Create Account</Text>
        <View>
          <Text style={styles.loginLabel}>Email:</Text>
          <TextInput
            style={styles.loginInput}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Email"
          />
          {formSubmitted && !formData.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
        </View>
        <View>
          <Text style={styles.loginLabel}>Username:</Text>
          <TextInput
            style={styles.loginInput}
            keyboardType="default"
            value={formData.username}
            onChangeText={(text) => handleChange('username', text)}
            placeholder="Username"
          />
          {formSubmitted && !formData.username && (
            <Text style={styles.errorMessage}>{errors.username}</Text>
          )}
        </View>
        <View>
          <Text style={styles.loginLabel}>Password:</Text>
          <TextInput
            style={styles.loginInput}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Password"
          />
          {formSubmitted && !formData.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
        </View>
        <View>
          <Text style={styles.loginLabel}>Confirm Password:</Text>
          <TextInput
            style={styles.loginInput}
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            placeholder="Confirm Password"
          />
          {formSubmitted && !formData.confirmPassword && (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          )}
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
