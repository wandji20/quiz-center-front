import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapMessage from '../../utils/tranformNotification';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';

const Notification = ({ message, messageType }) => {
  const { addNotification } = useContext(NotificationContext);
  const color = messageType === 'alert' ? 'alert-danger' : 'alert-success';

  const displayMessage = mapMessage(message);

  useEffect(() => {
    const clearNotification = setTimeout(() => {
      addNotification();
    }, 3000);

    return () => {
      clearTimeout(clearNotification);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        displayMessage !== '' && (
          <div className="position-absolute notification text-capitalize p-1">
            <div className={`d-flex alert mb-0 p-0 border-none fade show ${color}`} role="alert">
              <span className="fs-6 mx-2">{displayMessage}</span>
              <span className=" me-1" data-bs-dismiss="alert"><i className="bi bi-x" /></span>
            </div>
          </div>
        )

      }
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,

};

export default Notification;
