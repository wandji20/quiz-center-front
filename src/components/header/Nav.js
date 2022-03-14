import React, { useContext } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
// import { UserContext } from '../../context/UserContextProvider';

const Nav = () => {
  // const { loggedIn } = useContext(UserContext);
  const quiz = useContext(QuizContext);
  console.log(quiz);
  // // console.log(quizzContext);
  // counter();
  return (
    <div>
      Nav
    </div>
  );
};

export default Nav;
