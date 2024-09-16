import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';

const StartScreen = ({ onReset, onRegister }) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter text 1" />
      <Text style={styles.title}>Email address</Text>
      <TextInput style={styles.input} placeholder="Enter text 2" />
      <Text style={styles.title}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="Enter text 3" />
      <View style={styles.checkboxContainer}>
        <Checkbox />
        <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
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
    alignItems: 'left',
  },
  title: {
    fontSize: 15,
    color: 'purple',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
    marginVertical: 5,
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default StartScreen;
