import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: `quizSessions` })
export class QuizSession {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  endTime: Date;
}

export type QuizSessionDocument = QuizSession & Document;
export const QuizSessionSchema = SchemaFactory.createForClass(QuizSession);
