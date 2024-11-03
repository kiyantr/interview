import { Controller } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}
}
