import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import modalShadow from './helpers/Colors';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState('');

  const [currentScreen, setCurrentScreen] = useState('Start'); // Initial screen
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const [startModalVisible, setStartModalVisible] = useState(true);

  const handleConfirm = (enteredName, enteredEmail, enteredPhoneNumber) => {
    setName(enteredName); // Store name
    setEmail(enteredEmail); // Store email
    setPhone(enteredPhoneNumber); // Store phone number
    setConfirmModalVisible(true); // Show ConfirmScreen
  };

  const handleStartGame = () => {
    setCurrentScreen('Game'); // Switch to GameScreen
    setConfirmModalVisible(false); // Hide ConfirmScreen
  };

  const handleBackToStart = () => {
    setConfirmModalVisible(false); // Hide ConfirmScreen
  };

  const handleBackToStartFromGame = () => {
    setCurrentScreen('Start'); // Switch back to StartScreen
  };

  return (
    <View style={styles.container}>
      {/* StartScreen will render when currentScreen is 'Start' */}
      {currentScreen === 'Start' && <StartScreen onConfirm={handleConfirm} />}

      {/* GameScreen will render when currentScreen is 'Game' */}
      {currentScreen === 'Game' && <GameScreen phone={phone} onBackToStart={handleBackToStartFromGame} />}

      {/* ConfirmScreen floats as an overlay */}
      {isConfirmModalVisible && (
        <View style={styles.overlay}>
          <ConfirmScreen 
          onStartGame={handleStartGame} 
          onGoBack={handleBackToStart} 
          name={name}
          email={email}
          phone={phone} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: modalShadow, 
  },
});