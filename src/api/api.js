import { BASE_URL } from '../context/constants';

export const fetchQuizzes = async () => {
  const server = await fetch(BASE_URL);
  const response = await server.json();
  return response;
};

export const signUpRequest = async (user) => {
  const url = `${BASE_URL}/sign_up`;
  const server = await fetch(url, {
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authentication }),
  });
  const response = await server.json();
  return response;
};
