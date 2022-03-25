import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/quiz/QuizContextProvider';

const CountDown = () => {
  const { question, answeredQuestion } = useContext(QuizContext);

  const { createdAt } = answeredQuestion;
  const { points } = question;

  const [count, setCount] = useState(0);

  useEffect(() => {
    const initialCount = Math.floor(
      (parseFloat(points) * 60) - (Math.floor(Date.now() - createdAt) / 1000),
    );
    setCount(initialCount);

    // update conter by -1
    const performCounter = setTimeout(() => {
      if (count > 0) {
        setCount((count) => (count - 1));
      }
    }, 1000);

    return () => {
      setCount(0);
      clearTimeout(performCounter);
    };
  }, [count]);

  return (
    <>
      {
        count > 0 && (
          <span
            className={`count-down  badge position-absolute ${count < 10 ? 'bg-danger' : 'bg-success'}`}
          >
            {count}
          </span>
        )
      }

    </>

  );
};

export default CountDown;
