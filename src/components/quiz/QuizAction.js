import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../context/quiz/QuizContextProvider';

const QuizAction = ({ text, questionUrl, questionId }) => {
  const { saveSelectedQuestionId } = useContext(QuizContext);
  return (

    text === 'Completed'
      ? <span className="text-white btn primary-bg">{text}</span>
      : (
        <Link
          to={questionUrl}
          className="text-white text-decoration-none btn primary-bg"
          onClick={() => saveSelectedQuestionId({ selectedQuestionId: questionId })}
        >
          {text}
        </Link>
      )
  );
};

QuizAction.propTypes = {
  text: PropTypes.string.isRequired,
  questionUrl: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuizAction;
