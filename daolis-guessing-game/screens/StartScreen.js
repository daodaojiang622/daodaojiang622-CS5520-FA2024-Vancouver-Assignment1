import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GradientBackground from '/Users/chenyujiang/Desktop/5520/daodaojiang622-CS5520-FA2024-Vancouver-Assignment1/daolis-guessing-game/components/GradiantBackground.js';
import { Colors } from '../helpers/Colors'; 
import InputField from '../components/InputField';
import CheckboxWithLabel from '/Users/chenyujiang/Desktop/5520/daodaojiang622-CS5520-FA2024-Vancouver-Assignment1/daolis-guessing-game/components/CheckBoxWithLabel.js';
import Button from '../components/Button';
import Header from '../components/Header';
import Card from '../components/Card';

const StartScreen = ({ onConfirm }) => {
  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@tt.tt');
  const [phone, setPhone] = useState('9876543212');
  const [isChecked, setIsChecked] = useState(true);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const headerText = 'Welcome to Daoli\'s Guessing Game!';

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
      onConfirm(name, email, phone);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Header title={headerText} />
        <Card>
          <InputField 
            label="Name" 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter your name" 
            error={nameError}
          />
          <InputField 
            label="Email address" 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Enter your email" 
            error={emailError}
          />
          <InputField 
            label="Phone Number" 
            value={phone} 
            onChangeText={setPhone} 
            placeholder="Enter your phone number" 
            keyboardType="numeric" 
            error={phoneError}
          />
          <CheckboxWithLabel 
            value={isChecked} 
            onValueChange={setIsChecked} 
            label="I am not a robot" 
          />
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Reset" 
              onPress={handleReset} 
              textStyle={styles.resetButtonText}
            />
            
            <Button 
              title="Register" 
              onPress={handleRegister} 
              disabled={!isChecked} 
              textStyle={styles.registerButtonText}
            />
          </View>
        </Card>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.noColor,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetButtonText: {
    color: Colors.danger,
  },
  registerButtonText: {
    color: Colors.primary,
  },
});

export default StartScreen;