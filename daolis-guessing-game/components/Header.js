import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import buttonText from '../helpers/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: buttonText,
    marginBottom: 70,
    marginTop: 160,
    textAlign: 'center',
  },
});

export default Header;