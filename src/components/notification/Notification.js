import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, messageType }) => {
  const color = messageType === 'alert' ? 'alert-danger' : 'alert-success';

  return (
    <div className="position-absolute notification text-capitalize p-1">
      <div className={`d-flex alert mb-0 p-0 border-none fade show ${color}`} role="alert">
        <span className="fs-6 mx-2">{message}</span>
        <span className=" me-1" data-bs-dismiss="alert"><i className="bi bi-x" /></span>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,

};

export default Notification;
