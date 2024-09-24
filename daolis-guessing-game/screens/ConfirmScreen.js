import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../helpers/colors';

const ConfirmScreen = ({ name, email, phone, onGoBack, onStartGame }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onGoBack}
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
              onPress={onGoBack}
            >
              <Text style={styles.modalGoBackButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContinueButton}
              onPress={onStartGame}
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
    backgroundColor: Colors.modalShadow,
  },
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
  modalGoBackButton: {
    backgroundColor: Colors.noColor,
    padding: 10,
    borderRadius: 5,
  },
  modalGoBackButtonText: {
    color: Colors.danger,
    fontWeight: 'bold',
  },
  modalContinueButton: {
    backgroundColor: Colors.noColor,
    padding: 10,
    borderRadius: 5,
  },
  modalContinueButtonText: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
});

export default ConfirmScreen;