import { QuestionType } from '../../schemas/quiz.schema';
import { AnswerModel, QuizModel } from '../../quiz/dto/question.dto';
import { SeedDataModel } from '../seedMain';

// Bitwise values for answers
const A = 1 << 1; // 2
const B = 1 << 2; // 4
const C = 1 << 3; // 8
const D = 1 << 4; // 16

// Quiz data to seed
export const quizData: QuizModel[] = [
  {
    title: 'General Knowledge Quiz',
    description: 'Test your general knowledge with these questions.',
    maxAttempts: 3,
    totalScore: 45,
    isActive: true,
    questions: [
      {
        title: 'Which of the following are primary colors?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Red true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Blue',
            order: 0,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Green',
            order: 0,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Yellow',
            order: 0,
            correct: false,
          },
        ],
        correctAnswer: A,
        type: QuestionType.SINGLE_CHOICE,
        score: 5,
      },
      {
        title: 'Which planet is known as the Red Planet?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Earth',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Venus',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Mars true',
            order: 2,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Jupiter',
            order: 3,
            correct: false,
          },
        ],
        correctAnswer: C,
        type: QuestionType.SINGLE_CHOICE,
        score: 15,
      },
      {
        title: 'What is the capital of France?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Rome true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Berlin',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Madrid',
            order: 2,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Paris true',
            order: 3,
            correct: true,
          },
        ],
        correctAnswer: A | D,
        type: QuestionType.MULTIPLE_CHOICE,
        score: 25,
      },
    ],
  },
  {
    title: 'General Knowledge Quiz 2',
    description: 'Test your general knowledge with these questions.',
    maxAttempts: 3,
    totalScore: 70,
    isActive: true,
    questions: [
      {
        title: 'Which of the following are primary colors?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Red true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Blue',
            order: 0,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Green',
            order: 0,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Yellow',
            order: 0,
            correct: false,
          },
        ],
        correctAnswer: A,
        type: QuestionType.SINGLE_CHOICE,
        score: 20,
      },
      {
        title: 'Which planet is known as the Red Planet?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Earth',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Venus',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Mars true',
            order: 2,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Jupiter',
            order: 3,
            correct: false,
          },
        ],
        correctAnswer: C,
        type: QuestionType.SINGLE_CHOICE,
        score: 20,
      },
      {
        title: 'What is the capital of France?',
        description: '',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Rome true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Berlin',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Madrid',
            order: 2,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Paris true',
            order: 3,
            correct: true,
          },
        ],
        correctAnswer: A | D,
        type: QuestionType.MULTIPLE_CHOICE,
        score: 30,
      },
    ],
  },
];

const data: QuizModel[] = [];

const SeedQuizs: SeedDataModel = {
  data,
  collectionName: 'quizs',
};

export default SeedQuizs;
