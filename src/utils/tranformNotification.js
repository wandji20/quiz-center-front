const mapMessage = (message) => {
  switch (message) {
    case 'Not enough or too many segments': {
      return 'login to continue';
    }

    default:
      return message;
  }
};

export default mapMessage;
