import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum QuestionType {
  SINGLE_CHOICE = 1 << 1,
  MULTIPLE_CHOICE = 1 << 2,
}

@Schema({ timestamps: true, collection: `quizs` })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  maxAttempts: number; // Maximum number of attempts allowed for this quiz

  @Prop([
    {
      title: String,
      description: String,
      answers: [
        {
          answerId: { require: true, type: Number, index: true }, // Bitwise ID for each answer (2, 4, etc.)
          title: String,
          description: String,
          order: Number,
          correct: Boolean,
        },
      ],
      correctAnswer: { type: Number, index: true }, // Bitwise number for the correct answer => maybe change String for text answer
      score: Number,
      type: { type: Number },
    },
  ])
  questions: Array<{
    _id: Types.ObjectId,
    title: string;
    description: string;
    answers: Array<{
      answerId: number;
      title: string;
      description: string;
      order: number;
      correct: boolean;
    }>;
    correctAnswer: number;
    score: number;
    type: QuestionType;
  }>;

  @Prop()
  totalScore: number;

  @Prop()
  isActive: boolean;
}

export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);
