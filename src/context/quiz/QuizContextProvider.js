import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import quizReducer from './quizReducer';
import { quizIndexAction, removeQuestionFromQuiz, resultsAction } from './quizActions';

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
  const initialState = {
    quizzes: [],
    results: [],
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const value = {
    quizzes: state.quizzes,
    results: state.results,

    removeQuizQuestion: (quizId, questionId) => {
      dispatch(removeQuestionFromQuiz({ quizId, questionId }));
    },

    saveQuizzes: (quizzes) => {
      dispatch(quizIndexAction(quizzes));
    },

    saveResult: (results) => {
      dispatch(resultsAction(results));
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
