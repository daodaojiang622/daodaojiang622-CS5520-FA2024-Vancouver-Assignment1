import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../helpers/Colors';

const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.modalBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'left',
  },
});

export default Card;