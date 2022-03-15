import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpRequest } from '../../api/api';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { setAuthToken } from '../../utils/utils';
import FormError from '../notification/FormError';

const SignUp = () => {
  const { addNotification, errors } = useContext(NotificationContext);
  const { loginUser } = useContext(UserContext);
  const { saveQuizzes } = useContext(QuizContext);
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserObj((state) => (
      {
        ...state, [id]: value,
      }
    ));
  };

  const resetUserObj = () => {
    setUserObj(() => (
      {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    ));
  };

  const resetPassword = () => {
    setUserObj((state) => ({
      ...state, password: '', password_confirmation: '',
    }));
  };

  const handleUserSignUp = async () => {
    addNotification();
    try {
      const response = await signUpRequest(userObj);
      const { Authorization, quizzes, user } = response;
      if (Authorization) {
        resetUserObj();
        setAuthToken(Authorization);
        saveQuizzes(quizzes);
        loginUser({ user });

        addNotification({ notice: 'Account created' });
        navigate('/');
      } else {
        addNotification(response);
      }
    } catch (e) {
      addNotification({ alert: e.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
    handleUserSignUp();
  };

  return (

    <div className="py-2 container-fluid mt-2">

      <h4 className="text-center">Sign Up</h4>
      <div className="d-flex flex-column align-items-center col-9 mt-1 mx-auto">
        <form className="col-12" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label w-100">
              <span className="d-block">First Name</span>
              {
                errors.first_name && <FormError message={errors.first_name[0]} />
              }
              <input
                type="text"
                className="form-control"
                id="first_name"
                value={userObj.first_name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label w-100">
              <span className="d-block">Last name</span>
              {
              errors.last_name && <FormError message={errors.last_name[0]} />
            }
              <input
                type="text"
                className="form-control"
                id="last_name"
                value={userObj.last_name}
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
            <label htmlFor="password_confirmation " className="form-label w-100">
              <span className="d-block">Password Confirmation</span>
              {
                errors.password_confirmation
                  && <FormError message={errors.password_confirmation[0]} />
              }
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                value={userObj.password_confirmation}
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
        </form>
        <small className="mt-2">
          <span>Already have an account?</span>
          <span className="ps-1">
            <Link to="/login" className="text-decoration-none">login</Link>
            {' '}
            instead.
          </span>
        </small>
      </div>
    </div>
  );
};

export default SignUp;
