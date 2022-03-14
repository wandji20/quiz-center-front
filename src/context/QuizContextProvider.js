import React from 'react';
import PropTypes from 'prop-types';

export const QuizContext = React.createContext();

const QuizContextProvider = ({ children }) => {
  const initialValue = {
    quizzes: [],
  };

  return (
    <QuizContext.Provider value={{ ...initialValue }}>
      {children}
    </QuizContext.Provider>
  );
};

QuizContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default QuizContextProvider;
