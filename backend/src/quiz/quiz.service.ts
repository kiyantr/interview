import { redisCache } from './../redis.cache';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizSessionService } from 'src/quiz-session/quiz-session.service';
import { Quiz, QuizDocument } from 'src/schemas/quiz.schema';


@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @Inject() private quizSessionService: QuizSessionService
  ) {}

  async findAll() {
    const data = await redisCache.get('quiz');
    if(data) {
      console.log('cache data quiz');
      
      return data;
    } 
    const result = await this.quizModel.find(
      { isActive: true },
      {
        'questions.correctAnswer': 0,
        'questions.answers.correct': 0,
      },
    );

    redisCache.set('quiz', result);
    return result;
  }

  async findOne(quizId: string) {
    return await this.quizModel.findById(quizId, {
      'questions._id': 1,
      'questions.correctAnswer': 1,
      'questions.score': 1,
    });
  }

  async joinQuiz(quizId: string, userId: string) {
    let quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    await this.quizSessionService.create(quizId, userId);
    return quiz;
  }
}
