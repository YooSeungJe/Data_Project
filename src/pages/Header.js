import './css/Header.css';
import { IoMenu } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { TbListSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [showUserCard, setShowUserCard] = useState(false);
  const [lolUser, setLolUser] = useState(null);
  const [statsMain, setStatsMain] = useState(null);

  const handleButtonClick = async () => {
    if (nicknameInput.trim() !== '') {
      try {
        const response1 = await axios.get(
          `http://localhost:3001/lolUser/${nicknameInput}`
        );
        const response2 = await axios.get(
          `http://localhost:3001/stats/basic/${nicknameInput}`
        );

        setLolUser(response1.data);
        setStatsMain(response2.data);
        setShowUserCard(!showUserCard);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  const handleDetailView = () => {
    if (lolUser) {
      navigate(`/detail/${encodeURIComponent(lolUser.lol_id)}`);
    }
  };

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
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
          <div
            className='logo'
            onClick={() => {
              navigate('/');
            }}
          >
            PECO
          </div>
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
        {showUserCard && lolUser && statsMain && (
          <div className='container'>
            <div className='row'>
              <div className='col-6 user-nickname'>
                <button className='request' onClick={handleDetailView}>
                  <div>{lolUser.lol_id}</div>
                  <div>소환사레벨:{lolUser.level}</div>
                  상세보기
                </button>
              </div>
            </div>
          </div>
        )}
        <nav className='nav'>
          <ul className='nav-list'>
            <li
              className='nav-item'
              onClick={() => {
                navigate('/report');
              }}
            >
              신고
            </li>
            <li
              className='nav-item'
              onClick={() => {
                navigate('/stats');
              }}
            >
              통계
            </li>
            {isLoggedIn ? (
              <>
                <li
                  className='nav-item'
                  onClick={() => {
                    navigate('/my');
                  }}
                >
                  마이페이지
                </li>
                <li className='nav-item' onClick={handleLogoutClick}>
                  로그아웃
                </li>
              </>
            ) : (
              <li
                className='nav-item'
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
