import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSession, QuizSessionSchema } from 'src/schemas/quiz-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizSession.name, schema: QuizSessionSchema },
    ]),
  ],
  controllers: [QuizSessionController],
  providers: [QuizSessionService],
  exports: [QuizSessionService],
})
export class QuizSessionModule {}
