import React from 'react';
import PropTypes from 'prop-types';

import QuizContextProvider from './quiz/QuizContextProvider';
import UserContextProvider from './UserContextProvider';

export const IndexContext = React.createContext();
const IndexContextProvider = ({ children }) => (
  <UserContextProvider>
    <QuizContextProvider>
      {children}
    </QuizContextProvider>
  </UserContextProvider>
);

IndexContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default IndexContextProvider;
