import React, { useContext, useState } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import Answer from './Answer';

const Question = () => {
  const [answer, setAnswer] = useState(null);
  const { question } = useContext(QuizContext);

  const { description, answers } = question;

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
  };
  return (
    <div className="pt-5">
      <p className="p-0 d-flex justify-content-around col-12">
        <span className="fw-bold h2 col-1">Q.</span>
        <span className="h6 col-10">{description}</span>
      </p>
      <div className="answers mt-3 container-fluid ">
        <form
          className="d-flex flex-column align-items-start col-10 mx-auto"
          onSubmit={handleAnswerSubmit}
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
              <button type="submit" className="btn btn-primary py-1 px-2">save and exit</button>
              <button type="submit" className="btn btn-primary py-1 px-2">Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
