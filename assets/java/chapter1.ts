import { ChapterType } from '../../types/Chapter';
import { UnitType } from '../../types/Unit';

export const unit1: UnitType = {
  id: 'java-1-1',
  chapterId: 'java-1',
  order: 1,
  title: 'Java Basics',
  description: 'Learn fundamental Java syntax: variables, functions, control flow, and types.',
  nextUnitId: 'unit-java-basics-2',
  questions: [
    {
      id: 't0',
      type: 'tips',
      title: 'Use int to declare a space that store an integer',
      content: {
        example: [
          [
            { type: 'point', word: 'int' },
            { type: 'word', word: 'x;' },
          ],
          [
            { type: 'word', word: 'int x' },
            { type: 'point', word: '=' },
            { type: 'word', word: '0 ;' },
          ],

          [
            { type: 'word', word: 'int x = 0 ' },
            { type: 'point', word: ';' },
          ],
        ],
        explanation: [
          'declare an integer named x',
          'use = to set x by 0 initially',
          'add ; to every end of a sentence',
        ],
      },
    },
    {
      id: 'q9',
      type: 'multiple-choice',
      title: 'Declare',
      content: {
        questionText: 'Which is the right word for declaring an integer?',
        options: ['inte', 'int', 'double', 'integer'],
        correctAnswer: 'int',
      },
      fullAnswer: 'Use int to declare a space that store an integer',
    },
    {
      id: 't2',
      type: 'tips',
      title: 'Valid name for a variable',
      content: {
        example: [
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: '2+;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'az$_ ;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'double ;' },
          ],
        ],
        explanation: [
          '2+ is not a valid name for a variable',
          'in java a variable can only be named by roman letters, $ or _',
          'keywords of java are prohibited for naming a variable',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'word-sorting',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: {
        options: ['int', 'Int', '==', ':', 'integer', 'x', ';', '=', '0'],
        answer: ['int', 'x', '=', '0', ';'],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'blank', answer: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'blank', answer: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
  ],
};

export const unit2: UnitType = {
  id: 'java-1-2',
  chapterId: 'java-1',
  order: 2,
  title: 'Java Basics',
  description: 'Learn fundamental Java syntax: variables, functions, control flow, and types.',
  nextUnitId: 'unit-java-basics-2',
  questions: [
    {
      id: 't0',
      type: 'tips',
      title: 'This is Unit 2i',
      content: {
        example: [
          [
            { type: 'point', word: 'int' },
            { type: 'word', word: 'x;' },
          ],
          [
            { type: 'word', word: 'int x' },
            { type: 'point', word: '=' },
            { type: 'word', word: '0 ;' },
          ],

          [
            { type: 'word', word: 'int x = 0 ' },
            { type: 'point', word: ';' },
          ],
        ],
        explanation: [
          'declare an integer named x',
          'use = to set x by 0 initially',
          'add ; to every end of a sentence',
        ],
      },
    },
    {
      id: 'q9',
      type: 'multiple-choice',
      title: 'Declare',
      content: {
        questionText: 'Which is the right word for declaring an integer?',
        options: ['inte', 'int', 'double', 'integer'],
        correctAnswer: 'int',
      },
      fullAnswer: 'Use int to declare a space that store an integer',
    },
    {
      id: 't2',
      type: 'tips',
      title: 'Valid name for a variable',
      content: {
        example: [
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: '2+;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'az$_ ;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'double ;' },
          ],
        ],
        explanation: [
          '2+ is not a valid name for a variable',
          'in java a variable can only be named by roman letters, $ or _',
          'keywords of java are prohibited for naming a variable',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'word-sorting',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: {
        options: ['int', 'Int', '==', ':', 'integer', 'x', ';', '=', '0'],
        answer: ['int', 'x', '=', '0', ';'],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'blank', answer: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'blank', answer: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
  ],
};

export const unit201: UnitType = {
  id: 'java-2-1',
  chapterId: 'java-2',
  order: 1,
  title: 'Java Basics',
  description: 'Learn fundamental Java syntax: variables, functions, control flow, and types.',
  nextUnitId: 'unit-java-basics-2',
  questions: [
    {
      id: 't0',
      type: 'tips',
      title: 'This is Unit 2i',
      content: {
        example: [
          [
            { type: 'point', word: 'int' },
            { type: 'word', word: 'x;' },
          ],
          [
            { type: 'word', word: 'int x' },
            { type: 'point', word: '=' },
            { type: 'word', word: '0 ;' },
          ],

          [
            { type: 'word', word: 'int x = 0 ' },
            { type: 'point', word: ';' },
          ],
        ],
        explanation: [
          'declare an integer named x',
          'use = to set x by 0 initially',
          'add ; to every end of a sentence',
        ],
      },
    },
    {
      id: 'q9',
      type: 'multiple-choice',
      title: 'Declare',
      content: {
        questionText: 'Which is the right word for declaring an integer?',
        options: ['inte', 'int', 'double', 'integer'],
        correctAnswer: 'int',
      },
      fullAnswer: 'Use int to declare a space that store an integer',
    },
    {
      id: 't2',
      type: 'tips',
      title: 'Valid name for a variable',
      content: {
        example: [
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: '2+;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'az$_ ;' },
          ],
          [
            { type: 'word', word: 'int' },
            { type: 'point', word: 'double ;' },
          ],
        ],
        explanation: [
          '2+ is not a valid name for a variable',
          'in java a variable can only be named by roman letters, $ or _',
          'keywords of java are prohibited for naming a variable',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'word', word: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'word-sorting',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: {
        options: ['int', 'Int', '==', ':', 'integer', 'x', ';', '=', '0'],
        answer: ['int', 'x', '=', '0', ';'],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'word', word: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'word', word: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'word', word: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use int to declare a space that store an integer',
      prompt: 'Declare an integer named x with an intial value of 0 ',
      content: [
        { type: 'blank', answer: 'int' },
        { type: 'blank', answer: 'x' },
        { type: 'blank', answer: '=' },
        { type: 'blank', answer: '0' },
        { type: 'blank', answer: ';' },
      ],
    },
  ],
};

export const chapter: ChapterType = {
  id: 'java-1',
  lang: 'java',
  no: 1,
  units: [],
  title: 'Learn the data type',
};
