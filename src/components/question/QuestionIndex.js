import React, {
  useContext, useEffect, useRef, useCallback,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import ActionCable from 'actioncable';
import { createAnsweredQuestionRequest } from '../../api/api';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { UserContext } from '../../context/user/UserContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';

import { getAuthToken } from '../../utils/utils';
import { BASE_WSS } from '../../utils/constants';
import Question from './Question';

const QuestionIndex = () => {
  const {
    removeQuizQuestion, selectedQuestionId, saveQuestion, saveAnsweredQuestion,
  } = useContext(QuizContext);

  const { user } = useContext(UserContext);

  const channelRef = useRef(null);

  const urlParams = useParams();

  const { addNotification } = useContext(NotificationContext);

  const navigate = useNavigate();
  const { quizId, questionId } = urlParams;

  // post request to create an answered question and update quiz context provider
  // and notification context
  const handlecreateAnsweredQuestionRequest = async () => {
    try {
      const response = await createAnsweredQuestionRequest(
        { quiz_id: quizId, question_id: questionId },
      );

      if (response.errors) {
        addNotification({ errors: response.errors });
        navigate(-1);
      } else {
        removeQuizQuestion(quizId, questionId);
      }
    } catch (e) {
      navigate('/');
      addNotification({ alert: e.message });
    }
  };

  // Update question and answered question values in quiz context with
  // that received via websocket
  const handleCableResponse = (data) => {
    const answeredQuestion = data.answered_question.answered_question;
    saveQuestion(data.question);
    saveAnsweredQuestion(
      {
        answeredQuestion: {
          id: answeredQuestion.id,
          createdAt: answeredQuestion.created_at,
          updatable: answeredQuestion.updatable,
        },
      },
    );
  };

  // create user subscription to websocket connection and create a
  // answered question on successful connection
  const createSubscription = useCallback(() => {
    const token = getAuthToken();
    const cable = ActionCable.createConsumer(`${BASE_WSS}/cable?token=${token}`);
    return cable.subscriptions.create(
      {
        channel: 'AnsweredQuestionChannel',
        email: user.email,
      },
      {
        received: (data) => {
          handleCableResponse(data);
        },

        connected: () => {
          handlecreateAnsweredQuestionRequest();
        },
      },
    );
  // eslint-disable-next-line
  }, [user, selectedQuestionId]);

  useEffect(() => {
    const answerChannel = createSubscription();

    channelRef.current = answerChannel;

    return () => {
      channelRef.current.unsubscribe();
    };
    // eslint-disable-next-line
  }, [user, selectedQuestionId]);

  return (
    <div className="container pt-5 fs-5 d-flex flex-column position-relative h-100">
      <Question
        channel={channelRef.current}
        handlecreateAnsweredQuestionRequest={handlecreateAnsweredQuestionRequest}
      />
    </div>
  );
};

export default QuestionIndex;
