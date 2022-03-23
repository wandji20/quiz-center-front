const actionText = (loggedIn, questionIds) => {
  switch (true) {
    case !loggedIn: {
      return 'Start';
    }
    case loggedIn && questionIds.length === 5: {
      return 'Start';
    }

    case loggedIn && questionIds.length > 0: {
      return 'Continue';
    }

    default:
      return 'Completed';
  }
};

export default actionText;
