import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import GenScreen from './GenScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Gen"
          component={GenScreen}
          options={({ route }) => ({
            title: `Geração ${route.params.generation}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
