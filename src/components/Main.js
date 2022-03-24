import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { fetchQuizzesRequest } from '../api/api';
import Nav from './header/Nav';
import { Notification } from '.';
import { NotificationContext } from '../context/notifications/NotificationContextProvider';
import { QuizContext } from '../context/quiz/QuizContextProvider';
import { UserContext } from '../context/user/UserContextProvider';

function Main() {
  const { notice, alert, addNotification } = useContext(NotificationContext);
  const { saveQuizzes } = useContext(QuizContext);
  const { loginUser } = useContext(UserContext);

  useEffect(() => {
    const handleFetchQuizzes = async () => {
      addNotification();
      try {
        const response = await fetchQuizzesRequest();

        const { quizzes, user, alert } = response;
        if (user) {
          loginUser({ user });
        }
        if (quizzes) {
          saveQuizzes(quizzes);
        }
        if (alert) {
          addNotification(response);
        }
      } catch (e) {
        addNotification({ alert: e.message });
      }
    };
    handleFetchQuizzes();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-lg-10 m-auto">
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
    </div>
  );
}

export default Main;
