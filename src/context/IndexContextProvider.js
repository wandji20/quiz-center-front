import React from 'react';
import PropTypes from 'prop-types';

import QuizContextProvider from './QuizContextProvider';
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
  children: PropTypes.shape(),
};

export default IndexContextProvider;
