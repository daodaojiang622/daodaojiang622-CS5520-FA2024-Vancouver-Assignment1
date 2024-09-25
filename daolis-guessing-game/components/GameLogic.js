export const GameLogic = (phone, gameTime, gameAttempts, minGuessRange, maxGuessRange) => {
    const lastPhoneDigit = phone.slice(-1);
    
    const getRandomNaturalNumber = () => {
      const min = minGuessRange;
      const max = maxGuessRange;
  
      let generateNum;
      do {
        generateNum = lastPhoneDigit * (Math.floor(Math.random() * (max - min + 1)) + min);
      } while (generateNum > maxGuessRange || generateNum < minGuessRange);
      
      return generateNum;
    };
  
    const initialState = {
      generateNum: getRandomNaturalNumber(),
      timer: gameTime,
      attempts: gameAttempts,
      hintUsed: false,
      hint: '',
      userInput: '',
      gameModalText: '',
      endModalText: '',
      endModalImage: null,
      gameStatus: 'start', // 'start', 'playing', 'end'
    };
  
    return {
      initialState,
      getRandomNaturalNumber,
      lastPhoneDigit,
    };
  };
  
  export const handleGuess = (guess, generateNum, attempts, timer) => {
    const response = {
      correct: false,
      newAttempts: attempts,
      gameStatus: 'playing',
      message: '',
    };
  
    if (attempts > 1 && timer > 0) {
      if (guess === generateNum) {
        response.correct = true;
        response.message = 'You guessed correctly!';
        response.newAttempts = attempts; // no new attempts needed
        response.gameStatus = 'end';
      } else {
        response.newAttempts -= 1;
        response.message = guess < generateNum ? 'Try a higher number.' : 'Try a lower number.';
      }
    } else if (attempts === 1) {
      if (guess === generateNum) {
        response.correct = true;
        response.message = 'You guessed correctly!';
      } else {
        response.message = 'The game is over! You are out of attempts.';
        response.gameStatus = 'end';
      }
    }
  
    return response;
  };
  