import { View, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react-native';
import { MultipleChoiceQuestion } from '../types/Question';
import Title from 'components/Title';

export default function MultipleChoiceSingleAnswer({
  question,
  onNext,
  addMistake,
}: {
  question: MultipleChoiceQuestion;
  onNext: any;
  addMistake: any;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const onSelect = (option: string) => {
    setSelectedOption(option);
    if (option !== question.content.correctAnswer) {
      addMistake(question);
    }
    setShowAnswer(true);
  };
  return (
    <View className="flex-1 justify-between p-6">
      <Title>{question.title}</Title>
      <View className="flex-1 justify-center">
        <View className="mb-8 flex-row justify-center">
          <Text className="font-mono text-base text-black">{question.content.questionText}</Text>
        </View>

        <View>
          {question.content.options.map((option, index) => {
            let optionBg = 'bg-gray-100';
            if (showAnswer) {
              if (option === selectedOption && option === question.content.correctAnswer) {
                optionBg = 'bg-green-300';
              } else if (option === selectedOption && option !== question.content.correctAnswer) {
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
      </View>
      <View className="items-end">
        <TouchableOpacity
          className="rounded-md px-4 py-2"
          onPress={() => {}}
          activeOpacity={0.8}
          style={{ opacity: showAnswer ? 1 : 0, pointerEvents: showAnswer ? 'auto' : 'none' }}>
          <ArrowRight size={48} color="black" onPress={() => onNext()} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
