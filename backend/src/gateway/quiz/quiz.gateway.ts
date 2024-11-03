import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { QuizService } from 'src/quiz/quiz.service';
import { LeaderBoardService } from 'src/leader-board/leader-board.service';
import { CreateLeaderBoardDto } from 'src/leader-board/dto/create-leader-board.dto';
import { LeaderBoardDocument } from 'src/schemas/leader-board.schema';

interface LeaderboardEntry {
  _id: string;
  userId: string;
  quizId: string;
  score: number;
}

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private countdown = 60; // example countdown in seconds
  private leaderboard: LeaderboardEntry[] = [];
  private intervalId: NodeJS.Timeout;

  constructor(
    private readonly quizService: QuizService,
    private readonly leaderBoardService: LeaderBoardService,
  ) {
    this.startCountdownTimer();
    leaderBoardService.findAll().then((data) =>
      data.forEach((lb: LeaderBoardDocument) => {
        const { id, userId, quizId, score } = lb;
        this.leaderboard.push({ _id: id, userId, quizId, score });
      }),
    );
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const lb = this.getLeaderBoardScore();
    lb.sort((a, b) => b.score - a.score);
    this.server.emit('updateLeaderboard', lb);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private startCountdownTimer() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      this.server && this.server.emit('updateCountdown', this.countdown);
    }, 1000);
  }

  @SubscribeMessage('joinQuiz')
  async handleJoinQuiz(
    @MessageBody() data: { userId: string; quizId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${data.userId} joined quiz ${data.quizId}`);
    client.join(data.quizId);
    client.data = { userId: data.userId, quizId: data.quizId };
    await this.quizService.joinQuiz(data.quizId, data.userId);
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    @MessageBody() data: { userId: string; quizId: string; answers: any },
    @ConnectedSocket() client: Socket,
  ) {
    const { quizId, answers, userId } = data;
    const score = await this.calculateScore(quizId, answers);
    await this.updateLeaderboard(userId, quizId, score);

    const lb = this.getLeaderBoardScore();
    lb.sort((a, b) => b.score - a.score);

    this.server.emit('updateLeaderboard', lb);
  }

  private async calculateScore(
    quizId: string,
    answers: Record<string, string>,
  ): Promise<number> {
    const quiz = await this.quizService.findOne(quizId);

    let score = 0;
    if (quiz && quiz.questions) {
      for (const question of quiz.questions) {
        console.log({ question, ans: answers[question._id.toString()] });

        if (
          answers[question._id.toString()] &&
          parseInt(answers[question._id.toString()]) === question.correctAnswer
        ) {
          score += question.score;
        }
      }
    }
    console.log('updte score ', score);
    return score;
  }

  private getLeaderBoardScore() {
    return this.leaderboard.reduce((prev, curr) => {
      const lbData = prev.find((f) => f.userId === curr.userId);
      if (!lbData) {
        prev.push({
          userId: curr.userId,
          score: curr.score,
        });
      } else {
        lbData.score += curr.score;
      }

      return prev;
    }, []);
  }

  private async updateLeaderboard(
    userId: string,
    quizId: string,
    score: number,
  ) {
    const entry = this.leaderboard.find(
      (entry) => entry.userId === userId && entry.quizId === quizId,
    );
    if (entry) {
      if (entry.score < score) {
        entry.score = score;
        await this.leaderBoardService.updateScore(entry._id, score);
      }
    } else {
      const model: CreateLeaderBoardDto = {
        userId,
        score,
        quizId,
      };
      const lb = await this.leaderBoardService.create(model);
      this.leaderboard.push({ _id: lb._id.toString(), userId, quizId, score });
    }
    // console.log({ leaderboard: this.leaderboard });
  }
}
