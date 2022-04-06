import React, {
  useContext, useState, useEffect,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import Answer from './Answer';
import CountDown from './CountDown';
import Roller from '../requestPlaceholder/Roller';

import AnswerActions from './AnswerActions';
import { UPDATE_ANSWERED_QUESTION } from '../../apollo/mutation/mutation';

const Question = () => {
  const urlParams = useParams();
  const navigate = useNavigate();

  const { quizId } = urlParams;

  const {
    removeQuizQuestion, quizzes,
    question, answeredQuestion, resetQuestionAndAnsweredQuestion,
    selectedQuestionId,
    saveSelectedQuestionId,
  } = useContext(QuizContext);

  const { description, answers, points } = question;
  const { updatable, createdAt, id } = answeredQuestion;

  const timer = {
    createdAt,
    points,
  };

  const [answer, setAnswer] = useState(0);

  const quiz = quizzes.find((quiz) => quiz.id === (quizId));
  const [updateAnsweredQuestion] = useMutation(
    UPDATE_ANSWERED_QUESTION, {
      variables: { answeredQuestionId: id, answerId: answer },
    },
  );

  useEffect(() => () => {
    resetQuestionAndAnsweredQuestion();
    // eslint-disable-next-line
  }, []);

  // set usrlQuestionId so page can rerender
  const getNextQuestion = () => {
    const questionIds = quiz.questionIds.filter(
      (question) => (question.id !== parseFloat(selectedQuestionId)),
    );
    const nextUrl = questionIds[0] ? `/quiz/${quizId}/question/${questionIds[0]}` : '/';
    navigate(nextUrl);
    saveSelectedQuestionId({ selectedQuestionId: questionIds[0] || 0 });
  };

  // submit question answer and return to home
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    updateAnsweredQuestion();
    resetQuestionAndAnsweredQuestion();
    removeQuizQuestion(quizId, selectedQuestionId);
    navigate('/');
  };

  // submit answer, create new answeredQuestion and update quiz context
  const handleNext = (e) => {
    e.preventDefault();
    updateAnsweredQuestion();
    getNextQuestion();
    resetQuestionAndAnsweredQuestion();
    removeQuizQuestion(quizId, selectedQuestionId);
  };

  const handleAnswerChange = (e) => {
    setAnswer(Number(e.target.value));
  };

  return (
    <>
      {
        (answers.length > 0) ? (
          <>
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
                updatable && (
                  <AnswerActions
                    handleNext={handleNext}
                    handleSaveAndExit={handleSaveAndExit}
                    answer={answer}
                  />
                )
              }
            </div>
          </>
        ) : <Roller />
      }
    </>
  );
};

export default Question;
