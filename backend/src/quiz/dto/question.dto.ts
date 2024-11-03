import { QuestionType } from "../../schemas/quiz.schema";

export interface AnswerModel {
  answerId: number;
  title: string;
  description: string;
  order: number;
  correct: boolean;
}

export interface QuestionModel {
  title: string;
  description: string;
  answers: Array<AnswerModel>;
  correctAnswer: number;
  type: QuestionType;
  score: number;
}

export interface QuizModel {
  title: string;
  description: string;
  maxAttempts: number;
  //   attemptsCount: number; // Track current attempts for limiting quiz starts
  questions: Array<QuestionModel>;
  totalScore: number;
  isActive: boolean;
}
