import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import quizReducer from './quizReducer';
import { quizIndexAction, removeQuestionFromQuiz } from './quizActions';

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
  const initialState = {
    quizzes: [],
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const value = {
    quizzes: state.quizzes,

    removeQuizQuestion: (quizId) => {
      dispatch(removeQuestionFromQuiz(quizId));
    },

    saveQuizzes: (quizzes) => {
      dispatch(quizIndexAction(quizzes));
    },
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

QuizContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default QuizContextProvider;
