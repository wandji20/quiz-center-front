import { LOGIN, LOGOUT } from '../../utils/constants';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggedIn: true, ...action.payload };
    }

    case LOGOUT: {
      return { ...state, loggedIn: false, user: {} };
    }

    default:
      return { ...state };
  }
};

export default userReducer;
