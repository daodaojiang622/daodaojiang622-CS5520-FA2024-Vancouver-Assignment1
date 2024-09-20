import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

const StartScreen = ({ onReset, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validation functions
  const validateName = (value) => {
    if (!value || value.length <= 1 || /\d/.test(value)) {
      setNameError('Please enter a valid name (non-numeric and more than 1 character)');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value) || value[value.length - 1] === '0' || value[value.length - 1] === '1') {
      setPhoneError('Please enter a valid phone number (10 digits, last digit not 0 or 1)');
    } else {
      setPhoneError('');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false); // Unselect the checkbox
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#82cfef', '#6693f5', '#ac94f4']}
        style={styles.LinearGradient}
      >
        <Text style={styles.welcomeText}>Welcome to Daoli's Guessing Game!</Text>
        <View style={styles.card}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateName(text);
            }}
            placeholder="Enter your name"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.title}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            placeholder="Enter your email"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              validatePhone(text);
            }}
            placeholder="Enter your phone number"
            keyboardType="numeric"
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

          <View style={styles.checkboxContainer}>
            <Checkbox 
              value={isChecked} 
              onValueChange={setIsChecked} 
            />
            <Text style={styles.checkboxLabel}>I am not a robot</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center',
  },
  LinearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ececec',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'left',
  },
  title: {
    fontSize: 15,
    color: 'purple',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
    marginVertical: 5,
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30,
    color: 'gray',
  },
  checkboxLabel: {
    marginLeft: 10,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'red',
  },
  registerButtonText: {
    color: 'blue',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default StartScreen;
