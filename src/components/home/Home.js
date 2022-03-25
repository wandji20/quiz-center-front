import React, { useContext } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import Roller from '../requestPlaceholder/Roller';
import QuizDetails from '../quiz/QuizDetails';

const Home = () => {
  const { quizzes } = useContext(QuizContext);

  return (
    <div
      className="d-flex flex-column align-items-center h-100 justify-content-around flex-lg-row flex-lg-wrap h-lg-50"
    >
      {
        quizzes.length === 0 ? <Roller /> : (

          quizzes.map((quiz) => <QuizDetails key={quiz.id} quiz={quiz} />)

        )
      }
    </div>
  );
};

export default Home;
