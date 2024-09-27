import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Colors } from '../helpers/Colors'; 

const InputField = ({ label, value, onChangeText, placeholder, error, autoFocus, textStyle, titleStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, textStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoFocus={autoFocus}
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
    fontSize: 16,
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
    fontSize: 16,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
