import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import {
  useNavigate, useParams, Navigate,
} from 'react-router-dom';
import ActionCable from 'actioncable';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { createAnsweredQuestionRequest } from '../../api/api';
import { UserContext } from '../../context/user/UserContextProvider';
import Answer from './Answer';
import { getAuthToken } from '../../utils/utils';
import CountDown from './CountDown';

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

  if (questionId === 'id' || quizzes.length === 0) {
    return <Navigate to="/" />;
  }
  console.log('In Question');

  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState({ description: '', answers: [] });

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
  const cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${token}`);

  const timerRef = useRef(
    {
      points: 1,
      createdAt: Date.now(),
    },
  );

  const handleCableResponse = (data) => {
    const answeredQuestion = data.question.question;
    setQuestion(answeredQuestion);
    answeredQuestionRef.current = data.answered_question.id;
    timerRef.current = {
      points: answeredQuestion.points,
      createdAt: data.answered_question.created_at,
    };
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
  }, [urlQuestionId]);

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
    const quiz = quizzes.find((quiz) => quiz.id === parseFloat(quizId));

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
    <div className="pt-5 fs-4 d-flex flex-column">
      <CountDown timer={timerRef.current} />
      <p className="p-0 d-flex justify-content-around col-12">
        <span className="fw-bold col-1">Q.</span>
        <span className=" col-10">{description}</span>
      </p>
      <div className="answers mt-3 container-fluid d-flex just">
        <div
          className="d-flex flex-column align-items-start col-10 mx-auto"
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
          <div className="question-actions position-absolute">
            <div className="col-10 mx-auto d-flex justify-content-between pb-2">
              <button
                type="button"
                className="btn btn-primary py-1 px-2"
                onClick={handleSaveAndExit}
                disabled={answer === null}
              >
                save and exit
              </button>
              <button
                type="button"
                className="btn btn-primary py-1 px-2"
                onClick={handleNext}
                disabled={answer === null}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
