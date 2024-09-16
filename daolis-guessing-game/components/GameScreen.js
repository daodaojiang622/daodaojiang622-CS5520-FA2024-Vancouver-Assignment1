import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const GameScreen = ({ inputNumber, onInputChange, onSubmitGuess, onBackToHome }) => (
  <View style={styles.screen}>
    <Text>Guess a number between 1 and 100</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={inputNumber}
      onChangeText={onInputChange}
    />
    <Button title="Submit Guess" onPress={onSubmitGuess} />
    <Button title="Back to Home" onPress={onBackToHome} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: 200,
  },
});

export default GameScreen;
