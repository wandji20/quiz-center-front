import { NOTIFICATIONS } from '../../utils/constants';

const notificationAction = (payload) => ({
  type: NOTIFICATIONS, payload,
});

export default notificationAction;
