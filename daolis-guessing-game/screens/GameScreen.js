import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import { Colors } from '../helpers/Colors';
import GradientBackground from '../components/GradiantBackground';
import Button from '../components/Button';

const GameScreen = ({onBackToStart, phone}) => {

  const gameTime = 60;
  const gameAttempts = 4;
  const minGuessRange = 1;
  const maxGuessRange = 100;
  const loseImage = require('../assets/loseImage.png');
  const endImage = require('../assets/endGameManually.webp');

  const [generateNum, setGenerateNum] = useState(null);
  const winImage = 'https://picsum.photos/id/' + generateNum + '/100/100';

  const [timer, setTimer] = useState(gameTime);
  const [attempts, setAttempts] = useState(gameAttempts);
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState('');
  const [userInput, setUserInput] = useState('');

  const [gameModalText, setGameModalText] = useState('');
  const [endModalText, setEndModalText] = useState('');
  const [endModalImage, setEndModalImage] = useState('');

  const [startModalVisible, setStartModalVisible] = useState(true);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  console.log('start modal', startModalVisible);

  const openGameModal = () => {
    console.log('game modal', gameModalVisible);
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
    console.log('submit modal', submitModalVisible);
    setStartModalVisible(false);
    setGameModalVisible(false);
    setEndModalVisible(false);
    setSubmitModalVisible(true);
    setUserInput('');
  };

  const lastPhoneDigit = phone.slice(-1); // the last digit of input phone number

  const getRandomNaturalNumber = () => {
      const min = minGuessRange;
      const max = maxGuessRange;

      let generateNum;
      do {
          generateNum = lastPhoneDigit * (Math.floor(Math.random() * (max - min + 1)) + min);
      } while (generateNum > maxGuessRange || generateNum < minGuessRange);
      return generateNum;
  };

  // Generate a random number when the game starts
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
    } else if (timer === 0) {
      openEndModal();
      setEndModalText('The game is over! \n You are out of time.');
      setEndModalImage(loseImage);
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

  // Handle guess submission
  const handleSGuess = () => {
    const guess = parseInt(userInput);

    if (attempts > 1 && timer > 0) {
      // Check if the input is a number between 1 and 100
      if (isNaN(guess) || guess < minGuessRange || guess > maxGuessRange) {
        Alert.alert('Invalid Input', `Please enter a number between ${minGuessRange} and ${maxGuessRange}.`);
        return false;
      } else if (guess === generateNum) {
        setAttempts(attempts - 1);
        openEndModal();
        setEndModalText('You guesses correctly! \n Attempts used: ' + (gameAttempts - attempts + 1));
        setEndModalImage({ uri: winImage });
        return true;
      } else if (guess < generateNum) {
        setAttempts(attempts - 1);
        openGameModal();
        setGameModalText('You did not guess correctly! \n Try a higher number.');
        return true;
      } else {
        setAttempts(attempts - 1);
        openGameModal();
        setGameModalText('You did not guess correctly! \n Try a lower number.');
        return true;
      }
    } else if (attempts === 1) {
      if (guess === generateNum) {
        openEndModal();
        setEndModalText('You guesses correctly! \n Attempts used: ' + ({gameAttempts} - attempts + 1));
        setEndModalImage({ uri: winImage });
        return true;
      } else {
        openEndModal();
        setEndModalText('The game is over! \n You are out of attempts.');
        setEndModalImage(loseImage);
        return false; 
      }
    }
  }

  // Handle try again
  const handleTryAgain = () => {
    openSubmitModal();
  }

  // Handle new game
  const handleNewGame = () => {
    openSubmitModal();
    setTimer(gameTime);
    setAttempts(gameAttempts);
    setHintUsed(false);
    setHint('');
    setGenerateNum(getRandomNaturalNumber());
  }
  
  // handle restart, if user confirmes, navigate to start screen
  const handleRestart = () => {
    Alert.alert(
      'Confirm Restart',
      'Are you sure you want to go back to the home screen?',
      [
        {
          text: 'Yes',
          onPress: () => {
            onBackToStart();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <GradientBackground>

        {/* Start Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={true}
        >
          <View style={styles.restartButtonStartModalContainer}>
            <TouchableOpacity
              style={styles.restartButton}
              visible={startModalVisible}
              onPress={handleRestart}
            >
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You have {gameTime} seconds and {gameAttempts} {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of your phone {'\n'}
                number {phone} & {lastPhoneDigit} & {generateNum} between {minGuessRange} and {maxGuessRange}.
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
         <View style={styles.restartButtonSubmitModalContainer}>
            <TouchableOpacity
              style={styles.restartButton}
              visible={submitModalVisible}
              onPress={handleRestart}
            >
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>
                You have {gameTime} seconds and {gameAttempts} {'\n'}
                attemps to guess a number {'\n'}
                that is multiply of the {'\n'}
                last digit of your phone {'\n'}
                number {phone} & {lastPhoneDigit} & {generateNum} between {minGuessRange} and {maxGuessRange}.
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
                autoFocus = {true}
              />

              {hint ? <Text style={styles.hintText}>{hint}</Text> : null}

                <View style={styles.buttonContainer}>

                <Button 
                    onPress={handleUseHint} 
                    title="Use a Hint" 
                    buttonStyle={[styles.hintButton, hintUsed && styles.hintButtonDisabled]}
                    textStyle={styles.hintButtonText} 
                    disabled={hintUsed}
                  />

                  <Button 
                    onPress={handleSGuess} 
                    title="Submit Guess" 
                    buttonStyle={styles.submitButton}
                    textStyle={styles.submitButtonText} 
                  />
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
          <View style={styles.restartButtonGameModalContainer}>
            <TouchableOpacity
              style={styles.restartButton}
              visible={gameModalVisible}
              onPress={handleRestart}
            >
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {gameModalText}
              </Text>

              <View style={styles.gameModalButtonContainer}>
                <Button 
                    onPress={handleTryAgain} 
                    title="Try Again" 
                    buttonStyle={styles.modalTryAgainButton}
                    textStyle={styles.modalTryAgainButtonText} 
                  />
                <Button 
                    title="End The Game" 
                    buttonStyle={styles.modalEndGameButton}
                    textStyle={styles.modalEndGameButtonText} 
                    onPress={() => {
                      openEndModal();
                      setEndModalText('The game is over! \n Click below to restart.');
                      setEndModalImage(endImage);
                    }
                  }
                  />
                </View>
            </View>
          </View>
        </Modal>

        {/* End Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={endModalVisible}
        >
          <View style={styles.restartButtonEndModalContainer}>
            <TouchableOpacity
              style={styles.restartButton}
              visible={endModalVisible}
              onPress={handleRestart}
            >
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{endModalText}</Text>
              <Image source={endModalImage} style={styles.endModalImage} />
              
              <View style={styles.gameModalButtonContainer}>
              <Button 
                    title="New Game" 
                    buttonStyle={styles.modalStartButton}
                    textStyle={styles.modalStartButtonText} 
                    onPress={handleNewGame}
                  />
                </View>
            </View>
          </View>
        </Modal>
        
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.noColor,
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
    textAlign: 'center',
  },
  modalStartButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
  },
  modalStartButtonText: {
    color: Colors.buttonText,
  },
  modalTryAgainButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    width: 90,
  },
  modalTryAgainButtonText: {
    color: Colors.buttonText,
  },
  modalEndGameButton: {
    backgroundColor: Colors.danger,
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  modalEndGameButtonText: {
    color: Colors.buttonText,
  },
  gameContainer: {
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 15,
    marginBottom: 20,
    color: Colors.danger,
  },
  attemptsText: {
    fontSize: 15,
    marginBottom: 20,
    color: Colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.noColor,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 2,
  },
  hintText: {
    fontSize: 15,
    marginBottom: 20,
    color: Colors.hint,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  hintButton: {
    backgroundColor: Colors.hint,
    padding: 10,
    borderRadius: 5,
    width: 90,
  },
  hintButtonDisabled: {
    backgroundColor: Colors.disabled,
  },
  hintButtonText: {
    color: Colors.buttonText,
  },
  submitButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    width: 110,
  },
  submitButtonText: {
    color: Colors.buttonText,
  },
  gameModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  restartButtonGameModalContainer: {
    position: 'absolute',
    top: 300,
    left: 285,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  restartButtonText: {  
    color: Colors.buttonText,
  },
  restartButtonSubmitModalContainer: {
    position: 'absolute',
    top: 160,
    left: 285,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  restartButtonStartModalContainer: {
    position: 'absolute',
    top: 250,
    left: 285,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  endModalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  restartButtonEndModalContainer: {
    position: 'absolute',
    top: 230,
    left: 285,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default GameScreen;