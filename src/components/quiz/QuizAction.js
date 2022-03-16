import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuizAction = ({ text, questionUrl }) => (

  text === 'Completed'
    ? <span className="text-white btn primary-bg">{text}</span>
    : (
      <Link
        to={questionUrl}
        className="text-white text-decoration-none btn primary-bg"
      >
        {text}
      </Link>
    )
);

QuizAction.propTypes = {
  text: PropTypes.string.isRequired,
  questionUrl: PropTypes.string.isRequired,
};

export default QuizAction;
