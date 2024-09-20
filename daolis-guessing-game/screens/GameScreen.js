import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const GameScreen = ({ inputNumber, onInputChange, onSubmitGuess, onBackToHome }) => {
  const [modalVisible, setModalVisible] = useState(true);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#82cfef', '#6693f5', '#ac94f4']}
        style={styles.LinearGradient}
      >
        {/* Start Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You have 60 seconds and 4 {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of their phone {'\n'}
                number between 1 and 100.
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalStartButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalStartButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },
  LinearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    textAlign: 'center',
  },
  modalStartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  modalStartButtonText: {
    color: 'white',
  },
});

export default GameScreen;
