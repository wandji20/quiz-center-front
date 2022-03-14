import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer, handleAnswerChange }) => {
  const { id, value } = answer;
  return (
    <div className="mb-3 form-check">
      <label className="form-check-label" htmlFor="r">
        <input
          type="radio"
          className="form-check-input"
          name="answer"
          value={id}
          onClick={handleAnswerChange}
        />
        {value}
      </label>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.shape().isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
};

export default Answer;
