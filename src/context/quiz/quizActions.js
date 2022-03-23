import { QuizIndex, REMOVE_QUESTION_FROM_QUIZ, RESULT } from '../../utils/constants';

export const quizIndexAction = (quizzes) => ({
  type: QuizIndex, payload: quizzes,
});

export const removeQuestionFromQuiz = (payload) => ({
  type: REMOVE_QUESTION_FROM_QUIZ, payload,
});

export const resultsAction = (payload) => ({
  type: RESULT, payload,
});
