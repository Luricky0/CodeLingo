import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react-native';
import { FillInTheBlankQuestion, Question } from '../types/Question';
import Title from 'components/Title';

export default function FillInTheBlank(prop: {
  question: FillInTheBlankQuestion;
  onNext: any;
  addMistake: any;
}) {
  const question = prop.question;
  const blankCount = question.content.filter((i) => i.type === 'blank').length;

  const [inputs, setInputs] = useState<string[]>(Array(blankCount).fill(''));

  const [errors, setErrors] = useState<boolean[]>(Array(blankCount).fill(false));

  const [showAnswer, setShowAnswer] = useState(false);

  const onSubmit = () => {
    let shouldAddMistake = false;
    const newErrors = inputs.map((input, idx) => {
      const res = input.trim() !== question.content.filter((i) => i.type === 'blank')[idx].answer;
      if (!shouldAddMistake && res) shouldAddMistake = true;
      return res;
    });
    setErrors(newErrors);
    if (shouldAddMistake) {
      console.log('mistake!');
      prop.addMistake(question);
    }
    setShowAnswer(true);
  };

  const onChangeInput = (text: string, idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx] = text;
    setInputs(newInputs);
  };

  return (
    <View className="flex-1 justify-between p-6 font-mono">
      <Title>{question.title}</Title>

      <View className="flex-1 justify-center">
        {question.prompt ? (
          <View className="mb-6 items-center justify-center">
            <Text className="text-l font-mono">{question.prompt}</Text>
          </View>
        ) : (
          <></>
        )}
        <View className="h-60 max-w-full flex-row flex-wrap items-center justify-center">
          {(() => {
            let currentBlank = 0;
            return question.content.map((item, index) => {
              if (item.type === 'word') {
                return (
                  <Text key={index} className="mx-1 shrink font-mono text-base text-black">
                    {item.word}
                  </Text>
                );
              } else {
                const isError = errors[currentBlank];
                const inputVal = inputs[currentBlank];
                const correctAnswer = item.answer;
                const inputIndex = currentBlank;
                currentBlank++;
                return (
                  <TextInput
                    key={index}
                    underlineColorAndroid="transparent"
                    textAlignVertical="center"
                    className={`mx-1 shrink justify-center rounded border-b p-1 items-center${
                      showAnswer
                        ? isError
                          ? 'border-red-600 bg-red-300 text-black'
                          : 'border-black bg-green-200 text-black'
                        : 'border-black bg-gray-200 text-black'
                    }`}
                    style={{ width: correctAnswer!.length * 8 + 16, textAlignVertical: 'center' }}
                    editable={!showAnswer}
                    value={showAnswer && isError ? correctAnswer : inputVal}
                    onChangeText={(text) => onChangeInput(text, inputIndex)}
                  />
                );
              }
            });
          })()}
        </View>
      </View>
      <View className="items-end">
        <TouchableOpacity
          className="rounded-md px-4 py-2"
          onPress={() => {
            if (!showAnswer) onSubmit();
          }}
          activeOpacity={0.8}>
          {showAnswer ? (
            <ArrowRight size={48} color="black" onPress={() => prop.onNext()} />
          ) : (
            <Check size={48} color="green" onPress={() => onSubmit()} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
