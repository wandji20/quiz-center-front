import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import quizReducer from './quizReducer';
import { quizIndexAction, removeQuestionFromQuiz } from './quizActions';

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
  const initialState = {
    quizzes: [
      { id: 1, title: 'geography', question_ids: [1, 2, 3, 4] },
      { id: 2, title: 'history', question_ids: [5, 6, 7, 8] },
      { id: 3, title: 'mathematics', question_ids: [9, 10, 11, 13, 15] },
      { id: 4, title: 'football', question_ids: [] },
    ],
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
