import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOut = () => (
  <li>
    <Link to="/login" className="dropdown-item me-lg-2">
      login
    </Link>
  </li>
);

export default LoggedOut;
