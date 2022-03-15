/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import Home from './components/home/Home';
import Question from './components/question/Question';
import ProtectedRoute from './components/ProtectedRoute';
import Result from './components/user/Result';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';


import IndexContextProvider from './context/IndexContextProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <IndexContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="sign_up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="result" element={<Result />} />
              <Route path="quiz/:quiz_id/question/:question_id" element={<Question />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </IndexContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
