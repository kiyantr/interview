import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizGateway } from 'src/gateway/quiz/quiz.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from 'src/schemas/quiz.schema';
import {
  QuizSession,
  QuizSessionSchema,
} from 'src/schemas/quiz-session.schema';
import { LeaderBoardService } from 'src/leader-board/leader-board.service';
import { LeaderBoard, LeaderBoardSchema } from 'src/schemas/leader-board.schema';
import { QuizSessionService } from 'src/quiz-session/quiz-session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizSession.name, schema: QuizSessionSchema },
      { name: LeaderBoard.name, schema: LeaderBoardSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService, LeaderBoardService, QuizSessionService, QuizGateway],
})
export class QuizModule {}
