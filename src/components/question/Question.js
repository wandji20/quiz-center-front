/* eslint-disable */
import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import Answer from './Answer';
import CountDown from './CountDown';
import Roller from '../requestPlaceholder/Roller';

import AnswerActions from './AnswerActions';

const Question = ({ channel }) => {

  const urlParams = useParams();
  const navigate = useNavigate()

  const { quizId, questionId } = urlParams;

  const {
    removeQuizQuestion, quizzes, question, answeredQuestion, resetQuestionAndAnsweredQuestion, selectedQuestionId, saveSelectedQuestionId
  } = useContext(QuizContext);

  const { description, answers, points } = question;
  const { updatable, createdAt } = answeredQuestion;

  const timer = {
    createdAt,
    points,
  }

  const [answer, setAnswer] = useState(0);


  const quiz = quizzes.find((quiz) => quiz.id === parseFloat(quizId));

  useEffect(() => {

    return () => {
      resetQuestionAndAnsweredQuestion();
    }
    // eslint-disable-next-line
  }, []);


  // send answer to backend via websocket connection
  const handleAnswerSubmit = () => {
    channel.send(
      { answer_id: answer, answered_question_id: answeredQuestion.id },
    );
  };


  // set usrlQuestionId so page can rerender
  const getNextQuestion = () => {
    const questionIds = quiz.question_ids.filter(
      (question) => (question.id !== parseFloat(selectedQuestionId)),
    );
    // channelRef.current.unsubscribe();
    const nextUrl = questionIds[0] ? `/quiz/${quizId}/question/${questionIds[0]}` : '/';
    navigate(nextUrl);
    saveSelectedQuestionId({ selectedQuestionId: questionIds[0] || 0});
  };

  // submit question answera and return to home
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    resetQuestionAndAnsweredQuestion();
    handleAnswerSubmit();
    removeQuizQuestion(quizId, selectedQuestionId);
    navigate('/');
  };

  // submit answer and request
  const handleNext = (e) => {
    e.preventDefault();
    handleAnswerSubmit();
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
