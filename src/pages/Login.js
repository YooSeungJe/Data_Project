import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Api from '../api.js';
function Login() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await Api.post('/user/login', {
        emailId,
        password,
      });

      console.log(response.data);
      const { token } = response.data;

      if (token) {
        // 토큰 저장 등 로그인 처리
        localStorage.setItem('token', token);
        localStorage.setItem('emailId', emailId);
        alert('로그인 성공!');
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return (
    <div className='back-style'>
      <div className='login-form'>
        <div className='login-home'>
          <p
            onClick={() => {
              navigate('/');
            }}
          >
            PECO
          </p>
        </div>
        <div className='login-title'>
          <p>로그인</p>
        </div>
        <div className='login-box'>
          <form onSubmit={handleLogin}>
            <div className='user-box'>
              <input
                style={{ width: '91%' }}
                type='text'
                value={emailId}
                onChange={e => setEmailId(e.target.value)}
                required
              />
              <label style={{ marginLeft: '28px' }}>이메일</label>
            </div>
            <div className='user-box'>
              <input
                style={{ width: '91%' }}
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label style={{ marginLeft: '28px' }}>비밀번호</label>
            </div>
            <center>
              <button>
                Login
                <span></span>
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
