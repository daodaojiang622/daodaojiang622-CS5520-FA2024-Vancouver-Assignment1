import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { Colors } from '../helpers/Colors';
import GradientBackground from '../components/GradiantBackground';
import Button from '../components/Button';
import Card from '../components/Card';
import restartImage from '../assets/restartImage.png';

const GameScreen = ({onBackToStart, phone}) => {

  const gameTime = 60000;
  const gameAttempts = 4;
  const minGuessRange = 1;
  const maxGuessRange = 100;
  const loseImage = require('../assets/loseImage.png');
  const endImage = require('../assets/endGameManually.webp');

  const [generateNum, setGenerateNum] = useState(null);
  const winImage = 'https://picsum.photos/id/' + generateNum + '/100/100';

  const gameIntro =  `
You have ${gameTime} seconds and ${gameAttempts}
attempts to guess a number 
that is a multiple of the last 
digit of your phone number ${phone} & ${lastPhoneDigit} & ${generateNum} between ${minGuessRange} and ${maxGuessRange}.
  `

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
        <View style={styles.startCardContainer}>
          <Button 
            onPress={handleRestart} 
            source={restartImage}
            imageStyle={styles.restartButtonImage}
            buttonStyle={styles.restartButtonStartCard}
          />

          <Card>
            <Text style={styles.startCardText}>
              You have {gameTime} seconds and {gameAttempts} attempts 
              to guess a number that is a multiple of the last digit 
              of your phone number  {generateNum}  between {minGuessRange} and {maxGuessRange}.
            </Text>

            <Button
                title="Start"
                onPress={openSubmitCard}
                buttonStyle={styles.startCardStartButton}
                textStyle={styles.startCardStartButtonText}
              />
          </Card>
        </View>
      )}

      {/* Submit Card */}
      {submitCardVisible && (
        <View style={styles.submitCardContainer}>
          <Button 
            onPress={handleRestart} 
            source={restartImage}
            imageStyle={styles.restartButtonImage}
            buttonStyle={styles.restartButtonSubmitCard}
          />

          <Card>
            < Text style={styles.submitCardText}>
              You have {gameTime} seconds and {gameAttempts} attempts 
              to guess a number that is a multiple of the last digit 
              of your phone number  {generateNum}  between {minGuessRange} and {maxGuessRange}.
            </Text> 

            <Text style={styles.countDownText}>
              Time left: {timer} seconds {'\n'}
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

              <Button
                title="Use a Hint"
                onPress={handleUseHint}
                buttonStyle={[styles.hintButton, hintUsed && styles.hintButtonDisabled]}
                textStyle={styles.hintButtonText}
                disabled={hintUsed}
              />

              <Button
                title="Submit Guess"
                onPress={handleSGuess}
                buttonStyle={styles.submitButton}
                textStyle={styles.submitButtonText}
              />
          </Card>
        </View>
      )}

      {/* Game Card */}
      {gameCardVisible && (
        <View style={styles.gameCardContainer}>
          <Button 
            onPress={handleRestart} 
            source={restartImage}
            imageStyle={styles.restartButtonImage}
            buttonStyle={styles.restartButtonGameCard}
          />

          <Card>
            <Text style={styles.gameCardText}>{gameCardText}</Text>

            <View style={styles.gameCardButtonContainer}>
            <Button 
                title="End Game" 
                textStyle={styles.endGameButtonText}
                buttonStyle={styles.endGameButton}
                onPress={() => {
                  openEndCard();
                  setEndCardText('The game is over! \n Click below to restart.');
                  setEndCardImage(endImage);
                  }
                }
              />

              <Button 
                title="Try Again" 
                onPress={handleTryAgain} 
                buttonStyle={styles.tryAgainButton}
                textStyle={styles.tryAgainButtonText}
              />

            </View>
          </Card>
        </View>
      )}

      {/* End Card */}
      {endCardVisible && (
        <View style={styles.endCardContainer}>
        <Button 
            onPress={handleRestart} 
            source={restartImage}
            imageStyle={styles.restartButtonImage}
            buttonStyle={styles.restartButtonEndCard}
          />

          <Card>
            <Text style={styles.endCardText}>{endCardText}</Text>
            <Image source={endCardImage} style={styles.endCardImage} />

            <Button 
            title="New Game" 
            onPress={handleNewGame} 
            textStyle={styles.newGameButtonText}
            buttonStyle={styles.newGameButtonContainer}
            />
          </Card>
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
  startCardText: {
    fontSize: 18,
    textAlign: 'left',
    margin: 20,
  },
  submitCardText: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
  },
  input: {
    height: 30,
    borderColor: Colors.noColor,
    borderWidth: 2,
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
    borderBottomColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  hintButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  hintButtonText: {
    color: Colors.hint,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  endCardImage: {
    width: 100,
    height: 100,
    marginVertical: 30,
    alignSelf: 'center',
  },
  restartButtonStartCard: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  endCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 320,
    marginVertical: 100,
  },
  restartButtonEndCard: {
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 60,
    right: 5,
  },
  startCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginVertical: 110,
    padding: 20,
  },
  startCardStartButton: {
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 20,
  },
  startCardStartButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  restartButtonSubmitCard: {
    position: 'absolute',
    top: 130,
    right: 25,
  },
  submitCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: -10,
    padding: 20,
  },
  countDownText: {
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10,
    color: Colors.danger,
  },
  hintText: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
    color: Colors.hint,
  },
  endCardText: {
    fontSize: 20,
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
  },
  newGameButtonContainer: {
    backgroundColor: Colors.buttonBackground,
    margin: 10,
    alignSelf: 'center',
  },
  newGameButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  gameCardText: {
    fontSize: 20,
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
    textAlign: 'center',
  },
  gameCardContainer: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    marginTop: 150,
  },
  gameCardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  endGameButtonText: {
    color: Colors.danger,
    fontSize: 16,
  },
  tryAgainButton: {
    backgroundColor: Colors.buttonBackground,
  },
  tryAgainButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  restartButtonGameCard: {
    position: 'absolute',
    top: -100,
    right: -10,
  },
  restartButtonImage: {
    width: 100,
    height: 100,
  },
});

export default GameScreen;
