import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { clearAuthToken } from '../../utils/utils';
import { LoggedIn, LoggedOut } from '../index';

const Nav = () => {
  const { loggedIn, logoutUser, user } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);

  const handleLogoutUser = () => {
    logoutUser();
    clearAuthToken();
    addNotification({ notice: 'signed out' });
  };

  const gravatarUrl = user.gravatar_url
    ? user.gravatar_url
    : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y &s=40';
  return (
    <nav className="nav bg-light border-bottom">
      <div className="d-flex container-fluid p-0 justify-content-center position-relative">
        <Link to="/" className="text-decoration-none text-dark h-100">
          <div className="d-flex justify-content-center h-100 align-items-center me-1">
            <span className="text-uppercase fw-bold fs-4">Quiz</span>
            <div className="mx-3 relative">
              <i className="bi bi-book-half" style={{ fontSize: '40px', color: 'rgb(50, 50, 202)' }} />
            </div>
            <span className="text-uppercase fw-bold fs-4">Center</span>

          </div>
        </Link>
        <div
          className="position-absolute gravatar d-flex justify-content-center align-items-center h-100"
        >
          <ul className="list-unstyled d-none d-lg-flex align-items-center m-0">
            {
                loggedIn
                  ? <LoggedIn handleLogoutUser={handleLogoutUser} />
                  : <LoggedOut />
              }
          </ul>
          <span className="pe-2" data-bs-toggle="dropdown">
            <img
              src={gravatarUrl}
              style={{ borderRadius: '50% ' }}
              alt="gravatar url"
            />
          </span>
          <ul id="nav-dropdown" className="dropdown-menu d-lg-none" style={{ minWidth: 'none' }}>
            {
              loggedIn
                ? <LoggedIn handleLogoutUser={handleLogoutUser} />
                : <LoggedOut />
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
