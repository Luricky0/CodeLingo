import { View, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import './global.css';
import Unit from './features/Unit';
import { UnitType } from './types/Unit';

export default function App() {
 
  return (
    <>
      <Unit unit={javaBasicsUnit}></Unit>
    </>
  );
}
