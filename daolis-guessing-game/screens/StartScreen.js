import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import ConfirmScreen from './ConfirmScreen'; // Import your new component

const StartScreen = ({ navigation, onStartGame }) => {
  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@tegst.test');
  const [phone, setPhone] = useState('9876543219');
  const [isChecked, setIsChecked] = useState(true);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  const validateName = (value) => {
    if (!value || value.length <= 1 || /\d/.test(value)) {
      return 'Please enter a valid name (non-numeric and more than 1 character)';
    }
    return '';
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value) || value[value.length - 1] === '0' || value[value.length - 1] === '1') {
      return 'Please enter a valid phone number (10 digits, last digit not 0 or 1)';
    }
    return '';
  };

  const handleRegister = () => {
    const newNameError = validateName(name);
    const newEmailError = validateEmail(email);
    const newPhoneError = validatePhone(phone);

    setNameError(newNameError);
    setEmailError(newEmailError);
    setPhoneError(newPhoneError);

    if (!newNameError && !newEmailError && !newPhoneError && isChecked) {
      setModalVisible(true);
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    onStartGame(phone);
    navigation.navigate('Game', { phone });
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
            onChangeText={setName}
            placeholder="Enter your name"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.title}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
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
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={!isChecked}
            >
              <Text style={[styles.registerButtonText, !isChecked && styles.disabledText]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmation Modal */}
        <ConfirmScreen
          visible={modalVisible}
          name={name}
          email={email}
          phone={phone}
          onClose={() => setModalVisible(false)}
          onContinue={handleContinue}
        />
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
  disabledText: {
    color: 'lightgray',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default StartScreen;