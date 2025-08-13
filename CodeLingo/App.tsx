import Unit from './features/Unit';
import './global.css';
import Chapter from './features/Chapter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnitType } from './types/Unit';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { getDB } from 'database/db';
import { getToken } from 'database/user';
import Login from './features/Login';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Chapter: undefined;
  Unit: { unit: UnitType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const load = async () => {
    const db = await getDB();
    const token = await getToken(db);
    if (token) setHasToken(true);
  };

  useEffect(() => {
    Font.loadAsync({
      menlo: require('./assets/fonts/Menlo-Regular.ttf'),
      'menlo-bold': require('./assets/fonts/Menlo-Bold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <NavigationContainer>
        {hasToken ? (
          <Stack.Navigator initialRouteName="Chapter" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chapter" component={Chapter} />
            <Stack.Screen name="Unit" component={Unit} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chapter" component={Chapter} />
            <Stack.Screen name="Unit" component={Unit} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
