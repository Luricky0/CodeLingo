import Unit from './features/Unit';
import './global.css';
import Chapter from './features/Chapter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnitType } from './types/Unit';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export type RootStackParamList = {
  Main: undefined;
  Chapter: undefined;
  Unit: { unit: UnitType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'menlo': require('./assets/fonts/Menlo-Regular.ttf'),
      'menlo-bold': require('./assets/fonts/Menlo-Bold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Chapter" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Chapter" component={Chapter} />
          <Stack.Screen name="Unit" component={Unit} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
