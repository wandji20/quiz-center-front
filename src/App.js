import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/header/Nav';
import Notification from './components/notification/Notification';
import { NotificationContext } from './context/notifications/NotificationContextProvider';

function App() {
  const { notice, alert } = useContext(NotificationContext);
  return (
    <>
      <Nav />
      <section id="content">
        <Outlet />
        {
          notice && <Notification message={notice} messageType="notice" />
        }
        {
          alert && <Notification message={alert} messageType="alert" />
        }
      </section>
    </>
  );
}

export default App;
