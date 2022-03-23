import React from 'react';
import PropTypes from 'prop-types';

const AnswerActions = ({ answer, handleNext, handleSaveAndExit }) => (
  <div className="question-actions position-absolute">
    <div className="col-10 mx-auto d-flex justify-content-between pb-2">
      <button
        type="button"
        className="btn btn-primary py-1 px-2"
        onClick={handleSaveAndExit}
        disabled={answer === 0}
      >
        save and exit
      </button>
      <button
        type="button"
        className="btn btn-primary py-1 px-2"
        onClick={handleNext}
        disabled={answer === 0}
      >
        Next
      </button>
    </div>
  </div>
);

AnswerActions.propTypes = {
  answer: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleSaveAndExit: PropTypes.func.isRequired,
};

export default AnswerActions;
