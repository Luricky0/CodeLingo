import Title from 'components/Title';
import { WordSortingQuestion } from 'features/Question';
import { ArrowRight, Check } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

export default function WordSorting({
  question,
  onNext,
  addMistake,
}: {
  question: WordSortingQuestion;
  onNext: any;
  addMistake: any;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [curAnswer, setCurAnswer] = useState<string[]>([]);
  const [errors, setErrors] = useState<boolean[]>([]);
  const [hasError, setHasError] = useState(false);
  const onSubmit = () => {
    const ans = question.content.answer;
    let hasErrorVar = false;
    const newErrors: boolean[] = curAnswer.map((cur, index) => {
      const correct = cur === ans[index];
      hasErrorVar = !correct || hasErrorVar;
      return !correct;
    });
    if (hasErrorVar || curAnswer.length !== question.content.answer.length) {
      setHasError(true);
      addMistake(question);
      console.log('add', hasErrorVar);
    }
    setErrors(newErrors);
    setShowAnswer(true);
  };

  const getAnswerView = () => {
    if (showAnswer) {
      return curAnswer.map((item, index) => {
        const bgColor = errors[index] ? 'bg-red-300' : 'bg-green-300';
        const thisClassName = `m-1 rounded ${bgColor} h-8 px-2 py-1 flex items-center justify-center`;
        return (
          <View key={index} className={thisClassName}>
            <Text key={index} className="text-l">
              {item}
            </Text>
          </View>
        );
      });
    } else {
      return curAnswer.map((item, index) => (
        <Pressable
          key={index}
          className="m-1 flex h-8 items-center justify-center rounded bg-gray-300 px-2 py-1"
          onPress={() => {
            const newCurAnswer = curAnswer.filter((item, idx) => idx !== index);
            setCurAnswer(newCurAnswer);
          }}>
          <Text key={index} className="text-l">
            {item}
          </Text>
        </Pressable>
      ));
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Title>{question.title}</Title>

      <View className="mx-2 w-full flex-1 items-center justify-center">
        <View className="flex-1 items-center justify-center">
          <Text>{question.prompt}</Text>
        </View>
        <View className="flex-1">
          <View className="h-8 flex-row flex-wrap">{getAnswerView()}</View>
          <View className="m-1 h-px w-full bg-gray-300" />
        </View>
      </View>

      <View className="w-full items-end items-center justify-center">
        {showAnswer ? (
          <View
            className={`h-16 w-full items-center justify-center rounded ${hasError ? 'bg-red-300' : 'bg-green-300'} p-1`}>
            <View className="flex-row flex-wrap">
              {question.content.answer.map((item, index) => {
                return (
                  <View key={index} className="m-1 rounded bg-white p-1 px-2">
                    <Text className="text-l">{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View className="h-16"></View>
        )}

        <View className="flex-row flex-wrap">
          {question.content.options.map((item, index) => (
            <Pressable
              key={index}
              className="m-2 flex h-8 items-center justify-center rounded bg-gray-300 px-2 py-1"
              onPress={() => {
                setCurAnswer([...curAnswer, item]);
              }}>
              <Text key={index} className="text-l">
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <TouchableOpacity
          className="rounded-md px-4 py-2"
          onPress={() => {
            if (!showAnswer) onSubmit();
          }}
          activeOpacity={0.8}>
          {showAnswer ? (
            <ArrowRight size={48} color="black" onPress={() => onNext()} />
          ) : (
            <Check size={48} color="green" onPress={() => onSubmit()} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
