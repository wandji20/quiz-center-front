import { BASE_URL } from '../context/constants';
import { getAuthToken } from '../utils/utils';

export const fetchQuizzesRequest = async () => {
  const Authorization = getAuthToken();
  const url = Authorization !== null ? `${BASE_URL}/home` : BASE_URL;

  const server = await fetch(url,
    {
      headers: { Authorization },
    });
  const response = await server.json();
  return response;
};

export const signUpRequest = async (user) => {
  const url = `${BASE_URL}/sign_up`;
  const server = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  const response = await server.json();
  return response;
};

export const loginRequest = async (authentication) => {
  const url = `${BASE_URL}/login`;
  const server = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authentication }),
  });
  const response = await server.json();
  return response;
};
