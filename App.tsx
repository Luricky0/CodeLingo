import { View, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import './global.css';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react-native';
import MultipleChoiceSingleAnswer from 'features/MultipleChoiceSingleAnswer';
import FillInTheBlank from 'features/FillInTheBlank';

export default function App() {
  return (
    <>
      <FillInTheBlank />
    </>
  );
}
