import { UnitType } from '../types/Unit';
import { ChapterType } from '../types/Chapter';

import { View } from 'react-native';

export default function Chapter() {
  const javaBasicsUnit: UnitType = {
    id: 'unit-java-basics-1',
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
              { type: 'word', word: 'int' },
              { type: 'point', word: 'x = 0' },
              { type: 'word', word: ';' },
            ],

            [
              { type: 'word', word: 'int x = 0 ' },
              { type: 'point', word: ';' },
            ],
          ],
          explanation: [
            'declare an integer named x',
            'x is set by 0 initially',
            'add ; to every end of a sentence',
          ],
        },
      },
      {
        id: 'q1',
        type: 'fill-in-the-blank',
        title: 'Define the main function',
        content: [
          { type: 'blank', answer: 'void' },
          { type: 'blank', answer: 'main' },
          { type: 'word', word: '(String[]' },
          { type: 'word', word: 'args)' },
          { type: 'word', word: '{...}' },
        ],
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        title: 'Correct int declaration',
        content: {
          questionText:
            'Which of the following is a valid way to declare an integer variable in Java?',
          options: ['int num;', 'integer num;', 'Num num;', 'int: num;'],
          correctAnswer: 'int num;',
        },
        fullAnswer: 'int num;',
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        title: 'Printing to console',
        content: {
          questionText: 'Which statement prints "Hello" in Java?',
          options: [
            'print("Hello")',
            'System.out.println("Hello");',
            'Console.log("Hello");',
            'echo("Hello");',
          ],
          correctAnswer: 'System.out.println("Hello");',
        },
        fullAnswer: 'System.out.println("Hello");',
      },
      {
        id: 'q4',
        type: 'fill-in-the-blank',
        title: 'Variable declaration',
        content: [
          { type: 'blank', answer: 'String' },
          { type: 'word', word: 'name' },
          { type: 'word', word: '=' },
          { type: 'word', word: '"Java";' },
        ],
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        title: 'Boolean values',
        content: {
          questionText: 'Which of the following is a valid boolean value in Java?',
          options: ['yes', '1', 'true', '"true"'],
          correctAnswer: 'true',
        },
        fullAnswer: 'true',
      },
      {
        id: 'q6',
        type: 'fill-in-the-blank',
        title: 'If statement syntax',
        prompt: 'Execute when x is greater than ten',
        content: [
          { type: 'word', word: 'if' },
          { type: 'word', word: '(' },
          { type: 'blank', answer: 'x > 10', accepts: ['x>10,x >10, x> 10'] },
          { type: 'word', word: ')' },
          { type: 'word', word: '{ ... }' },
        ],
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        title: 'Java keywords',
        content: {
          questionText: 'Which of the following is a Java keyword?',
          options: ['define', 'function', 'class', 'public'],
          correctAnswer: 'public',
        },
        fullAnswer: 'public',
      },
      {
        id: 'q8',
        type: 'fill-in-the-blank',
        title: 'Declare a double',
        content: [
          { type: 'blank', answer: 'double' },
          { type: 'word', word: 'pi' },
          { type: 'word', word: '=' },
          { type: 'word', word: '3.14;' },
        ],
      },
      {
        id: 'q9',
        type: 'multiple-choice',
        title: 'Loop syntax',
        content: {
          questionText: 'Which loop repeats a block a known number of times?',
          options: ['while', 'for', 'if', 'switch'],
          correctAnswer: 'for',
        },
        fullAnswer: 'for',
      },
      {
        id: 'q10',
        type: 'fill-in-the-blank',
        title: 'Class declaration',
        content: [
          { type: 'blank', answer: 'public' },
          { type: 'blank', answer: 'class' },
          { type: 'word', word: 'MyClass' },
          { type: 'word', word: '{ ... }' },
        ],
      },
    ],
  };
  const chapter: ChapterType = {
    id: ' cp1',
    title: 'Learn the data type',
    units: [javaBasicsUnit],
  };
  return (
    <View>
      <View>
        {chapter.units.map((item, index) => (
          <View key={index} className="rounded bg-orange-300">
            {'>'}
          </View>
        ))}
      </View>
    </View>
  );
}
