import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchQuizzesRequest } from './api/api';
import Nav from './components/header/Nav';
import Notification from './components/notification/Notification';
import { NotificationContext } from './context/notifications/NotificationContextProvider';
import { QuizContext } from './context/quiz/QuizContextProvider';
import { UserContext } from './context/user/UserContextProvider';

function App() {
  const { notice, alert, addNotification } = useContext(NotificationContext);
  const { saveQuizzes } = useContext(QuizContext);
  const { loginUser } = useContext(UserContext);

  const handleFetchQuizzes = async () => {
    addNotification();
    try {
      const response = await fetchQuizzesRequest();
      const { quizzes, user, alert } = response;
      if (quizzes) {
        saveQuizzes(quizzes);
      }
      if (user) {
        loginUser({ user, loggedIn: true });
      }
      if (alert) {
        addNotification(response);
      }
    } catch (e) {
      addNotification({ alert: e.message });
    }
  };
  useEffect(() => {
    handleFetchQuizzes();
  }, []);
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
