import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContextProvider';
// import { createAnsweredQuestionRequest } from '../../api/api';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { QuizContext } from '../../context/quiz/QuizContextProvider';

const QuizDetails = ({ quiz }) => {
  const { loggedIn } = useContext(UserContext);

  const { addNotification } = useContext(NotificationContext);
  const { removeQuizQuestion } = useContext(QuizContext);

  const [showAction, setShowAction] = useState(false);

  const { title, id } = quiz;
  const questionIds = quiz.question_ids || [];
  const questionId = questionIds[0];
  const questionUrl = `/quiz/${id}/question/${questionIds[0] ? questionId : 'id'}`;
  const navigate = useNavigate();

  const handleAnsweredQuestionRequest = async () => {
    try {
      // createAnsweredQuestionRequest(
      //   { quiz_id: id, question_id: questionId },
      // );
      removeQuizQuestion(id, questionId);
    } catch (e) {
      navigate('/');
      addNotification({ alert: e.message });
    }
  };

  const actionDisplay = () => {
    switch (true) {
      case !loggedIn: {
        return (
          <span className="">
            Start Quiz
          </span>
        );
      }
      case loggedIn && questionIds.length === 5: {
        return (
          <span className="">
            Start Quiz
          </span>
        );
      }

      case loggedIn && questionIds.length > 0: {
        return (
          <span className="">
            Continue
          </span>
        );
      }

      default:
        return (
          <span className="">
            Completed
          </span>
        );
    }
  };
  return (
    <div
      className="quiz primary-bg col-10 fs-3 text-white d-flex justify-content-center align-items-center "
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
    >
      {
        showAction ? (
          <Link
            to={questionUrl}
            className="text-white text-decoration-none btn primary-bg"
            onClick={handleAnsweredQuestionRequest}
          >
            {
              actionDisplay()
            }
          </Link>
        )
          : (
            <h6 className="text-capitalize h5 qiuz-title">{title}</h6>
          )
      }
    </div>
  );
};

QuizDetails.propTypes = {
  quiz: PropTypes.shape().isRequired,
};

export default QuizDetails;
