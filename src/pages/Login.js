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

// import './css/Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';
// import { GoogleLogin } from 'react-google-login';
// function Login() {
//   const [emailId, setEmailId] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const handleLogin = async e => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3001/user/login', {
//         emailId,
//         password,
//       });
//       console.log(response.data);
//       const { token } = response.data;

//       if (token) {
//         // 토큰 저장 등 로그인 처리
//         localStorage.setItem('token', token);
//         alert('로그인 성공!');
//         navigate('/');
//       } else {
//         alert('아이디 또는 비밀번호가 일치하지 않습니다.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('로그인 실패');
//     }
//   };
//   const handleGoogleLoginSuccess = async response => {
//     try {
//       const { tokenId } = response; // 구글 로그인 응답에서 tokenId 추출
//       const res = await axios.post('http://localhost:3001/auth/google', {
//         tokenId,
//       });

//       // 서버로부터 토큰 등의 응답을 받아 처리하는 로직
//       const { token } = res.data;
//       localStorage.setItem('token', token);

//       // 로그인 성공 처리
//       alert('로그인 성공!');
//       navigate('/'); // 로그인 후 이동할 페이지로 설정
//     } catch (error) {
//       console.error(error);
//       alert('Google 로그인 처리 중 오류가 발생했습니다.');
//     }
//   };

//   const handleGoogleLoginFailure = error => {
//     console.error('Google 로그인 실패:', error);
//     alert('Google 로그인에 실패했습니다.');
//   };

//   return (
//     <div className='back-style'>
//       <div className='login-form'>
//         <div className='login-home'>
//           <p
//             onClick={() => {
//               navigate('/');
//             }}
//           >
//             PECO
//           </p>
//         </div>
//         <div className='login-title'>
//           <p>로그인</p>
//         </div>
//         <div className='login-box'>
//           <form onSubmit={handleLogin}>
//             <div className='user-box'>
//               <input
//                 style={{ width: '91%' }}
//                 type='text'
//                 value={emailId}
//                 onChange={e => setEmailId(e.target.value)}
//                 required
//               />
//               <label style={{ marginLeft: '28px' }}>이메일</label>
//             </div>
//             <div className='user-box'>
//               <input
//                 style={{ width: '91%' }}
//                 type='password'
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//               />
//               <label style={{ marginLeft: '28px' }}>비밀번호</label>
//             </div>
//             <center>
//               <button>
//                 Login
//                 <span></span>
//               </button>
//             </center>
//           </form>
//         </div>
//         <GoogleLogin
//           clientId='YOUR_CLIENT_ID'
//           buttonText='Google 로그인'
//           onSuccess={handleGoogleLoginSuccess}
//           onFailure={handleGoogleLoginFailure}
//           cookiePolicy={'single_host_origin'}
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;
