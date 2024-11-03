import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuiz } from './dto/submit-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }

  @Get(':id/user/:userId')
  async findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return await this.quizService.joinQuiz(id, userId);
  }

  @Post()
  async submit(@Body() model: SubmitQuiz) {
    console.log({model});
    
    return {ok: true};
  }
}
