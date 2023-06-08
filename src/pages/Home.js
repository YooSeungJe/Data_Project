import React from 'react';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { TbListSearch } from 'react-icons/tb';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
    } else {
      navigate('/login');
    }
  };

  const handleButtonClick = () => {
    if (nicknameInput.trim() !== '') {
      setShowUserCard(!showUserCard);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <div style={{ display: 'flex' }}>
          <p className='login-button'>마이페이지</p>
          <p className='register-button' onClick={handleLoginClick}>
            로그아웃
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex' }}>
          <p className='login-button' onClick={handleLoginClick}>
            로그인
          </p>
          <p
            className='register-button'
            onClick={() => {
              navigate('/register');
            }}
          >
            회원가입
          </p>
        </div>
      );
    }
  };

  const 징크스 = process.env.PUBLIC_URL + '/징크스.jpg';

  const divStyle = {
    backgroundImage: `url(${징크스})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <div style={divStyle}>
      <div className='main-bar'>
        <IoMenu className='iomenu' onClick={handleClick} />
        <div className='login-container'>{renderLoginButton()}</div>
        {showOptions && (
          <div className='menu'>
            <p
              onClick={() => {
                navigate('/report');
              }}
            >
              신고
            </p>
            <p>통계</p>
          </div>
        )}
      </div>
      <div className='peco'>
        <p
          onClick={() => {
            navigate('/');
          }}
        >
          PECO
        </p>
      </div>
      <div
        className='input-group mb-3 search'
        style={{ width: '600px', margin: 'auto' }}
      >
        <input
          type='text'
          className='form-control'
          placeholder='닉네임'
          aria-label="Recipient's username"
          aria-describedby='button-addon2'
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
      {showUserCard && (
        <div className='user-card'>
          <div className='card-description'>
            <div className='row'>
              <div className='col-3 tier'>사진</div>
              <div className='col-9'>내용</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
