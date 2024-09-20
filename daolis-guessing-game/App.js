import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start'); // Can be 'Start', 'Game', 'Confirm'
  const [inputNumber, setInputNumber] = useState(null); // Assuming you have an input number for the game
  const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

  const handleGuess = (guess) => {
    // Your logic for handling a guess (e.g., comparing with the target number)
    // Set isGameOver to true when the game ends
  };

  const resetGame = () => {
    setInputNumber(null);
    setIsGameOver(false);
    setCurrentScreen('Start'); // Go back to Start screen after resetting
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Start' && (
        <StartScreen onStartGame={() => setCurrentScreen('Game')} />
      )}
      {currentScreen === 'Game' && (
        <GameScreen
          inputNumber={inputNumber}
          onInputChange={setInputNumber}
          onSubmitGuess={handleGuess}
          onBackToHome={() => setCurrentScreen('Start')}
        />
      )}
      {currentScreen === 'Confirm' && (
        <ConfirmScreen
          isGameOver={isGameOver}
          onPlayAgain={resetGame}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
