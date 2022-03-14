import React, { useContext } from 'react';
import { QuizContext } from '../../context/QuizContextProvider';
import { UserContext } from '../../context/UserContextProvider';

const Nav = () => {
  const { loggedIn } = useContext(UserContext);
  const { counter } = useContext(QuizContext);
  console.log(loggedIn);
  // console.log(quizzContext);
  counter();
  return (
    <div>
      Nav
    </div>
  );
};

export default Nav;
