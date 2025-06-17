import { View, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react-native';

export default function MultipleChoiceSingleAnswer() {
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
    <View className="flex-1 justify-between bg-white p-6">
      <View className="flex-1 justify-center">
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
      <View className="items-end">
        <TouchableOpacity
          className="rounded-md px-4 py-2"
          onPress={() => {}}
          activeOpacity={0.8}
          style={{ opacity: showAnswer ? 1 : 0, pointerEvents: showAnswer ? 'auto' : 'none' }}>
          <ArrowRight size={48} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
