import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import sardinia from "./images/sardinia.jpg";

import {
  getDatabase,
  set,
  get,
  child,
  ref,
} from "firebase/database";
import { db } from "./firebase";

const SignUp = () => {
  const navigation = useNavigation();

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

    const database = getDatabase();
    set(ref(database, `users/${lastId}`), {
      userId: lastId,
      email,
      password,
    });
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    // Assuming "SignIn" is the name of your sign-in screen
    await writeUserData(formData.email, formData.password);
    navigation.navigate("Sign In");
  };

  return (
    <ImageBackground source={sardinia} style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupTitle}>Sign Up</Text>
        <View style={styles.signupForm}>
          <Text style={styles.signupLabel}>Email:</Text>
          <TextInput
            style={styles.signupInput}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <Text style={styles.signupLabel}>Password:</Text>
          <TextInput
            style={styles.signupInput}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Text style={styles.signupLabel}>Confirm Password:</Text>
          <TextInput
            style={styles.signupInput}
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <Text style={styles.errorMessage}>{emailError}</Text>
          <Text style={styles.errorMessage}>{passwordError}</Text>
          <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
          <Button
            title="Sign Up"
            onPress={handleSubmit}
            style={styles.signupButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffffb8",
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
    borderColor: "lightgray",
    borderRadius: 5,
  },
  signupButton: {
    padding: 10,
    backgroundColor: "#3498db",
    color: "#fff",
  },
  errorMessage: {
    color: "red",
  },
});

export default SignUp;
