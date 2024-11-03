import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QuizSession,
  QuizSessionDocument,
} from 'src/schemas/quiz-session.schema';

const REMAINING_TIMES = 3; // can get from each user

@Injectable()
export class QuizSessionService {
  constructor(
    @InjectModel(QuizSession.name)
    private quizSessionModel: Model<QuizSessionDocument>,
  ) {}

  async find(quizId: string, userId: string) {
    return await this.quizSessionModel.find({ quizId, userId, isActive: true });
  }

  async create(quizId: string, userId: string) {
    const qs = await this.find(quizId, userId);
    if (!qs.length) {
      // do something
      return;
    }

    if (qs.length > REMAINING_TIMES) {
      throw new BadRequestException('this quiz max attemps');
    }
    await this.quizSessionModel.findOneAndUpdate(
      { quizId, userId, isActive: true },
      { isActive: false },
    );
    const now = new Date();
    await this.quizSessionModel.create({ quizId, userId, startTime: now });
  }
}
