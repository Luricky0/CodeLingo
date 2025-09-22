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
      title: 'tips0',
      type: 'tips',
      content: {
        example: [
          [
            { type: 'point', word: 'if' },
            { type: 'word', word: '( x == 0 )' },
            { type: 'word', word: '{ x = x + 1; }' },
          ],
        ],
        explanation: ['x will plus 1 when x equals to 0'],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use if',
      prompt: 'x plus 1 when x equals to 0',
      content: [
        { type: 'blank', answer: 'if' },
        { type: 'word', word: '( x==0 )' },
        { type: 'word', word: '{ x = x+1; }' },
      ],
    },
    {
      id: 't0',
      title: 'tips0',
      type: 'tips',
      content: {
        example: [
          [
            { type: 'point', word: 'if' },
            { type: 'word', word: '( x == 0 )' },
            { type: 'word', word: '{ x = x + 1; }' },
            { type: 'point', word: 'else' },
            { type: 'word', word: '{x = x-1;}' },
          ],
        ],
        explanation: [
          'x will plus 1 when x equals to 0, x plus 1 when x equals to 0， other wise x minus 1',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use if-else',
      prompt: 'x plus 1 when x equals to 0， other wise x minus 1',
      content: [
        { type: 'blank', answer: 'if' },
        { type: 'word', word: '( x==0 )' },
        { type: 'word', word: '{ x = x+1; }' },
        { type: 'blank', answer: 'else' },
        { type: 'word', word: '{ x = x-1;}' },
      ],
    },
    {
      id: 't0',
      title: 'tips0',
      type: 'tips',
      content: {
        example: [
          [
            { type: 'point', word: 'if' },
            { type: 'word', word: '( x == 0 )' },
            { type: 'word', word: '{ x = x + 1; }' },
            { type: 'point', word: 'else if' },
            { type: 'word', word: '( x == 1 )' },
            { type: 'word', word: '{x = x-1;}' },
          ],
        ],
        explanation: ['x will plus 1 when x equals to 0, x will minus 1 when x equals to 1'],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Use if-else',
      prompt: 'x will plus 1 when x equals to 0, x will minus 1 when x equals to 1',
      content: [
        { type: 'blank', answer: 'if' },
        { type: 'word', word: '( x==0 )' },
        { type: 'word', word: '{ x = x+1; }' },
        { type: 'blank', answer: 'else if' },
        { type: 'word', word: '( x==1 )' },
        { type: 'word', word: '{ x = x-1;}' },
      ],
    },
  ],
};

export const unit3: UnitType = {
  id: 'java-1-3',
  chapterId: 'java-1',
  order: 3,
  title: 'For Loop',
  description: 'Learn how to use for loops to repeat actions a fixed number of times.',
  nextUnitId: 'unit-java-basics-3',
  questions: [
    {
      id: 't0',
      type: 'tips',
      title: 'Basic structure of a for loop',
      content: {
        example: [
          [
            { type: 'word', word: 'for' },
            { type: 'point', word: '(' },
            { type: 'word', word: 'int i = 0;' },
            { type: 'word', word: 'i < 5;' },
            { type: 'word', word: 'i++' },
            { type: 'point', word: ')' },
            { type: 'word', word: '{' },
            { type: 'word', word: '// do something' },
            { type: 'word', word: '}' },
          ],
        ],
        explanation: [
          'The for loop has three parts inside ( ): initialization, condition, and update.',
          'Initialization: int i = 0 starts the counter i at 0.',
          'Condition: i < 5 means the loop runs while i is less than 5.',
          'Update: i++ increases i by 1 after each loop.',
          'The code inside { } runs each time the condition is true.',
        ],
      },
    },
    {
      id: 'q1',
      type: 'multiple-choice',
      title: 'Loop condition',
      content: {
        questionText: 'Which part of a for loop decides when the loop stops?',
        options: ['Initialization', 'Condition', 'Update', 'Body'],
        correctAnswer: 'Condition',
      },
      fullAnswer: 'The condition part decides when the loop continues or stops.',
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      title: 'Update step',
      content: {
        questionText: 'In for(int i = 0; i < 3; i++), what does i++ do?',
        options: [
          'Sets i to 0',
          'Checks if i is less than 3',
          'Increases i by 1 each loop',
          'Ends the loop immediately',
        ],
        correctAnswer: 'Increases i by 1 each loop',
      },
      fullAnswer: 'i++ increases the value of i by 1 after every iteration.',
    },
    {
      id: 't1',
      type: 'tips',
      title: 'Loop body',
      content: {
        example: [
          [
            { type: 'word', word: 'for(int i=0; i<3; i++) {' },
            { type: 'word', word: 'System.out.println(i);' },
            { type: 'word', word: '}' },
          ],
        ],
        explanation: [
          'The loop body is the code inside { }.',
          'Here, System.out.println(i) will run every time the loop runs.',
          'The output will be 0, 1, 2 because i starts at 0 and stops when i = 3.',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Write a simple for loop',
      prompt: 'Fill in the missing parts of a loop that prints numbers 0 to 2.',
      content: [
        { type: 'word', word: 'for' },
        { type: 'word', word: '(' },
        { type: 'blank', answer: 'int i = 0' },
        { type: 'word', word: ';' },
        { type: 'blank', answer: 'i < 3' },
        { type: 'word', word: ';' },
        { type: 'blank', answer: 'i++' },
        { type: 'word', word: ')' },
        { type: 'word', word: '{' },
        { type: 'word', word: 'System.out.println(i);' },
        { type: 'word', word: '}' },
      ],
    },
    {
      id: 'ws2',
      type: 'word-sorting',
      title: 'Construct a for loop',
      prompt: 'Put the words in order to make a loop that runs 5 times.',
      content: {
        options: [
          'for',
          '(',
          'int i = 0',
          ';',
          'i < 5',
          ';',
          'i++',
          ')',
          '{',
          'System.out.println(i);',
          '}',
        ],
        answer: [
          'for',
          '(',
          'int i = 0',
          ';',
          'i < 5',
          ';',
          'i++',
          ')',
          '{',
          'System.out.println(i);',
          '}',
        ],
      },
    },
  ],
};

export const unit4: UnitType = {
  id: 'java-1-4',
  chapterId: 'java-1',
  order: 4,
  title: 'While Loop',
  description: 'Learn how to use while loops to repeat actions until a condition is false.',
  nextUnitId: 'unit-java-basics-4',
  questions: [
    {
      id: 't0',
      type: 'tips',
      title: 'Basic structure of a while loop',
      content: {
        example: [
          [
            { type: 'word', word: 'int i = 0;' },
            { type: 'word', word: 'while' },
            { type: 'point', word: '(' },
            { type: 'word', word: 'i < 3' },
            { type: 'point', word: ')' },
            { type: 'word', word: '{' },
            { type: 'word', word: 'System.out.println(i);' },
            { type: 'word', word: 'i++;' },
            { type: 'word', word: '}' },
          ],
        ],
        explanation: [
          'Start with i = 0, while i < 3 is true, run the body. Each time, print i and increase i by 1. The output is 0, 1, 2.',
        ],
      },
    },
    {
      id: 'q1',
      type: 'multiple-choice',
      title: 'Condition in while loop',
      content: {
        questionText: 'In a while loop, what decides whether the body runs again?',
        options: ['Initialization', 'Condition', 'Update', 'Semicolon'],
        correctAnswer: 'Condition',
      },
      fullAnswer: 'The condition inside parentheses decides whether the loop continues.',
    },
    {
      id: 't1',
      type: 'tips',
      title: 'Important: Update inside loop',
      content: {
        example: [
          [
            { type: 'word', word: 'int i = 0;' },
            { type: 'word', word: 'while(i < 5) {' },
            { type: 'word', word: 'i++;' },
            { type: 'word', word: '}' },
          ],
        ],
        explanation: [
          'Without i++ inside the body, the condition would never change and the loop would run forever.',
        ],
      },
    },
    {
      id: 'ws1',
      type: 'fill-in-the-blank',
      title: 'Write a simple while loop',
      prompt: 'Fill in the missing parts to print numbers 0 to 2.',
      content: [
        { type: 'word', word: 'int i = 0;' },
        { type: 'word', word: 'while' },
        { type: 'word', word: '(' },
        { type: 'blank', answer: 'i < 3' },
        { type: 'word', word: ')' },
        { type: 'word', word: '{' },
        { type: 'word', word: 'System.out.println(i);' },
        { type: 'blank', answer: 'i++' },
        { type: 'word', word: ';' },
        { type: 'word', word: '}' },
      ],
    },
    {
      id: 'ws2',
      type: 'word-sorting',
      title: 'Construct a while loop',
      prompt: 'Put the words in order to make a loop that prints numbers 0 to 4.',
      content: {
        options: [
          'int i = 0;',
          'while',
          '(',
          'i < 5',
          ')',
          '{',
          'System.out.println(i);',
          'i++;',
          '}',
        ],
        answer: [
          'int i = 0;',
          'while',
          '(',
          'i < 5',
          ')',
          '{',
          'System.out.println(i);',
          'i++;',
          '}',
        ],
      },
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

export const chapter2: ChapterType = {
  id: 'java-2',
  lang: 'java',
  no: 2,
  units: [],
  title: 'Learn the data type',
};
