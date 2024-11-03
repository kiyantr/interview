import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: `leaderBoards` })
export class LeaderBoard {
  @Prop({ required: true })
  userId: string;
  
  @Prop()
  score: number;

  @Prop()
  quizId: string;
}

export type LeaderBoardDocument = LeaderBoard & Document;
export const LeaderBoardSchema = SchemaFactory.createForClass(LeaderBoard);
