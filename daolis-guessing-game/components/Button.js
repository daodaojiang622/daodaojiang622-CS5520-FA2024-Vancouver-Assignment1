import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../helpers/Colors'; 

const Button = ({ onPress, title, disabled, buttonStyle, textStyle, visible }) => {
  return (
      <TouchableOpacity 
        style={[styles.button, buttonStyle, disabled && styles.disabled]} 
        onPress={onPress} 
        disabled={disabled}
        visible={visible}
      >
        <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.noColor,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.secondary,
  },
  disabledText: {
    color: Colors.disabled,
  },
});

export default Button;
