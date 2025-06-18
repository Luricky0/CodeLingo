import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react-native';

export default function FillInTheBlank() {
  const question = {
    title: 'Define the main function',
    question: [
      { type: 'blank', answer: 'void' },
      {
        type: 'blank',
        answer: 'main',
      },
      {
        type: 'word',
        word: '(String[]',
      },
      {
        type: 'word',
        word: 'args)',
      },
      {
        type: 'word',
        word: '{...}',
      },
    ],
  };

  // 计算填空数量
  const blankCount = question.question.filter((i) => i.type === 'blank').length;

  // 输入状态
  const [inputs, setInputs] = useState<string[]>(Array(blankCount).fill(''));

  // 错误状态
  const [errors, setErrors] = useState<boolean[]>(Array(blankCount).fill(false));

  // 是否显示答案
  const [showAnswer, setShowAnswer] = useState(false);

  // 提交函数，校验答案
  const onSubmit = () => {
    const newErrors = inputs.map((input, idx) => {
      return input.trim() !== question.question.filter((i) => i.type === 'blank')[idx].answer;
    });
    setErrors(newErrors);
    setShowAnswer(true);
  };

  const onChangeInput = (text: string, idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx] = text;
    setInputs(newInputs);
  };

  return (
    <View className="flex-1 justify-between p-6 ">
      <View className="flex-1 justify-center">
        <View className="mb-4 items-center justify-center bg-yellow-300">
          <Text className=" font-mono">{question.title}</Text>
        </View>

        <View className="max-w-full flex-row flex-wrap items-center justify-center">
          {(() => {
            let currentBlank = 0;
            return question.question.map((item, index) => {
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
                    className={`mx-1 shrink rounded border-b p-1 text-base ${
                      showAnswer
                        ? isError
                          ? 'border-red-600 bg-red-300 text-black'
                          : 'border-black bg-green-200 text-black'
                        : 'border-black bg-gray-200 text-black'
                    }`}
                    style={{ width: correctAnswer!.length * 8 + 16 }}
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
          {showAnswer ? <ArrowRight size={48} color="black" /> : <Check size={48} color="green" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
