import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../helpers/colors';
import ModalContainer from '../components/ModalContainer';
import ModalContent from '../components/ModalContent';
import Button from '../components/Button';

const ConfirmScreen = ({ name, email, phone, onGoBack, onStartGame }) => {
  const confirmText = `
Hello ${name},

Here is the information you entered:

  Name: ${name}
  Email: ${email}
  Phone: ${phone}

If this is not correct, please go back and edit them.
  `;

  return (
    <ModalContainer
      visible={true}
      onRequestClose={onGoBack}
    >
      <ModalContent 
        textChildren={confirmText}
        name={name} 
        email={email} 
        phone={phone} 
      >
        <View style={styles.modalButtonContainer}>
          <Button 
            title="Go Back" 
            onPress={onGoBack} 
            textStyle={styles.goBackButtonText}
          />
          <Button 
            title="Continue" 
            onPress={onStartGame} 
            textStyle={styles.continueButtonText}
          />
        </View>
      </ModalContent>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },
  goBackButtonText: {
    color: Colors.danger,
  },
  continueButtonText: {
    color: Colors.secondary,
  },
});

export default ConfirmScreen;