import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedIn = ({ handleLogoutUser }) => (
  <>
    <li>
      <Link to="/result" className="dropdown-item me-lg-2">
        result
      </Link>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <Link
        to="/"
        className="dropdown-item me-lg-2"
        onClick={handleLogoutUser}
      >
        logout
      </Link>
    </li>
  </>
);

LoggedIn.propTypes = {
  handleLogoutUser: PropTypes.func.isRequired,
};

export default LoggedIn;
