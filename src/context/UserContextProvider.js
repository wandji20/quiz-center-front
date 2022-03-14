import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const initialValue = {
    user: {},
    results: {},
    loggedIn: true,
  };
  return (
    <UserContext.Provider value={initialValue}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default UserContextProvider;
