import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { Colors } from '../helpers/Colors'; 
import InputField from '../components/InputField';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

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
      return 'Please enter a valid name';
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
      return 'Please enter a valid phone number';
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
    <View style={styles.screen}>
    <GradientBackground>
      <View style={styles.container}>
        <Header title={headerText} />
        <Card>
          <InputField 
            label="Name" 
            value={name} 
            onChangeText={(value) => {
              setName(value);
              setNameError(validateName(value));
            }} 
            placeholder="Enter your name" 
            error={nameError}
            // add a styling for label
            titleStyle={styles.titleStyle}
          />
          <InputField 
            label="Email address" 
            value={email} 
            onChangeText={(value) => {
              setEmail(value);
              setEmailError(validateEmail(value));
            }} 
            placeholder="Enter your email" 
            error={emailError}
            titleStyle={styles.titleStyle}
          />
          <InputField 
            label="Phone Number" 
            value={phone} 
            onChangeText={(value) => {
              setPhone(value);
              setPhoneError(validatePhone(value));
            }} 
            placeholder="Enter your phone number" 
            keyboardType="numeric" 
            error={phoneError}
            titleStyle={styles.titleStyle}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.noColor,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 330,
    marginLeft: 30,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
  },
  resetButtonText: {
    color: Colors.danger,
  },
  registerButtonText: {
    color: Colors.primary,
  },
  titleStyle: {
    textAlign: 'left',
  },
});

export default StartScreen;