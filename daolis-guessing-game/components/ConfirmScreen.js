import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmScreen = ({ isGameOver, onPlayAgain }) => (
  <View style={styles.screen}>
    <Text>{isGameOver ? 'Congratulations! You guessed it right!' : 'Game Over!'}</Text>
    <Button title="Play Again" onPress={onPlayAgain} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfirmScreen;
