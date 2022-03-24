import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import {
  Login, SignUp, ProtectedRoute, Home, Result, Question,
} from './components';

const App = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="sign_up" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/quiz/:quizId/question/:questionId" element={<Question />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
