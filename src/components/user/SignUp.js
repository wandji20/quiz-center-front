import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userObj);
    resetUserObj();
  };

  return (

    <div className="py-2 container-fluid mt-2">

      <h4 className="text-center">Sign Up</h4>
      <div className="d-flex flex-column align-items-center col-9 mt-1 mx-auto">
        <form className="col-12" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
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
            <label htmlFor="last_name" className="form-label">
              Last Name
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
            <label htmlFor="email" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">
              Password Confirmation
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
