import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../apollo/mutation/mutation';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { setAuthToken } from '../../utils/utils';
import mapMessage from '../../utils/tranformNotification';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { addNotification } = useContext(NotificationContext);
  const { loginUser } = useContext(UserContext);
  const { saveQuizzes } = useContext(QuizContext);

  const [userObj, setUserObj] = useState({
    email: '',
    password: '',
  });

  // update state of targeted input id attribute for user object
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserObj((state) => (
      {
        ...state, [id]: value,
      }
    ));
  };

  // reset user object state to empty strings
  const resetUserObj = () => {
    setUserObj(() => (
      {
        email: '',
        password: '',
      }
    ));
  };

  // reset user object password
  const resetPassword = () => {
    setUserObj((state) => ({
      ...state, password: '',
    }));
  };

  const handleError = (error) => {
    if (error.message !== 'undefined') {
      addNotification({ alert: error.message });
    }
    if (error.graphQLErrors.length > 0) {
      addNotification({ alert: mapMessage(error.graphQLErrors[0]) });
    }
  };

  // login user mutation
  const [login, response] = useMutation(LOGIN, {
    variables: {
      email: userObj.email, password: userObj.password,
    },
    onCompleted: ({ createAuthentication }) => {
      const { user, quizzes, token } = createAuthentication;
      resetUserObj();
      loginUser({ user });
      saveQuizzes(quizzes);
      setAuthToken(token);

      addNotification({ notice: 'Successfull' });
      navigate(from, { replace: true });
    },
  });
  const { loading, error } = response;

  useEffect(() => {
    if (error) {
      handleError(error);
    }
    // eslint-disable-next-line
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
    login();
  };

  return (

    <div className="py-2 container-fluid pt-3">

      <h4 className="text-center">Login</h4>
      <div className="container d-flex flex-column align-items-center mt-3 mx-auto">
        <form className="col-12 col-md-9 col-lg-6 d-flex flex-column align-items-start" onSubmit={handleSubmit}>
          <div className="mb-3 col-12">
            <label htmlFor="email" className="form-label col-12">
              Email
              <input
                type="email"
                className="form-control"
                id="email"
                value={userObj.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="password" className="form-label col-12">
              Password
              <input
                type="password"
                className="form-control"
                id="password"
                value={userObj.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3 form-check">
            <label className="form-check-label" htmlFor="remember-me">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember-me"
              />
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary py-1 px-2">login</button>
          <small className="mt-2 w-100">
            <span>Don&apos;t have an account?</span>
            <span className="ps-1">
              <Link to="/sign_up" className="text-decoration-none">Sign up</Link>
              {' '}
              instead.
            </span>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
