import { LOGIN, LOGOUT } from '../constants';

export const loginUserAction = (payload) => ({
  type: LOGIN, payload,
});

export const logoutUserAction = () => ({
  type: LOGOUT,
});
