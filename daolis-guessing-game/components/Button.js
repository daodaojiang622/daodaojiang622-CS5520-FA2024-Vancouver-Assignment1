import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../helpers/Colors'; 

const Button = ({ onPress, title, disabled, buttonStyle, textStyle, source, imageStyle }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, buttonStyle, disabled && styles.disabled]} 
      onPress={onPress} 
      disabled={disabled}
    >
      {source && <Image source={source} style={[styles.image, imageStyle]} />}
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
    fontsize: 16,
  },
  disabledText: {
    color: Colors.disabled,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default Button;
