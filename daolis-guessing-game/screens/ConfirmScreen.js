import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const ConfirmationScreen = ({ visible, name, email, phone, onClose, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
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
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalGoBackButton}
              onPress={onClose}
            >
              <Text style={styles.modalGoBackButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalGoBackButton}
              onPress={onContinue}
            >
              <Text style={styles.modalContinueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
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
  modalGoBackButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  modalGoBackButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  modalContinueButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
});

export default ConfirmationScreen;
