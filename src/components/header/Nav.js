import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContextProvider';

const Nav = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <nav className="nav bg-light border-bottom">
      <div className="d-flex container-fluid p-0 justify-content-center position-relative">
        <div className="d-flex justify-content-center align-items-center me-1">
          <span className="text-uppercase fw-bold fs-4">Quiz</span>
          <div className="mx-3 relative">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-book-half" style={{ fontSize: '40px', color: 'blue' }} />
            </Link>
          </div>
          <span className="text-uppercase fw-bold fs-4">Center</span>

        </div>
        <div
          className="position-absolute gravatar d-flex justify-content-center align-items-center h-100"
        >
          <span className="pe-2" data-bs-toggle="dropdown">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y &s=40"
              style={{ 'border-radius': '50% ' }}
              alt="gravatar default"
            />
          </span>
          <ul id="nav-dropdown" className="dropdown-menu" style={{ minWidth: 'none' }}>
            {
              loggedIn
                ? (
                  <>
                    <li>
                      <Link to="/result" className="dropdown-item">
                        result
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link to="/" className="dropdown-item">
                        logout
                      </Link>
                    </li>
                  </>
                )
                : (
                  <li>
                    <Link to="/login" className="dropdown-item">
                      login
                    </Link>
                  </li>
                )
            }

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
