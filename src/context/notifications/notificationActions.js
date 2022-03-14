import { NOTIFICATIONS } from '../constants';

const notificationAction = (payload) => ({
  type: NOTIFICATIONS, payload,
});

export default notificationAction;
