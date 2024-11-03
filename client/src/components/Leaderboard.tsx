import React, { useEffect, useState } from 'react';
import { getSocket } from '../services/socket';
import '../styles/Leaderboard.css';

interface LeaderboardEntry {
  userId: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.on('updateLeaderboard', (data: LeaderboardEntry[]) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off('updateLeaderboard');
    };
  }, []);

  return (
    <div className='leaderboard'>
      <h2 className='leaderboard-title'>Leaderboard</h2>
      <div className='leaderboard-entries'>
        {leaderboard.map((entry, index) => (
          <div key={entry.userId} className='leaderboard-entry'>
            <div className='user-info'>
              {index < 2 && (
                <span className={`rank-icon rank-${index + 1}`}>
                  {index === 0 ? '🏆' : '🥈'}
                </span>
              )}
              <span className='user-id'>{entry.userId}</span>
            </div>
            <span className='user-score'>{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
