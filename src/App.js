import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Admin from './pages/Admin';
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";

function App() {


  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
