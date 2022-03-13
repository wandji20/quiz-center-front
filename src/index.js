import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/home/Home';
import SignUp from './components/user/SignUp';
import Login from './components/user/Login';
import Result from './components/user/Result';
import reportWebVitals from './reportWebVitals';
import Question from './components/question/Question';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="result" element={<Result />} />
          <Route path="question/:id" element={<Question />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
