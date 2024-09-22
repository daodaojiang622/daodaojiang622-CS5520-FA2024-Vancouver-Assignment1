import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';

const GameScreen = ({inputNumber, onInputChange, onSubmitGuess, onBackToHome }) => {
  const [startButtonVisible, setStartButtonVisible] = useState(true);
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(4);
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState('');
  const [userInput, setUserInput] = useState('');
  const [generateNum, setGenerateNum] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [startModalVisible, setStartModalVisible] = useState(true);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  const openStartModal = () => {
    setStartModalVisible(true);
    setGameModalVisible(false);
    setEndModalVisible(false);
    setSubmitModalVisible(false);
  };

  const openGameModal = () => {
    setStartModalVisible(false);
    setGameModalVisible(true);
    setEndModalVisible(false);
    setSubmitModalVisible(false);
  };

  const openEndModal = () => {
    setStartModalVisible(false);
    setGameModalVisible(false);
    setEndModalVisible(true);
    setSubmitModalVisible(false);
  };

  const openSubmitModal = () => {
    setStartModalVisible(false);
    setGameModalVisible(false);
    setEndModalVisible(false);
    setSubmitModalVisible(true);
  };

  const { phone } = useRoute().params;

  const lastPhoneDigit = phone.slice(-1); // Multiply the last digit of input phone number

  const getRandomNaturalNumber = () => {
      const min = 1;
      const max = 100;

      let generateNum;
      do {
          generateNum = lastPhoneDigit * (Math.floor(Math.random() * (max - min + 1)) + min);
      } while (generateNum > 100 || generateNum < 1);
      return generateNum;
  };

  useEffect(() => {
    setGenerateNum(getRandomNaturalNumber());
  }, []);

  // Countdown timer
  useEffect(() => {
    if ( timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Hint function
  const handleUseHint = () => {
    
    if (!hintUsed) {
      // give the last digit of the answer
      setHint('Hint: The last digit is ' + generateNum % 10);
      setHintUsed(true);
    }
  };

  // Handle invalid guesses
  const isValidGuess = (guess) => {

    if (attempts > 0 && timer > 0) {
      // Validation logic
      if (isNaN(guess) || guess < 1 || guess > 100) {
        Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
        return false;
      }
        setAttempts(attempts - 1);
    } else if (attempts === 0) {
      Alert.alert('Game Over', 'You have used all your attempts.');
      setIsGameOver(true);
    } else {
      Alert.alert('Time Up', 'You have run out of time.');
      setIsGameOver(true);
    }

    // Reset user input after submission
    setUserInput('');
    return true;
  };

  // Handle valid guess submission
  const handleValidGuess = (guess) => {
    if (guess === generateNum) {
      Alert.alert('Congratulations!', 'You have guessed the number correctly.');
      // Set isGameOver to true when the game ends
      setIsGameOver(true);
    } else if (guess < generateNum) {
      Alert.alert('Hint: Try a higher number');
    } else {
      Alert.alert('Hint: Try a lower number');
    }
  };

  // Handle guess submission
  const handleSubmitGuess = () => {
    const guess = parseInt(userInput);

    if (isValidGuess(guess)) {
      handleValidGuess(guess);
    }
  }

  const handleTryAgain = () => {
    openSubmitModal();
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#82cfef', '#6693f5', '#ac94f4']}
        style={styles.LinearGradient}
      >
        {/* Start Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={startModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You have 60 seconds and 4 {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of your phone {'\n'}
                number {phone} & {lastPhoneDigit} & {generateNum} between 1 and 100.
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalStartButton}
                  onPress={openSubmitModal}
                >
                  <Text style={styles.modalStartButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Submit Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={submitModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>
                You have 60 seconds and 4 {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of your phone {'\n'}
                number {phone} & {lastPhoneDigit} & {generateNum} between 1 and 100.
              </Text>

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
                    style={[styles.hintButton, hintUsed && styles.hintButtonDisabled]}
                    onPress={handleUseHint}
                    disabled={hintUsed}
                  >
                    <Text style={styles.hintButtonText}>Use a Hint</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitGuess && openGameModal}
                  >
                    <Text style={styles.submitButtonText}>Submit Guess</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>  
          </View>
        </Modal>
              

        {/* Game Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={gameModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                game modal
              </Text>

              <View style={styles.gameModalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalStartButton}
                    onPress={handleTryAgain}
                  >
                    <Text style={styles.modalStartButtonText}>Try Again</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalStartButton}
                    onPress={() => setStartButtonVisible(true)}
                  >
                    <Text style={styles.modalStartButtonText}>End The Game</Text>
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
  gameContainer: {
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'red',
  },
  attemptsText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: 'purple',
    bottomBorderWidth: 2,
  },
  hintText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  hintButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  hintButtonDisabled: {
    backgroundColor: 'gray',
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
  gameModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default GameScreen;