import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../helpers/colors';

const ModalContent = ({ textChildren, children }) => {
  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>
        {textChildren}
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