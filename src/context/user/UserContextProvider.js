import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { loginUserAction, logoutUserAction } from './userActions';
import userReducer from './userReducer';
import { getLoggedInStatus, setloggedInStatus } from '../../utils/utils';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    loggedIn: getLoggedInStatus(),
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = {
    user: state.user,
    loggedIn: state.loggedIn,

    loginUser: (user) => {
      dispatch(loginUserAction(user));
      setloggedInStatus(true);
    },

    logoutUser: () => {
      dispatch(logoutUserAction());
      setloggedInStatus(false);
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
