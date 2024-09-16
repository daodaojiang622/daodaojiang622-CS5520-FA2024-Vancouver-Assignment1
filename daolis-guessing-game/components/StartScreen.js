import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';


const StartScreen = ({ onReset, onRegister }) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Welcome to Daoli's Guessing Game!</Text>
      <TextInput style={styles.input} placeholder="" />
      <TextInput style={styles.input} placeholder="" />
      <TextInput style={styles.input} placeholder="" />
      <View style={styles.checkboxContainer}>
        <Checkbox />
        <Text style={styles.checkboxLabel}>I am not a robot</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={onReset} />
        <Button title="Register" onPress={onRegister} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  link: {
    color: 'blue',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StartScreen;
