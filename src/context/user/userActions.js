import { LOGIN, LOGOUT } from '../../utils/constants';

export const loginUserAction = (payload) => ({
  type: LOGIN, payload,
});

export const logoutUserAction = () => ({
  type: LOGOUT,
});
