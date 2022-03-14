import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { loginUserAction, logoutUserAction } from './userActions';
import userReducer from './userReducer';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    result: {},
    loggedIn: true,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = {
    user: state.user,
    result: state.result,
    loggedIn: true,

    loginUser: (user) => {
      dispatch(loginUserAction(user));
    },

    logoutUser: () => {
      dispatch(logoutUserAction);
    },
  };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default UserContextProvider;
