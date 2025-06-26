import { WordSortingQuestion } from 'features/Question';
import { use, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function WordSorting({ question }: { question: WordSortingQuestion }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [curAnswer, setCurAnswer] = useState<string[]>([]);
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mx-2 flex-row flex-wrap">
        {curAnswer.map((item, index) => (
          <Pressable
            key={index}
            className="m-1 rounded bg-gray-300 p-1"
            onPress={() => {
              const newCurAnswer = curAnswer.filter((item, idx) => idx !== index);
              setCurAnswer(newCurAnswer);
            }}>
            <Text key={index}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {question.content.options.map((item, index) => (
          <Pressable
            key={index}
            className="m-1 rounded bg-gray-300 p-1"
            onPress={() => {
              setCurAnswer([...curAnswer, item]);
            }}>
            <Text key={index}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
