import Unit from './features/Unit';
import './global.css';
import Chapter from './features/Chapter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnitType } from './types/Unit';
import { useEffect } from 'react';
import { initDB } from 'database/db';

export type RootStackParamList = {
  Main: undefined;
  Chapter: undefined;
  Unit: { unit: UnitType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    const setupDB = async () => {
      await initDB();
    };
    setupDB();
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
