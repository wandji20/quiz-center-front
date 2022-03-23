import { NOTIFICATIONS } from '../../utils/constants';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATIONS: {
      return { ...state, ...action.payload };
    }

    default:
      return { ...state };
  }
};

export default notificationReducer;
