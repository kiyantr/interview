interface Answer {
  answerId: number;
  title: string;
  description: string;
  order: number;
}

interface Question {
  _id: string;
  title: string;
  description: string;
  score: number;
  type: number; // 2: Single Choice, 4: Multiple Choice, 8: Text Input
  answers: Answer[];
}

interface QuizProps {
  questions: Question[];
  quiz: string;
}

const answerRender = {
  [1 << 1]: (question: Question) =>
    question.answers
      .sort((a, b) => a.order - b.order)
      .map((answer) => (
        <div key={answer.answerId}>
          <input type='radio' name={`question-${question._id}`} />
          <label>
            {answer.title}: {answer.description}
          </label>
        </div>
      )),
  [1 << 2]: (question: Question) =>
    question.answers
      .sort((a, b) => a.order - b.order)
      .map((answer) => (
        <div key={answer.answerId}>
          <input type='checkbox' name={`question-${question._id}`} />
          <label>
            {answer.title}: {answer.description}
          </label>
        </div>
      )),
  [1 << 3]: (question: Question) => (
    <input type='text' placeholder='Enter your answer' />
  ),
};

const QuestionTable: React.FC<QuizProps> = ({ questions, quiz }) => {
  const renderAnswers = (question: Question) => (
    <div>{answerRender[question.type]?.(question) || <>Answer empty</>}</div>
  );

  function handleSubmit(event: any): void {
    event.preventDefault();
    
  }

  return (
    <div>
      <h2>{quiz} - Questions</h2>
      {questions &&
        questions.map((question) => (
          <div key={question._id}>
            <h3>{question.title}</h3>
            <p>{question.description}</p>
            <p>Score: {question.score}</p>
            {renderAnswers(question)}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionTable;
