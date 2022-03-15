import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import QuizDetails from '../quiz/QuizDetails';

const Home = () => {
  const { quizzes } = useContext(QuizContext);
  // const location = useLocation();

  return (
    <div className="d-flex flex-column align-items-center h-100 justify-content-around ">
      {
        quizzes.map((quiz) => <QuizDetails key={quiz.id} quiz={quiz} />)
      }
    </div>
  );
};

export default Home;
