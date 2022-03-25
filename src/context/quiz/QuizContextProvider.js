import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import quizReducer from './quizReducer';
import {
  quizIndexAction,
  removeQuestionFromQuiz,
  resultsAction, saveQuestionAction,
  saveAnsweredQuestionAction,
  resetQuestionAndAnsweredQuestionAction,
  addQuestionId,
} from './quizActions';

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
  const initialState = {
    quizzes: [],
    results: [],
    question: {
      description: '',
      points: 0,
      answers: [],
    },
    answeredQuestion: {
      id: 0,
      createdAt: Date.now(),
      updatable: false,
    },
    selectedQuestionId: 0,
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const value = {
    quizzes: state.quizzes,
    results: state.results,
    question: state.question,
    answeredQuestion: state.answeredQuestion,
    selectedQuestionId: state.selectedQuestionId,

    removeQuizQuestion: (quizId, questionId) => {
      dispatch(removeQuestionFromQuiz({ quizId, questionId }));
    },

    saveQuizzes: (quizzes) => {
      dispatch(quizIndexAction(quizzes));
    },

    saveResult: (results) => {
      dispatch(resultsAction(results));
    },

    saveQuestion: (question) => {
      dispatch(saveQuestionAction(question));
    },

    saveAnsweredQuestion: (answeredQuestion) => {
      dispatch(saveAnsweredQuestionAction(answeredQuestion));
    },

    resetQuestionAndAnsweredQuestion: () => {
      dispatch(resetQuestionAndAnsweredQuestionAction(
        {
          question: initialState.question,
          answeredQuestion: initialState.answeredQuestion,
        },
      ));
    },

    saveSelectedQuestionId: (payload) => {
      dispatch(addQuestionId(payload));
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
