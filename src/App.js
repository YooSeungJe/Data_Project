import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Admin from './pages/Admin';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  // localStorage.setItem('token', JSON.stringify({ userId: '갑수' })); // 토큰 테스트 나중에 지울 것
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/report' element={<Report />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
