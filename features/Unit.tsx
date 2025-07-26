import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { UnitType } from '../types/Unit';
import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question } from '../types/Question';
import MultipleChoiceSingleAnswer from './MultipleChoiceSingleAnswer';
import FillInTheBlank from './FillInTheBlank';
import TipsView from './Tips';
import WordSorting from './WordSorting';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDB } from '../database/db';
import { completeCurrentUnit, getNextUnitId, unlockNextUnit } from '../database/user';

export default function Unit() {
  const route = useRoute();
  const { unit } = route.params as { unit: UnitType };

  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const navigation = useNavigation();
  const unitSize = unit.questions.length;

  const onComplete = async () => {
    const db = await getDB();
    await completeCurrentUnit(db, unit.id, 1);
    await unlockNextUnit(db, unit.id);
    navigation.goBack();
  };

  const nextQuestion = async () => {
    if (curQuestionIndex >= unitSize + mistakes.length - 1) {
      onComplete();
    } else {
      setCurQuestionIndex(curQuestionIndex + 1);
    }
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
      return <WordSorting key={key} question={q} onNext={nextQuestion} addMistake={addMistake} />;
    } else if (q.type === 'tips') {
      return <TipsView key={key} tips={q} onNext={nextQuestion} />;
    }
  };

  return (
    <View className="w-full flex-1 bg-white p-1">
      <View className="mt-16 items-center p-2">
        <View className="m-4 h-4 w-full overflow-hidden rounded-full bg-gray-300">
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
