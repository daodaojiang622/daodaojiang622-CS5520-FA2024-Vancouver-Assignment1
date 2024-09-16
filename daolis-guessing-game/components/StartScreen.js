import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';

const StartScreen = ({ onReset, onRegister }) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.input} placeholder="" />
      <Text style={styles.title}>Email address</Text>
      <TextInput style={styles.input} placeholder="" />
      <Text style={styles.title}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="" />
      <View style={styles.checkboxContainer}>
        <Checkbox />
        <Text style={styles.checkboxLabel}>I am not a robot</Text>
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
    marginBottom: 10,
    marginTop: 10,
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
    marginTop: 30,
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
