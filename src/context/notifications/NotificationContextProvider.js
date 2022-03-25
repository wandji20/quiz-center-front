import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import notificationReducer from './notificationReducer';
import notificationAction from './notificationActions';

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const initialState = {
    errors: [],
    notice: '',
    alert: '',
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const value = {
    errors: state.errors,
    notice: state.notice,
    alert: state.alert,

    addNotification: (notification = initialState) => {
      const payload = { ...initialState, ...notification };
      dispatch(notificationAction(payload));
    },
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default NotificationContextProvider;
