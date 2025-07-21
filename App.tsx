import { View, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import './global.css';
import Unit from './features/Unit';
import Chapter from './features/Chapter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnitType } from './types/Unit';
import { initDB } from 'database/db';

export type RootStackParamList = {
  Main: undefined;
  Chapter: undefined;
  Unit: { unit: UnitType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  initDB();
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
