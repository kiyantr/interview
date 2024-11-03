import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { LeaderBoardModule } from './leader-board/leader-board.module';
import { QuizSessionModule } from './quiz-session/quiz-session.module';


@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    QuizModule,
    LeaderBoardModule,
    QuizSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
