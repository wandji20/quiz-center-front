import React from 'react';
import PropTypes from 'prop-types';

import QuizContextProvider from './quiz/QuizContextProvider';
import UserContextProvider from './user/UserContextProvider';
import NotificationContextProvider from './notifications/NotificationContextProvider';

export const IndexContext = React.createContext();
const IndexContextProvider = ({ children }) => (
  <UserContextProvider>
    <QuizContextProvider>
      <NotificationContextProvider>
        {children}
      </NotificationContextProvider>
    </QuizContextProvider>
  </UserContextProvider>
);

IndexContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default IndexContextProvider;
