import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
//import everything in the Components folder
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ConfirmScreen from './components/ConfirmScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start'); // Can be 'Start', 'Game', 'Confirm'

  return (
    <View style={styles.container}>
      {currentScreen === 'Start' && <StartScreen onStartGame={() => setCurrentScreen('Game')} />}
      {currentScreen === 'Game' && (
        <GameScreen
          inputNumber={inputNumber}
          onInputChange={setInputNumber}
          onSubmitGuess={handleGuess}
          onBackToHome={() => setCurrentScreen('Start')}
        />
      )}
      {currentScreen === 'Confirm' && <ConfirmScreen isGameOver={isGameOver} onPlayAgain={resetGame} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
