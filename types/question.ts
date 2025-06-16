type QuestionType = 'multiple-choice' | 'fill-in-the-blank' | 'true-false' | 'coding';


interface BaseQuestion {
  id: string;
  type: QuestionType;
  title?: string;
  question: string;
  answer: string | string[];
  fullAnswer: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
}

interface FillInTheBlankQuestion extends BaseQuestion {
  type: 'fill-in-the-blank';
}

type Question = MultipleChoiceQuestion | FillInTheBlankQuestion; 
