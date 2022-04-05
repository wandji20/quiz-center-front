/* eslint-disable */
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { fetchQuizzesRequest } from '../api/api';
import Nav from './header/Nav';
import { Notification } from '.';
import { NotificationContext } from '../context/notifications/NotificationContextProvider';
import { QuizContext } from '../context/quiz/QuizContextProvider';
import { UserContext } from '../context/user/UserContextProvider';
import { PAYLOAD } from '../apollo/query/query';
import mapMessage from '../utils/tranformNotification';

function Main() {
  const { notice, alert, addNotification } = useContext(NotificationContext);
  const { saveQuizzes } = useContext(QuizContext);
  const { loginUser } = useContext(UserContext);

  const response = useQuery(PAYLOAD);
  const { loading, error, data } = response;

  // fetch user quizzes and updates quiz and user context provider values
  useEffect(() => {
    const handleError = (error) => {
      if (error.message !== 'undefined') {
        addNotification({ alert: error.message })
      }
      if (error.graphQLErrors.length > 0) {
        addNotification({ alert: mapMessage(error.graphQLErrors[0]) })
      }
    }
    if (error) {
      handleError(error)
    }

    if(data) {
      const { user, quizzes } = data
      loginUser({ user });
      saveQuizzes(quizzes);
    }
  }, [loading]);

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
