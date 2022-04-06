/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import QuizResult from './QuizResult';
import Roller from '../requestPlaceholder/Roller';

import { RESULT } from '../../apollo/query/query';
import mapMessage from '../../utils/tranformNotification';

const Result = () => {
  const { quizzes, results, saveResult } = useContext(QuizContext);
  const { addNotification } = useContext(NotificationContext);

  const response = useQuery(RESULT);
  const { loading, error, data } = response;

  // count number of attempted questions
  const totalAttempted = results.map((result) => result.attempted)
    .reduce((a, b) => a + b, 0);

  // count number of correct answers
  const totalCorrect = results.map((result) => result.score)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const handleError = (error) => {
      if (error.message !== 'undefined') {
        addNotification({ alert: error.message })
      }
      if (error.graphQLErrors.length > 0) {
        addNotification({ alert: mapMessage(error.graphQLErrors[0]) })
      }
    }
    if (error) {
      handleError(error)
    }

    if(data) {
      const { result } = data
      console.log(result);
      saveResult({ results: result })
    }

    // eslint-disable-next-line
  }, [loading]);

  let counter = 0;
  return (
    <>
      {
          (quizzes.length === 0) ? <Roller /> : (

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
                    const quiz = quizzes.find((quiz) => result.quizId === quiz.id);
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
