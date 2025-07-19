import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Timer from './pages/Timer';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import TopPage from './pages/TopPage';

import LoginModal from './components/Modal/LoginModal';
import RegisterModal from './components/Modal/RegisterModal';
import ErrorModal from './components/Modal/ErrorModal';

import { fetchCurrentUser, handleLogin, handleRegister  } from "./apiHandlers";

function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser(setUser, setErrorMsg);
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <LoginModal onLogin={(creds) => handleLogin(creds, setErrorMsg, setUser)} />
      <RegisterModal onRegister={(creds) => handleRegister(creds, setErrorMsg, setUser)} />
      <ErrorModal message={errorMsg} />
    </div>
  );
}

export default App;
