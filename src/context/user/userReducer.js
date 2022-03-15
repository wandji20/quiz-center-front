import { LOGIN, LOGOUT } from '../constants';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(JSON.stringify(action.payload));
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
