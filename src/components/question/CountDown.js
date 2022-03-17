import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CountDown = ({ timer }) => {
  const { points, createdAt } = timer;

  const initialCount = Math.floor(
    (parseFloat(points) * 60) - (Math.floor(Date.now() - createdAt) / 1000),
  );
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const performCounter = setTimeout(() => {
      if (count > 0) {
        setCount((count) => (count - 1));
      }
    }, 1000);

    return () => {
      clearTimeout(performCounter);
    };
  }, [count]);

  useEffect(() => {
    setCount(initialCount);
  }, [points, createdAt]);

  return (
    <span>{count}</span>
  );
};

CountDown.propTypes = {
  timer: PropTypes.exact({
    points: PropTypes.number,
    createdAt: PropTypes.number,
  }).isRequired,
};

export default CountDown;