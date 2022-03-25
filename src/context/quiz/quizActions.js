import {
  ADD_ANSWERED_QUESTION,
  ADD_QUESTION, ADD_QUESTIONID, QuizIndex,
  REMOVE_QUESTION_FROM_QUIZ,
  RESET_QUESTION_AND_ANSWERED_QUESTION, RESULT,
} from '../../utils/constants';

export const quizIndexAction = (quizzes) => ({
  type: QuizIndex, payload: quizzes,
});

export const removeQuestionFromQuiz = (payload) => ({
  type: REMOVE_QUESTION_FROM_QUIZ, payload,
});

export const resultsAction = (payload) => ({
  type: RESULT, payload,
});

export const saveQuestionAction = (payload) => ({
  type: ADD_QUESTION, payload,
});

export const saveAnsweredQuestionAction = (payload) => ({
  type: ADD_ANSWERED_QUESTION, payload,
});

export const resetQuestionAndAnsweredQuestionAction = (payload) => ({
  type: RESET_QUESTION_AND_ANSWERED_QUESTION, payload,
});

export const addQuestionId = (payload) => ({
  type: ADD_QUESTIONID, payload,
});
