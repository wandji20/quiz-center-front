import React, {
  useContext, useEffect,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import Question from './Question';
import { CREATE_ANSWERED_QUESTION } from '../../apollo/mutation/mutation';
import mapMessage from '../../utils/tranformNotification';

const QuestionIndex = () => {
  const {
    removeQuizQuestion, selectedQuestionId, saveQuestion, saveAnsweredQuestion,
  } = useContext(QuizContext);

  const urlParams = useParams();

  const { addNotification } = useContext(NotificationContext);

  const navigate = useNavigate();
  const { quizId, questionId } = urlParams;

  // mutation to create answered question
  const [createAnsweredQuestion, { loading, error }] = useMutation(
    CREATE_ANSWERED_QUESTION,
    {
      variables: { quizId, questionId },
      onCompleted: ({ createAnsweredQuestion }) => {
        const { answeredQuestion, question } = createAnsweredQuestion;
        saveQuestion({ question });
        saveAnsweredQuestion({ answeredQuestion });
        removeQuizQuestion(quizId, questionId);
      },
    },
  );

  useEffect(() => {
    const handleError = (error) => {
      if (error.message !== 'undefined') {
        addNotification({ alert: error.message });
      }
      if (error.graphQLErrors.length > 0) {
        addNotification({ alert: mapMessage(error.graphQLErrors[0]) });
      }
    };
    if (error) {
      handleError(error);
      navigate(-1);
    }

    // eslint-disable-next-line
  }, [loading])

  useEffect(() => {
    createAnsweredQuestion();
    // eslint-disable-next-line
  }, [selectedQuestionId]);

  return (
    <div className="container pt-5 fs-5 d-flex flex-column position-relative h-100">
      <Question />
    </div>
  );
};

export default QuestionIndex;
