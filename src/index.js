import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import Home from './components/home/Home';
import Question from './components/question/Question';
import Login from './components/user/Login';
import Result from './components/user/Result';
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
            <Route path="result" element={<Result />} />
            <Route path="question/:id" element={<Question />} />
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
