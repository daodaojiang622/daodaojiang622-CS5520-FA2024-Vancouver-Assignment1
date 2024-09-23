import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start">
          {props => <StartScreen {...props} onStartGame={() => props.navigation.navigate('Game')} />}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {props => (
            <GameScreen
              {...props}
              onBackToStartScreen={() => props.navigation.navigate('Start')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Confirm">
          {props => (
            <ConfirmScreen
              {...props}
              onPlayAgain={() => {
                props.navigation.navigate('Start'); // Go back to Start screen after resetting
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};