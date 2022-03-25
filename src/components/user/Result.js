/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';

import QuizResult from './QuizResult';
import { Roller } from '../index';
import { getResultsRequest } from '../../api/api';

const Result = () => {
  const { quizzes, results, saveResult } = useContext(QuizContext);
  const { addNotification } = useContext(NotificationContext);

  const totalAttempted = results.map((result) => result.attempted)
    .reduce((a, b) => a + b, 0);
  const totalCorrect = results.map((result) => result.score)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const handlefetchResultsRequest = async () => {
      try {
        const response = await getResultsRequest();
        const { alert, result } = response;
        if (result) {
          saveResult({ results: result });
        }
        if (alert) {
          addNotification({ alert });
        }
      } catch (error) {
        addNotification({ alert: error.message });
      }
    };
    handlefetchResultsRequest();
    // eslint-disable-next-line
  }, []);

  let counter = 0;
  return (
    <>
      {
          (quizzes.length === 0 || results.length === 0) ? <Roller /> : (

            <div className="m-auto text-center container-fluid ">
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
                  results.map((result) => {
                    const quiz = quizzes.find((quiz) => result.quiz_id === quiz.id);
                    const { attempted, score } = result;
                    const { title, id } = quiz;
                    counter += 1;
                    return (
                      <QuizResult
                        counter={counter}
                        title={title}
                        attempted={attempted}
                        score={score}
                        key={id}
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
          )
        }
    </>
  );
};

export default Result;
