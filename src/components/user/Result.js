import React, { useContext } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import QuizResult from './QuizResult';

const Result = () => {
  const { quizzes, results } = useContext(QuizContext);
  let counter = 0;
  const totalAttempted = results.map((result) => result.attempted)
    .reduce((a, b) => a + b);
  const totalCorrect = results.map((result) => result.score)
    .reduce((a, b) => a + b);

  return (
    <div className="m-auto text-center ">
      <table className="table text-capitalize">
        <thead>
          <tr>
            <th scope="col">{' '}</th>
            <th scope="col">Quiz</th>
            <th scope="col">Attempted</th>
            <th scope="col">Correct</th>
          </tr>
        </thead>
        <tbody>
          {
            quizzes.map((quiz) => {
              const result = results.find((result) => result.quiz_id === quiz.id);
              const { attempted, score } = result;
              counter += 1;
              return (
                <QuizResult
                  counter={counter}
                  title={quiz.title}
                  attempted={attempted}
                  score={score}
                  key={quiz.id}
                />
              );
            })
          }
        </tbody>
      </table>

      <p className="mt-4">
        {totalCorrect}
        {' '}
        correct answers of
        {' '}
        {totalAttempted}
        {' '}
        attempted questions
      </p>
    </div>
  );
};

export default Result;
