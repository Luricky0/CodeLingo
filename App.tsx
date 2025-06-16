import { View, Text, TouchableOpacity } from 'react-native';
import './global.css';
import { useEffect, useState } from 'react';

export default function App() {
  const question = {
    title: '',
    question: '__ main (String[] args) \n { ... }',
    options: ['void', 'int', 'boolean', 'double'],
    answer: 'void',
    fullAnswer: 'void main (String[] args) \n { ... }',
  };
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const onSelect = (option: string) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };
  return (
    <View className="flex-1 justify-center bg-white p-6">
      <View className="mb-4">
        <Text>{question.title}</Text>
      </View>

      <View className="mb-8 flex-row justify-center">
        <Text className="font-mono text-base text-black">
          {showAnswer ? question.fullAnswer : question.question}
        </Text>
      </View>

      {question.options.map((option, index) => {
        let optionBg = 'bg-gray-100';
        if (showAnswer) {
          if (option === selectedOption && option === question.answer) {
            optionBg = 'bg-green-300';
          } else if (option === selectedOption && option !== question.answer) {
            optionBg = 'bg-red-300';
          }
        }
        return (
          <TouchableOpacity
            key={index}
            className={`mb-4 rounded-md p-4 ${optionBg}`}
            onPress={() => {
              if (!showAnswer) onSelect(option);
            }}
            activeOpacity={0.7}>
            <Text className=" font-mono text-base  text-black">{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
