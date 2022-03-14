export const setAuthToken = (token) => {
  sessionStorage.setItem('quizCenterAuthToken', token);
};

export const getAuthToken = () => {
  const token = sessionStorage.getItem('quizCenterAuthToken');
  return token;
};
