import React, { useContext } from 'react';
import {
  Outlet, useLocation, Navigate,
} from 'react-router-dom';
import { UserContext } from '../context/user/UserContextProvider';

const ProtectedRoute = () => {
  const location = useLocation();
  const questionId = location.state?.questionId;
  const { loggedIn } = useContext(UserContext);

  if (questionId === 'id') {
    return <Navigate to="/" />;
  }

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Outlet />
  );
};

export default ProtectedRoute;
