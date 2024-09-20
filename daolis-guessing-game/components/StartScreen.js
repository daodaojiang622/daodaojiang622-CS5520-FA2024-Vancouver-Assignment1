import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

const StartScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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
      // All validations passed, show confirmation modal
      setModalVisible(true);
    }
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Hello {name}, {'\n'}
                {'\n'} 
                Here is the information you entered:{'\n'}
                {'\n'}

                Name: {name}{'\n'}
                Email: {email}{'\n'}
                Phone: {phone}{'\n'}
                {'\n'}
                If this is not correct, please go back and edit them.
                </Text>
                <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalGoBackButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalGoBackButtonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalGoBackButton}
                  onPress={() => {
                    // Handle continue action here
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalContinueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  modalGoBackButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  modalGoBackButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  modalContinueButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
});

export default StartScreen;
