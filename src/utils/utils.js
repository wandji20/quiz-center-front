export const setAuthToken = (token) => {
  sessionStorage.setItem('quizCenterAuthToken', token);
};

export const getAuthToken = () => {
  const token = sessionStorage.getItem('quizCenterAuthToken');
  return token;
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('quizCenterAuthToken');
};

export const setloggedInStatus = (status) => {
  sessionStorage.setItem('quizCenterLoggedInStatus', status);
};

export const getLoggedInStatus = () => (
  JSON.parse(sessionStorage.getItem('quizCenterLoggedInStatus')) || false
);

export const setAnsweredQuestionId = (id) => {
  sessionStorage.setItem('quizCenterAnsweredQuestionId', id);
};

export const getAnsweredQuestionId = () => {
  const id = sessionStorage.getItem('quizCenterAnsweredQuestionId');
  return id;
};
