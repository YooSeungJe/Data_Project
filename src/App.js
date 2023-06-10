import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Admin from './pages/Admin';
import Statistics from './pages/Statics';
import My from './pages/My';
import Detail from './pages/Detail';
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
          <Route path='/stats' element={<Statistics />} />
          <Route path='/my' element={<My />} />
          <Route path='/detail' element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
