import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../helpers/colors';

const ModalContent = ({ name, email, phone, children }) => {
  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>
        Hello {name}, {'\n'}
        {'\n'} 
        Here is the information you entered:{'\n'}
        {'\n'}
        Name: {name}{'\n'}
        Email: {email}{'\n'}
        Phone: {phone}{'\n'}
        {'\n'}
        If this is not correct, please go back and edit them.
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.modalBackground,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
});

export default ModalContent;