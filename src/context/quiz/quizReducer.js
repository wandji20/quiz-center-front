import { QuizIndex, REMOVE_QUESTION_FROM_QUIZ } from '../constants';

const quizReducer = (state, action) => {
  switch (action.type) {
    case QuizIndex: {
      return { ...state, quizzes: action.payload };
    }
    case REMOVE_QUESTION_FROM_QUIZ: {
      const { quizId, questionId } = action.payload;

      const filteredQuizzes = [];
      state.quizzes.forEach((quiz) => {
        if (quiz.id === quizId) {
          const questionIds = quiz.question_ids.filter((id) => (id !== questionId));

          filteredQuizzes.push({ ...quiz, question_ids: questionIds });
        } else {
          filteredQuizzes.push(quiz);
        }
      });
      return { ...state, quizzes: filteredQuizzes };
    }
    default:
      return state;
  }
};

export default quizReducer;
