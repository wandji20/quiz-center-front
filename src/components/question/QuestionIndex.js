/* eslint-disable */
import React, {
  useContext, useEffect,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';

import Question from './Question';
import { CREATE_ANSWERED_QUESTION } from '../../apollo/mutation/mutation';

const QuestionIndex = () => {
  const {
    removeQuizQuestion, selectedQuestionId, saveQuestion, saveAnsweredQuestion,
  } = useContext(QuizContext);

  const { user } = useContext(UserContext);

  const urlParams = useParams();

  const { addNotification } = useContext(NotificationContext);

  const navigate = useNavigate();
  const { quizId, questionId } = urlParams;

  // post request to create an answered question and update quiz context provider
  // and notification context
  const [createAnsweredQuestion, { loading, data, error }] = useMutation(
      CREATE_ANSWERED_QUESTION,
      {
        variables: { quizId, questionId }
      }
  );

  useEffect(() => {
    const handleError = (error) => {
      if (error.message !== 'undefined') {
        addNotification({ alert: error.message })
      }
      if (error.graphQLErrors.length > 0) {
        addNotification({ alert: mapMessage(error.graphQLErrors[0]) })
      }
    }
    if (error) {
      handleError(error)
      navigate(-1);
    }
  
    if(data) {
      const { answeredQuestion, question } = data.createAnsweredQuestion
      saveQuestion({ question: question });
      saveAnsweredQuestion({ answeredQuestion: answeredQuestion });
      removeQuizQuestion(quizId, questionId);
    }
    
  }, [loading])
    
  useEffect(() => {
    createAnsweredQuestion();
    // eslint-disable-next-line
  }, [selectedQuestionId]);

  return (
    <div className="container pt-5 fs-5 d-flex flex-column position-relative h-100">
      <Question/>
    </div>
  );
};

export default QuestionIndex;
