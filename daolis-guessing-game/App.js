import React, { useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [inputNumber, setInputNumber] = useState(null); // Assuming you have an input number for the game
  const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

  const handleGuess = (guess) => {
    // Your logic for handling a guess (e.g., comparing with the target number)
    // Set isGameOver to true when the game ends
  };

  const resetGame = () => {
    setInputNumber(null);
    setIsGameOver(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start">
          {props => <StartScreen {...props} onStartGame={() => props.navigation.navigate('Game')} />}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {props => (
            <GameScreen
              {...props}
              inputNumber={inputNumber}
              onInputChange={setInputNumber}
              onSubmitGuess={handleGuess}
              onBackToStartScreen={() => props.navigation.navigate('Start')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Confirm">
          {props => (
            <ConfirmScreen
              {...props}
              isGameOver={isGameOver}
              onPlayAgain={() => {
                resetGame();
                props.navigation.navigate('Start'); // Go back to Start screen after resetting
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});