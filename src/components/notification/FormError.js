import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ message }) => (
  <small className="w-100 text-danger">
    {/* {`${title} ${message}`} */}
    {message}
  </small>
);

FormError.propTypes = {
  message: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
};
export default FormError;
