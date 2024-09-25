import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Colors } from '../helpers/colors';

const ModalContainer = ({ visible, onRequestClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        {children}
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
});

export default ModalContainer;
