import './css/Header.css';
import { useState, useEffect } from 'react';
import { TbListSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import * as Api from '../api.js';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');

  const handleButtonClick = async () => {
    if (nicknameInput.trim() !== '') {
      try {
        navigate(`/detail/${encodeURIComponent(nicknameInput)}`)
      } catch (error) {
        alert(error.response);
      }
    }
  };

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const token = localStorage.getItem('token');
      if (token) {setIsLoggedIn(true);}
  }, []);

  const handleLogoutClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('emailId');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다');
    }
  };

  return (
    <div>
      <header className='header'>
        <div className='logo-section'>
          <div className='logo' onClick={() => {navigate('/');}}>PECO</div>
          <input
            type='text'
            className='form-control'
            placeholder='닉네임'
            onChange={e => setNicknameInput(e.target.value)}
          />
          <button
            onClick={handleButtonClick}
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon2'
          >
            <TbListSearch style={{ marginTop: '-5px' }}></TbListSearch>
          </button>
        </div>

        <nav className='nav'>
          <ul className='nav-list'>
            <li className='nav-item' onClick={() => {navigate('/report');}}>신고</li>
            <li className='nav-item' onClick={() => {navigate('/stats');}}>통계</li>
            {isLoggedIn ? (
              <>
                <li className='nav-item' onClick={() => {navigate('/my');}}>마이페이지</li>
                <li className='nav-item' onClick={handleLogoutClick}>로그아웃</li>
              </>
            ) : (
              <li className='nav-item' onClick={() => {navigate('/login');}}>로그인</li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
