import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Colors } from '../helpers/Colors';
import GradientBackground from '../components/GradiantBackground';
import Button from '../components/Button';
import Card from '../components/Card';

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

  const [gameCardText, setGameCardText] = useState('');
  const [endCardText, setEndCardText] = useState('');
  const [endCardImage, setEndCardImage] = useState('');

  const [startCardVisible, setStartCardVisible] = useState(true);
  const [gameCardVisible, setGameCardVisible] = useState(false);
  const [endCardVisible, setEndCardVisible] = useState(false);
  const [submitCardVisible, setSubmitCardVisible] = useState(false);

  const openGameCard = () => {
    setStartCardVisible(false);
    setGameCardVisible(true);
    setEndCardVisible(false);
    setSubmitCardVisible(false);
  };

  const openEndCard = () => {
    setStartCardVisible(false);
    setGameCardVisible(false);
    setEndCardVisible(true);
    setSubmitCardVisible(false);
  };

  const openSubmitCard = () => {
    setStartCardVisible(false);
    setGameCardVisible(false);
    setEndCardVisible(false);
    setSubmitCardVisible(true);
    setUserInput('');
  };

  const lastPhoneDigit = phone.slice(-1); // last digit of phone number

  const getRandomNaturalNumber = () => {
    const min = minGuessRange;
    const max = maxGuessRange;
    let generateNum;
    do {
      generateNum = lastPhoneDigit * (Math.floor(Math.random() * (max - min + 1)) + min);
    } while (generateNum > maxGuessRange || generateNum < minGuessRange);
    return generateNum;
  };

  useEffect(() => {
    setGenerateNum(getRandomNaturalNumber());
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      openEndCard();
      setEndCardText('The game is over! \n You are out of time.');
      setEndCardImage(loseImage);
    }
  }, [timer]);

  const handleUseHint = () => {
    if (!hintUsed) {
      setHint('Hint: The last digit is ' + generateNum % 10);
      setHintUsed(true);
    }
  };

  const handleSGuess = () => {
    const guess = parseInt(userInput);

    if (attempts > 1 && timer > 0) {
      if (isNaN(guess) || guess < minGuessRange || guess > maxGuessRange) {
        Alert.alert('Invalid Input', `Please enter a number between ${minGuessRange} and ${maxGuessRange}.`);
        return false;
      } else if (guess === generateNum) {
        setAttempts(attempts - 1);
        openEndCard();
        setEndCardText('You guessed correctly! \n Attempts used: ' + (gameAttempts - attempts + 1));
        setEndCardImage({ uri: winImage });
        return true;
      } else if (guess < generateNum) {
        setAttempts(attempts - 1);
        openGameCard();
        setGameCardText('You did not guess correctly! \n Try a higher number.');
        return true;
      } else {
        setAttempts(attempts - 1);
        openGameCard();
        setGameCardText('You did not guess correctly! \n Try a lower number.');
        return true;
      }
    } else if (attempts === 1) {
      if (guess === generateNum) {
        openEndCard();
        setEndCardText('You guessed correctly! \n Attempts used: ' + (gameAttempts - attempts + 1));
        setEndCardImage({ uri: winImage });
        return true;
      } else {
        openEndCard();
        setEndCardText('The game is over! \n You are out of attempts.');
        setEndCardImage(loseImage);
        return false;
      }
    }
  };

  const handleTryAgain = () => {
    openSubmitCard();
  };

  const handleNewGame = () => {
    openSubmitCard();
    setTimer(gameTime);
    setAttempts(gameAttempts);
    setHintUsed(false);
    setHint('');
    setGenerateNum(getRandomNaturalNumber());
  };

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
      {/* Start Card */}
      {startCardVisible && (
        <View style={styles.cardContainer}>
          <Card>
            <Text style={styles.cardText}>
              You have {gameTime} seconds and {gameAttempts} {'\n'}
              attempts to guess a number {'\n'}
              that is a multiple of the last {'\n'}
              digit of your phone number {phone}.
            </Text>

            <View style={styles.cardButtonContainer}>
              <TouchableOpacity style={styles.cardStartButton} onPress={openSubmitCard}>
                <Text style={styles.cardStartButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}

      {/* Submit Card */}
      {submitCardVisible && (
        <View style={styles.cardContainer}>
          <View style={styles.cardView}>
            <Text style={styles.cardText}>
              Time left: {timer} seconds
              Attempts left: {attempts}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your guess"
              keyboardType="numeric"
              value={userInput}
              onChangeText={setUserInput}
              autoFocus={true}
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
      )}

      {/* Game Card */}
      {gameCardVisible && (
        <View style={styles.cardContainer}>
          <View style={styles.cardView}>
            <Text style={styles.cardText}>{gameCardText}</Text>

            <View style={styles.cardButtonContainer}>
              <Button onPress={handleTryAgain} title="Try Again" buttonStyle={styles.cardStartButton} />
              <TouchableOpacity style={styles.cardStartButton} onPress={handleNewGame}>
                <Text style={styles.cardStartButtonText}>End The Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* End Card */}
      {endCardVisible && (
        <View style={styles.cardContainer}>
          <View style={styles.cardView}>
            <Text style={styles.cardText}>{endCardText}</Text>
            <Image source={endCardImage} style={styles.endCardImage} />
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity style={styles.cardStartButton} onPress={handleNewGame}>
                <Text style={styles.cardStartButtonText}>New Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardStartButton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardStartButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  hintButton: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  hintButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  endCardImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default GameScreen;
