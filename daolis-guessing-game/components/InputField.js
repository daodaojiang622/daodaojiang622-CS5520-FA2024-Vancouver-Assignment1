import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Colors } from '../helpers/colors'; 

const InputField = ({ label, value, onChangeText, placeholder, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'left',
  },
  title: {
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    padding: 5,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 2,
    alignContent: 'center',
    width: 270,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
