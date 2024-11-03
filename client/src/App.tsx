import React, { useEffect, useState } from 'react';
import quizService from './services/quizService';
import { useSocket } from './components/SocketProvider';
import Quiz, { Question } from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import './styles/InputCard.css';
import './styles/QuizTable.css';

interface QuizType {
  _id: string;
  title: string;
  totalScore: string;
  questions: Question[];
}

const App: React.FC = () => {
  const { clientId, userId, setUserId, socket } = useSocket();
  const [quiz, setQuiz] = useState<any>({});
  const [quizzes, setQuizzes] = useState<Array<QuizType>>();
  const [isUserIdEntered, setIsUserIdEntered] = useState<boolean>(!!userId);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserIdSubmit = () => {
    if (userId) {
      setIsUserIdEntered(true);
      setUserId(userId.trim());
      alert('Set user success');
    } else {
      alert('Please enter a User ID.');
    }
  };

  const handleJoinQuiz = (quiz: any) => {
    setQuiz(quiz);
    socket?.emit('joinQuiz', { userId, quizId: quiz._id });
  };

  useEffect(() => {
    quizService.getQuizzes().then((data) => setQuizzes(data));
  }, []);

  return (
    <div>
      <Leaderboard />
      {clientId && <>Client: {clientId}</>}

      <div>
        <div className='user-input-card-container'>
          <p className='user-input-label'>Enter User ID</p>
          <div className='user-input-card'>
            <input
              type='text'
              placeholder='Enter User ID'
              value={userId || ''}
              onChange={handleUserIdChange}
              className='user-input'
            />
            <button onClick={handleUserIdSubmit} className='enter-button'>
              Enter
            </button>
          </div>
        </div>

        {quiz?._id && userId && (
          <Quiz quiz={quiz} questions={quiz.questions} setQuiz={setQuiz} />
        )}

        {isUserIdEntered && !quiz?._id && (
          <div className='quiz-table-container'>
            <h2 className='quiz-table-header'>Quizzes</h2>
            <table className='quiz-table'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!quiz?._id &&
                  quizzes &&
                  quizzes.map((quiz: QuizType) => (
                    <tr key={quiz._id}>
                      <td>{quiz.title}</td>
                      <td>{quiz.totalScore}</td>
                      <td>
                        <button
                          onClick={() => handleJoinQuiz(quiz)}
                          className='join-button'
                        >
                          Join Quiz
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
