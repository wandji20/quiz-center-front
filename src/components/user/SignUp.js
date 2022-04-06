/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { setAuthToken } from '../../utils/utils';
import FormError from '../notification/FormError';
import { SIGNUP } from '../../apollo/mutation/mutation';

const SignUp = () => {
  const { addNotification, errors } = useContext(NotificationContext);
  const { loginUser } = useContext(UserContext);
  const { saveQuizzes } = useContext(QuizContext);
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  // sign up user mutation
  const [signUp, response] = useMutation(SIGNUP, {
    variables: {
      username: userObj.username,
      email: userObj.email,
      password: userObj.password,
      passwordConfirmation: userObj.passwordConfirmation
    }
  });

  const { loading, data, error } = response
  console.log(response);

  // update local state of user object targetted id attribute
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserObj((state) => (
      {
        ...state, [id]: value,
      }
    ));
  };

  // reset entire state of user object attributes to empty strings
  const resetUserObj = () => {
    setUserObj(() => (
      {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    ));
  };

  // reset user object password and password confirmation attributes
  const resetPassword = () => {
    setUserObj((state) => ({
      ...state, password: '', passwordConfirmation: '',
    }));
  };

  // post user object to create a new user and update quiz, user and
  // notifications context provider values

  useEffect(() => {
    const handleError = (error) => {
      if (error.message !== 'undefined') {
        addNotification({ alert: error.message });
      }
      if (error.graphQLErrors.length > 0) {
        if (typeof(error.graphQLErrors[0]) === 'object') {
          addNotification({ errors: error.graphQLErrors[0] });
        }else {
          addNotification({ alert: mapMessage(error.graphQLErrors[0]) });
        }
      } 
    };
    if (error) {
      handleError(error);
    }

    if (data) {
      const { user, quizzes, token } = data.createUser;
      resetUserObj();
      loginUser({ user });
      saveQuizzes(quizzes);
      setAuthToken(token);

      addNotification({ notice: 'Account created' });
      navigate('/');
    }
  }, [loading]);


  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
    signUp();
  };

  console.log(errors.password_confirmation);

  return (

    <div className="py-2 container-fluid mt-2">

      <h4 className="text-center">Sign Up</h4>
      <div className="container d-flex flex-column align-items-center mt-1 mx-auto">
        <form className="col-12 col-md-9 col-lg-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label w-100">
              <span className="d-block">Username</span>
              {
              errors.username && <FormError message={errors.username[0]} />
            }
              <input
                type="text"
                className="form-control"
                id="username"
                value={userObj.username}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label w-100">
              <span className="d-block">Email</span>
              {
                errors.email && <FormError message={errors.email[0]} />
              }
              <input
                type="email"
                className="form-control"
                id="email"
                value={userObj.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label w-100">
              <span className="d-block">Password</span>
              {
                errors.password && <FormError message={errors.password[0]} />
              }
              <input
                type="password"
                className="form-control"
                id="password"
                value={userObj.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirmation " className="form-label w-100">
              <span className="d-block">Password Confirmation</span>
              {
                errors.password_confirmation
                  && <FormError message={errors.password_confirmation[0]} />
              }
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
                value={userObj.passwordConfirmation}
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
          <button type="submit" className="btn btn-primary py-1 px-2">Create Account</button>
          <small className="mt-2 d-block">
            <span>Already have an account?</span>
            <span className="ps-1">
              <Link to="/login" className="text-decoration-none">login</Link>
              {' '}
              instead.
            </span>
          </small>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
