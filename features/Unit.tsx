import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { UnitType } from '../types/Unit';
import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question } from '../types/Question';
import MultipleChoiceSingleAnswer from './MultipleChoiceSingleAnswer';
import FillInTheBlank from './FillInTheBlank';
import TipsView from './Tips';
import WordSorting from './WordSorting';

export default function Unit({ unit, back }: { unit: UnitType; back: any }) {
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const unitSize = unit.questions.length;
  const nextQuestion = () => {
    if (curQuestionIndex >= unitSize + mistakes.length - 1) back();
    setCurQuestionIndex(curQuestionIndex + 1);
    console.log(curQuestionIndex, unitSize + mistakes.length - 1);
  };
  const addMistake = (question: Question) => {
    const newMistakes = [...mistakes, question];
    setMistakes(newMistakes);
  };

  const getQuestionView = () => {
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
    } else if (q.type === 'word-sorting') {
      return <WordSorting question={q} onNext={nextQuestion} addMistake={addMistake} />;
    } else if (q.type === 'tips') {
      return <TipsView tips={q} onNext={nextQuestion} />;
    }
  };

  return (
    <View className="w-full flex-1 p-1 pt-16">
      <View className="items-center">
        <View className="m-4 h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full bg-green-500"
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
