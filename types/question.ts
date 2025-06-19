type BaseQuestion = {
  id: string;
  title: string;
  prompt?: string;
  explanation?: string;
};

type WordSegment = {
  type: 'word';
  word: string;
};

type BlankSegment = {
  type: 'blank';
  answer: string;
  accepts?: string[];
};

type Segment = WordSegment | BlankSegment;

export type FillInTheBlankQuestion = BaseQuestion & {
  type: 'fill-in-the-blank';
  content: Segment[];
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'multiple-choice';
  content: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  };
  fullAnswer: string;
};

export type Question = FillInTheBlankQuestion | MultipleChoiceQuestion;
