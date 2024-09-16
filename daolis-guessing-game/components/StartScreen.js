import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StartScreen = ({ onStartGame }) => (
  <View style={styles.screen}>
    <Text>Welcome to Daoli's Guessing Game!</Text>
    <Button title="Start Game" onPress={onStartGame} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartScreen;
