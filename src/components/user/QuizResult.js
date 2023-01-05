import React from 'react';
import PropTypes from 'prop-types';

const QuizResult = ({
  title, counter, score, attempted,
}) => (
  <tr>
    <th scope="row">{counter}</th>
    <td>{title}</td>
    <td>{attempted}</td>
    <td>{score}</td>
  </tr>
);

QuizResult.propTypes = {
  counter: PropTypes.number.isRequired,
  attempted: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default QuizResult;
