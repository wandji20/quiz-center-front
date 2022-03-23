import { QuizIndex, REMOVE_QUESTION_FROM_QUIZ, RESULT } from '../../utils/constants';

const quizReducer = (state, action) => {
  switch (action.type) {
    case QuizIndex: {
      return { ...state, quizzes: action.payload };
    }
    case REMOVE_QUESTION_FROM_QUIZ: {
      const { quizId, questionId } = action.payload;
      const filteredQuizzes = [];
      state.quizzes.forEach((quiz) => {
        if (quiz.id === Number(quizId)) {
          const questionIds = quiz.question_ids.filter((id) => (id !== Number(questionId)));

          filteredQuizzes.push({ ...quiz, question_ids: questionIds });
        } else {
          filteredQuizzes.push(quiz);
        }
      });
      return { ...state, quizzes: filteredQuizzes };
    }

    case RESULT: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default quizReducer;
