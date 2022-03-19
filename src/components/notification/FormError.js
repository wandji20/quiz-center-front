import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ message }) => (
  <small className="w-100 text-danger">
    {message}
  </small>
);

FormError.propTypes = {
  message: PropTypes.string.isRequired,
};
export default FormError;
