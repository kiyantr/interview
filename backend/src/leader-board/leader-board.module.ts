import { Module } from '@nestjs/common';
import { LeaderBoardService } from './leader-board.service';
import { LeaderBoardController } from './leader-board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LeaderBoard,
  LeaderBoardSchema,
} from 'src/schemas/leader-board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeaderBoard.name, schema: LeaderBoardSchema },
    ]),
  ],
  controllers: [LeaderBoardController],
  providers: [LeaderBoardService],
  exports: [LeaderBoardService],
})
export class LeaderBoardModule {}
