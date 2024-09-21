import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const GameScreen = ({ inputNumber, onInputChange, onSubmitGuess, onBackToHome }) => {
  const [startButtonVisible, setStartButtonVisible] = useState(true);
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(4);
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState('');
  const [userInput, setUserInput] = useState('');

  // Countdown timer
  useEffect(() => {
    if (!startButtonVisible && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startButtonVisible, timer]);

  // Hint function (can be customized)
  const handleUseHint = () => {
    if (!hintUsed) {
      // Replace this with your hint logic
      setHint('Hint: The number is even');
      setHintUsed(true);
    }
  };

  // Handle submit guess (example logic)
  const handleSubmitGuess = () => {
    if (attempts > 1) {
      setAttempts(attempts - 1);
      // Your guess validation logic goes here
    } else {
      // End game or give feedback when no attempts are left
      console.log('Game over');
    }
  };
  
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
          visible={true}
          onRequestClose={() => {
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You have 60 seconds and 4 {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of your phone {'\n'}
                number between 1 and 100.
              </Text>

              {/* Conditional rendering for Start button */}
              {startButtonVisible ? (
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalStartButton}
                    onPress={() => setStartButtonVisible(false)} // Hide Start button on press
                  >
                    <Text style={styles.modalStartButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* Display game components when Start button is hidden */}
              {!startButtonVisible && (
                <View style={styles.gameContainer}>
                  <Text style={styles.timerText}>Time left: {timer} seconds</Text>
                  <Text style={styles.attemptsText}>Attempts left: {attempts}</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your guess"
                    keyboardType="numeric"
                    value={userInput}
                    onChangeText={setUserInput}
                  />

                  {hint ? <Text style={styles.hintText}>{hint}</Text> : null}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.hintButton}
                      onPress={handleUseHint}
                      disabled={hintUsed}
                    >
                      <Text style={styles.hintButtonText}>Use a Hint</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmitGuess}
                    >
                      <Text style={styles.submitButtonText}>Submit Guess</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

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

  gameContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'red',
  },
  attemptsText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  hintButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  hintButtonText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default GameScreen;
