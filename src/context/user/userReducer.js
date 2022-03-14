import { LOGIN, LOGOUT } from '../constants';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggedIn: true, user: action.payload };
    }

    case LOGOUT: {
      return { ...state, loggedIn: false, user: {} };
    }

    default:
      return { ...state };
  }
};

export default userReducer;
