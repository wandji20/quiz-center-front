/* eslint-disable */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionCable from 'actioncable';
import { QuizContext } from '../../context/quiz/QuizContextProvider';
import { NotificationContext } from '../../context/notifications/NotificationContextProvider';
import { createAnsweredQuestionRequest } from '../../api/api';
import { UserContext } from '../../context/user/UserContextProvider';
import Answer from './Answer';
import { getAuthToken } from '../../utils/utils';

const Question = () => {
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);
  const { removeQuizQuestion } = useContext(QuizContext);
  
  const urlParams = useParams();
  
  const { quizId, questionId } = urlParams;
  
  const { user } = useContext(UserContext);
  
  const [channel, setChannel] = useState(null);
  const channelRef = useRef();
  
  
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState({ description: '', answers: [] });
  // const handlecreateAnsweredQuestionRequest = async () => {
  //   try {
    //     const response = await createAnsweredQuestionRequest(
      //       { quiz_id: quizId, question_id: questionId },
      //     );
      //     if (response.errors) {
        //       addNotification({ errors: response.errors });
        //       navigate(-1);
        //     }
        //     removeQuizQuestion(quizId, questionId);
        //   } catch (e) {
          //     navigate('/');
          //     addNotification({ alert: e.message });
          //   }
  // };
  
  const createAnsweredQuestion = (channel) => {
    const payload = {
      answered_question: { quiz_id: quizId, question_id: questionId }
    }

    channelRef.current.send(payload);
  }

  
  const token = getAuthToken();
  const cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${token}`);
  const handleCableResponse = (data) => {
    const answeredQuestion = data.question;
    setQuestion(answeredQuestion);
  };


  const createSubscription = () => {
    return cable.subscriptions.create(
      {
        channel: 'AnsweredQuestionChannel',
        email: user.email,
      },
      {
        received: (data) => handleCableResponse(data),
        connected: () => {
          console.log('connected');
          createAnsweredQuestion();
        }
      },
    );
  } 
  
  
  useEffect(() => {
    const answerChannel = createSubscription();
    setChannel(answerChannel)
    // createAnsweredQuestion(answerChannel);
    channelRef.current = answerChannel;
    
    return () => {
      channelRef.current.unsubscribe();
    }
  },[]);
  
  const { description, answers } = question;

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    // console.log(answer);
    channel.send({name: 'name'})
  };
  return (
    <div className="pt-5">
      <p className="p-0 d-flex justify-content-around col-12">
        <span className="fw-bold h2 col-1" onClick={handleAnswerSubmit}>Q.</span>
        <span className="h6 col-10">{description}</span>
      </p>
      <div className="answers mt-3 container-fluid ">
        <form
          className="d-flex flex-column align-items-start col-10 mx-auto"
          onSubmit={handleAnswerSubmit}
        >
          {
            answers.map((answer) => (
              <Answer
                key={answer.id}
                answer={answer}
                handleAnswerChange={handleAnswerChange}
              />
            ))
          }
          <div className="question-actions position-absolute">
            <div className="col-10 mx-auto d-flex justify-content-between pb-2">
              <button type="submit" className="btn btn-primary py-1 px-2">save and exit</button>
              <button type="submit" className="btn btn-primary py-1 px-2">Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
