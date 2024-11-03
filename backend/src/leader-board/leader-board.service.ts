import { Injectable } from '@nestjs/common';
import { CreateLeaderBoardDto } from './dto/create-leader-board.dto';
import { UpdateLeaderBoardDto } from './dto/update-leader-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  LeaderBoard,
  LeaderBoardDocument,
} from 'src/schemas/leader-board.schema';
import { Model, Types } from 'mongoose';
import { redisCache } from 'src/redis.cache';

@Injectable()
export class LeaderBoardService {
  constructor(
    @InjectModel(LeaderBoard.name)
    private leaderboardModel: Model<LeaderBoardDocument>,
  ) {}

  async create(createLeaderBoardDto: CreateLeaderBoardDto) {
    const model = new this.leaderboardModel(createLeaderBoardDto);
    return await this.leaderboardModel.create(model);
  }

  async findAll() {
    console.log('leaderBoard find all');
    const data = await redisCache.get('leaderBoard');
    if (data) {
      console.log('cache leaderBoard');
      
      return data as LeaderBoardDocument[];
    }
    const result = await this.leaderboardModel.find();
    redisCache.set('leaderBoard', result);
    return result;
  }

  async findByUserId(userId: string) {
    return await this.leaderboardModel.find({ userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} leaderBoard`;
  }

  update(id: number, updateLeaderBoardDto: UpdateLeaderBoardDto) {
    return `This action updates a #${id} leaderBoard`;
  }

  async updateScore(id: string, score: number) {
    redisCache.delete('leaderBoard');
    return await this.leaderboardModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { score } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} leaderBoard`;
  }
}
