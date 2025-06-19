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
    if (q.type === 'fill-in-the-blank') {
      return <FillInTheBlank question={q} onNext={nextQuestion} addMistake={addMistake} />;
    } else if (q.type === 'multiple-choice') {
      return (
        <MultipleChoiceSingleAnswer question={q} onNext={nextQuestion} addMistake={addMistake} />
      );
    }
  };

  return <View>
    {getQuestionView()}
    </View>;
}
