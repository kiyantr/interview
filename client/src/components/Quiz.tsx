import React, { useState } from 'react';
import { getSocket } from '../services/socket';
import { useSocket } from './SocketProvider';
import '../styles/QuestionList.css';

interface Answer {
  answerId: number;
  title: string;
  description: string;
  order: number;
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  score: number;
  type: number; // 2: Single Choice, 4: Multiple Choice, 8: Text Input
  answers: Answer[];
}

interface QuizProps {
  questions: Question[];
  quiz: any;
  setQuiz: (data: any) => void;
}

const SINGLE_CHOICE = 1 << 1;
const MULTIPLE_CHOICE = 1 << 2;

const answerRender = {
  [SINGLE_CHOICE]: (question: Question, setAnswers: any) =>
    question.answers
      .sort((a, b) => a.order - b.order)
      .map((answer) => (
        <div key={answer.answerId} className='answer-option'>
          <input
            type='radio'
            name={question._id}
            value={answer.answerId}
            onClick={(e) => setAnswers(question._id, answer.answerId)}
          />
          <label>
            {answer.title}: {answer.description}
          </label>
        </div>
      )),
  [MULTIPLE_CHOICE]: (question: Question, setAnswers: any) =>
    question.answers
      .sort((a, b) => a.order - b.order)
      .map((answer) => (
        <div key={answer.answerId} className='answer-option'>
          <input
            type='checkbox'
            name={question._id}
            value={answer.answerId}
            onClick={(e) => setAnswers(question._id, answer.answerId)}
          />
          <label>
            {answer.title}: {answer.description}
          </label>
        </div>
      )),
  [1 << 3]: (question: Question, setAnswers: any) => (
    <div className='answer-option'>
      <input
        type='text'
        placeholder='Enter your answer'
        onChange={(e) => setAnswers(question._id, e.target.value)}
        className='text-input'
      />
    </div>
  ),
};

const Quiz: React.FC<QuizProps> = ({ quiz, questions, setQuiz }) => {
  const { countdown, userId } = useSocket();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function handleSetAnswers(questionId: string, answer: any) {
    const question = questions.find((q) => q._id === questionId);
    if (!question) {
      return;
    }
    setAnswers((prev) => {
      let newAnswer = answer;
      if (question.type == MULTIPLE_CHOICE) {
        const currentAnswer = prev[questionId] || '0';
        newAnswer = parseInt(currentAnswer) ^ answer;
      }
      return { ...prev, [questionId]: newAnswer };
    });
  }

  const handleAnswerSubmit = (e: any) => {
    const socket = getSocket();

    socket.emit('submitAnswer', {
      userId: userId,
      quizId: quiz._id,
      answers: answers,
    });

    setQuiz(null);
  };

  return (
    // <div>
    //   {questions &&
    //     questions.map((question) => (
    //       <div key={question._id}>
    //         <h3>{question.title}</h3>
    //         <p>{question.description}</p>
    //         <p>Score: {question.score}</p>
    //         <div>
    //           {answerRender[question.type]?.(question, handleSetAnswers) || (
    //             <>Answer empty</>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   <button onClick={handleAnswerSubmit}>Submit Answer</button>
    // </div>
    <div className='question-list-container'>
      {questions.map((question) => (
        <div key={question._id} className='question-card'>
          <h3 className='question-title'>{question.title}</h3>
          <p className='question-description'>{question.description}</p>
          <p className='question-score'>Score: {question.score}</p>
          <div className='answers-container'>
            {answerRender[question.type]?.(question, handleSetAnswers) || (
              <>Answer empty</>
            )}
          </div>
        </div>
      ))}
      <div className='submit-footer'>
        <button onClick={handleAnswerSubmit} className='submit-button'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
