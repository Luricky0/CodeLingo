import { useState } from 'react';
import { View } from 'react-native';
import { UnitType } from '../types/Unit';
import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question } from '../types/Question';
import MultipleChoiceSingleAnswer from './MultipleChoiceSingleAnswer';
import FillInTheBlank from './FillInTheBlank';

export default function Unit({ unit }: { unit: UnitType }) {
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const nextQuestion = () => {
    setCurQuestionIndex(curQuestionIndex + 1);
  };
  const addMistake = (question: Question) => {
    const newMistakes = [...mistakes, question];
    setMistakes(newMistakes);
  };

  const getQuestionView = () => {
    const unitSize = unit.questions.length;
    const q =
      curQuestionIndex >= unitSize
        ? mistakes[curQuestionIndex - unitSize]
        : unit.questions[curQuestionIndex];
    const key = q.id + '-' + curQuestionIndex;
    if (q.type === 'fill-in-the-blank') {
      return (
        <FillInTheBlank key={key} question={q} onNext={nextQuestion} addMistake={addMistake} />
      );
    } else if (q.type === 'multiple-choice') {
      return (
        <MultipleChoiceSingleAnswer
          key={key}
          question={q}
          onNext={nextQuestion}
          addMistake={addMistake}
        />
      );
    }
  };

  return (
    <View className="flex-1 p-1">
      <View className="mb-4 w-full items-center">
        <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full bg-blue-500"
            style={{
              width: `${((curQuestionIndex + 1) / (unit.questions.length + mistakes.length)) * 100}%`,
            }}
          />
        </View>
      </View>
      {getQuestionView()}
    </View>
  );
}
