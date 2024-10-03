import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Colors } from '../helpers/Colors'; 

const CheckboxWithLabel = ({ value, onValueChange, label }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 300,
    position: 'absolute',
    left: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: Colors.checkboxColor,
  },
});

export default CheckboxWithLabel;
