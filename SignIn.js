import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import { onValue, ref } from 'firebase/database';
// import { db } from '../../firebase';
import nightnight from './images/nightnight.jpg'
import { useNavigation } from '@react-navigation/native';


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [usersData, setUsersData] = useState([]);

  const navigation = useNavigation(); 

  const handleNavigateToCreate = () => {
    navigation.navigate('Create Account');
  };
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

  const userExists = usersData.some(
    (user) => user.email === formData.email && user.password === formData.password
  );

  const currentUser = usersData.find(
    (user) => user.email === formData.email && user.password === formData.password
  );

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

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    if (!userExists) {
      setErrors({
        password: 'Incorrect password',
      });
      return;
    } else {
      setErrors({
        ...errors,
        password: '',
      });

      const { userID } = currentUser;
      // Handle navigation in React Native (e.g., using React Navigation)
      // You may want to replace the following line with your navigation logic
      // navigation.navigate('Home');
    }
  };

  const handleCreateAccount = () => {
    // Handle navigation to sign-up screen
    // You may want to replace the following line with your navigation logic
    // navigation.navigate('SignUp');
  };

  return (
    <ImageBackground source={nightnight} style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeading}>Login</Text>
        <View>
          <Text style={styles.loginLabel}>Email:</Text>
          <TextInput
            style={styles.loginInput}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Email"
            // placeholderTextColor={'black'}
          />
          {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
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
          {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleNavigateToHome} style={styles.loginButton}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToCreate} style={styles.createAccountButton}>
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};



export default SignIn;
