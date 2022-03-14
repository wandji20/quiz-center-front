import { QuizIndex, REMOVE_QUESTION_FROM_QUIZ } from '../constants';

const quizReducer = (state, action) => {
  switch (action.type) {
    case QuizIndex: {
      return action.payload;
    }
    case REMOVE_QUESTION_FROM_QUIZ: {
      const { quizId, questionId } = action.payload;
      const quiz = state.quizzes.find((quiz) => quiz.id === quizId);
      const questionIds = quiz.question_ids.filter((id) => id !== questionId);
      const filteredQuizzes = state.quizzes.filter((quiz) => quiz.id !== quizId);
      return filteredQuizzes.concat({ ...quiz, questionIds });
    }
    default:
      return state;
  }
};

export default quizReducer;
