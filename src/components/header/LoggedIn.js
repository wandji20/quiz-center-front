import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedIn = ({ handleLogoutUser }) => (
  <>
    <li>
      <Link to="/result" className="dropdown-item">
        result
      </Link>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <Link
        to="/"
        className="dropdown-item"
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
