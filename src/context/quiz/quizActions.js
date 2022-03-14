import { QuizIndex, REMOVE_QUESTION_FROM_QUIZ } from '../constants';

export const quizIndexAction = (quizzes) => ({
  type: QuizIndex, payload: quizzes,
});

export const removeQuestionFromQuiz = (payload) => ({
  type: REMOVE_QUESTION_FROM_QUIZ, payload,
});
