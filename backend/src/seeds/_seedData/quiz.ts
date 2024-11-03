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
        title: 'Question 1',
        description: 'What is the opposite of "hot"?',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Cold true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Warm',
            order: 0,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Cool',
            order: 0,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Hot',
            order: 0,
            correct: false,
          },
        ],
        correctAnswer: A,
        type: QuestionType.SINGLE_CHOICE,
        score: 5,
      },
      {
        title: 'Question 2',
        description: 'What is another word for "happy"?',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Sad',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Angry',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Joyful true',
            order: 2,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Tired',
            order: 3,
            correct: false,
          },
        ],
        correctAnswer: C,
        type: QuestionType.SINGLE_CHOICE,
        score: 15,
      },
      {
        title: 'Question 3',
        description: 'Which of the following words mean "feeling fear or worry"? (Select all that apply)',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Excited',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Anxious true',
            order: 1,
            correct: true,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Nervous true',
            order: 2,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Calm',
            order: 3,
            correct: true,
          },
        ],
        correctAnswer: B | C,
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
        title: 'Question 1',
        description: 'What is the meaning of the word "diligent"?',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Lazy',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Careless',
            order: 0,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Hardworking true',
            order: 0,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Slow',
            order: 0,
            correct: false,
          },
        ],
        correctAnswer: C,
        type: QuestionType.SINGLE_CHOICE,
        score: 20,
      },
      {
        title: 'Question 2',
        description: 'What is the opposite of "quiet"?',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Silent',
            order: 0,
            correct: false,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Calm',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Loud true',
            order: 2,
            correct: true,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Peaceful',
            order: 3,
            correct: false,
          },
        ],
        correctAnswer: C,
        type: QuestionType.SINGLE_CHOICE,
        score: 20,
      },
      {
        title: 'Question 3',
        description: 'Which of the following words mean "feeling very happy and excited"? (Select all that apply)',
        answers: [
          {
            answerId: A,
            title: 'A',
            description: 'Thrilled true',
            order: 0,
            correct: true,
          },
          {
            answerId: B,
            title: 'B',
            description: 'Sad',
            order: 1,
            correct: false,
          },
          {
            answerId: C,
            title: 'C',
            description: 'Bored',
            order: 2,
            correct: false,
          },
          {
            answerId: D,
            title: 'D',
            description: 'Delighted true',
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
