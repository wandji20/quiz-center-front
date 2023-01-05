import { BASE_URL } from '../utils/constants';
import { getAuthToken } from '../utils/utils';

// api request to fetch signed in users quiz and questions
export const fetchQuizzesRequest = async () => {
  const Authorization = getAuthToken();
  const url = BASE_URL;

  const server = await fetch(url,
    {
      headers: { Authorization },
    });
  const response = await server.json();
  return response;
};

// api request to sign up a new user
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

// api request to authenticate a user
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

// api request to create an answered question
export const createAnsweredQuestionRequest = async (answeredQuestion) => {
  const url = `${BASE_URL}/answered_questions`;
  const Authorization = getAuthToken();
  const server = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answered_question: answeredQuestion }),
  });
  const response = await server.json();
  return response;
};

// api request to fetch user results
export const getResultsRequest = async () => {
  const url = `${BASE_URL}/result`;
  const Authorization = getAuthToken();
  const server = await fetch(url, {
    headers: {
      Authorization,
      'Content-Type': 'application/json',
    },
  });
  const response = await server.json();
  return response;
};
