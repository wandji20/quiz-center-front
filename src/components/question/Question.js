import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import ActionCable from 'actioncable';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { createAnsweredQuestionRequest } from '../../api/api';
import { UserContext } from '../../context/user/UserContextProvider';
import Answer from './Answer';
import { getAuthToken } from '../../utils/utils';
import CountDown from './CountDown';
import { BASE_WSS } from '../../utils/constants';
import AnswerActions from './AnswerActions';

const Question = () => {
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);
  const { removeQuizQuestion, quizzes } = useContext(QuizContext);

  const urlParams = useParams();

  const { quizId, questionId } = urlParams;

  const [urlQuestionId, setUrlQuestionId] = useState(questionId);

  const { user } = useContext(UserContext);

  const answeredQuestionRef = useRef(null);
  const channelRef = useRef(null);
  console.log(quizzes);
  if (questionId === 'id') {
    navigate('/');
  }

  const quiz = quizzes.find((quiz) => quiz.id === parseFloat(quizId));

  const [answer, setAnswer] = useState(0);
  const [question, setQuestion] = useState({ description: '', answers: [] });
  const [status, setStatus] = useState(false);

  const handlecreateAnsweredQuestionRequest = async () => {
    try {
      const response = await createAnsweredQuestionRequest(
        { quiz_id: quizId, question_id: urlQuestionId },
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

  const token = getAuthToken();
  const cable = ActionCable.createConsumer(`${BASE_WSS}/cable?token=${token}`);

  const [timer, setTimer] = useState(
    {
      points: 0,
      createdAt: Date.now(),
    },
  );

  const handleCableResponse = (data) => {
    const answeredQuestion = data.answered_question.answered_question.question;

    setQuestion(answeredQuestion);
    answeredQuestionRef.current = data.answered_question.answered_question.id;
    setStatus(data.status);

    setTimer({
      points: answeredQuestion.points,
      createdAt: data.answered_question.answered_question.created_at,
    });
  };

  const createSubscription = () => cable.subscriptions.create(
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

  useEffect(() => {
    const answerChannel = createSubscription();

    channelRef.current = answerChannel;

    return () => {
      channelRef.current.unsubscribe();
    };
  }, [urlQuestionId, user]);

  const { description, answers } = question;

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = () => {
    channelRef.current.send(
      { answer_id: answer, answered_question_id: answeredQuestionRef.current },
    );
  };

  const getNextQuestion = () => {
    const questionIds = quiz.question_ids.filter(
      (question) => (question.id !== parseFloat(urlQuestionId)),
    );
    channelRef.current.unsubscribe();
    const nextUrl = questionIds[0] ? `/quiz/${quizId}/question/${questionIds[0]}` : '/';
    navigate(nextUrl);
    setUrlQuestionId(questionIds[0] || 'id');
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    handleAnswerSubmit();
    removeQuizQuestion(quizId, urlQuestionId);
    navigate('/');
  };

  const handleNext = (e) => {
    e.preventDefault();
    handleAnswerSubmit();
    getNextQuestion();
    removeQuizQuestion(quizId, urlQuestionId);
  };

  return (
    <div className="container pt-5 fs-5 d-flex flex-column position-relative h-100">
      <CountDown timer={timer} />
      <div className="d-flex justify-content-around col-12">
        <span className="fw-bold col-1">Q.</span>
        <span className=" col-10">{description}</span>
      </div>
      <div className="answers mt-3 container-fluid d-flex justify-content-around">
        <div className="col-1" />
        <div
          className="d-flex flex-column align-items-start col-10"
        >
          {
            answers.map((answer) => (
              <Answer
                key={answer.id}
                answer={answer}
                handleAnswerChange={handleAnswerChange}
              />
            ))
          }
        </div>
        {
            status && (
              <AnswerActions
                answer={answer}
                handleNext={handleNext}
                handleSaveAndExit={handleSaveAndExit}
              />
            )
          }
      </div>
    </div>
  );
};

export default Question;
