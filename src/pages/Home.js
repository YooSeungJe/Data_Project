import React from 'react';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { TbListSearch, TbArrowBigRightFilled } from 'react-icons/tb';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../api.js';

function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [nickname, setNickname] = useState('');
  const [lolUser, setLolUser] = useState(null);
  const [statsMain, setStatsMain] = useState(null);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('emailId');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다');
    }
  };

  const handleButtonClick = async () => {
    if (nickname.trim() !== '') {
      try {
        const response1 = await Api.get(`/lolUser/${nickname}`);
        const response2 = await Api.get(`/stats/basic/${nickname}`);

        setLolUser(response1);
        setStatsMain(response2);
        setShowUserCard(!showUserCard);
        if(response1 == null) {
          alert('존재하지 않는 유저입니다.');
          setShowUserCard(false);
        }
      } catch (error) {
        console.log('error', error);
      } 
    }
  };




  const handleDetailView = () => {
    if (lolUser) {
      navigate(`/detail/${encodeURIComponent(lolUser.lol_id)}`);
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
          <p className='login-button' onClick={() => navigate('/my')}>
            마이페이지
          </p>
          <p className='register-button' onClick={handleLogoutClick}>
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

  const jinxImage = {
    backgroundImage: `url(${징크스})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const bronze_tier = process.env.PUBLIC_URL + '/브론즈.png';
  const silver_tier = process.env.PUBLIC_URL + '/실버.png';
  const gold_tier = process.env.PUBLIC_URL + '/골드.png';
  const gentle_tier = process.env.PUBLIC_URL + '/젠틀.png';
  const tierImage = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '150px',
    width: '140px',
    marginLeft: '10px',
    backgroundImage:
    lolUser && lolUser.manner_grade === 'bronze'
      ? `url(${bronze_tier})`
      : lolUser && lolUser.manner_grade === 'silver'
      ? `url(${silver_tier})` // 수정: 중괄호 오류 수정
      : lolUser && lolUser.manner_grade === 'gold'
      ? `url(${gold_tier})`
      : lolUser && lolUser.manner_grade === 'gentle' // 수정: 'Gentle' 대소문자 구분 수정
      ? `url(${gentle_tier})`
      : '',
  };

  return (
    <div style={jinxImage}>
      <div className='main-bar'>
        <IoMenu className='iomenu' onClick={handleClick} />
        <div className='login-container'>{renderLoginButton()}</div>
        {showOptions && (
          <div className='menu'>
            <p
              onClick={() => {
                navigate('/about');
              }}
            >
              소개
            </p>
            <p
              onClick={() => {
                navigate('/report');
              }}
            >
              신고
            </p>
            <p
              onClick={() => {
                navigate('/stats');
              }}
            >
              통계
            </p>
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
          onChange={e => setNickname(e.target.value)}
          onKeyUp={e => {if(e.key === 'Enter'){handleButtonClick();}}}
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
        <div className='search-card'>
          {lolUser && statsMain && (
            <div className='container'>
              <div className='row'>
                <div className='col-6' style={tierImage}></div>
                <div className='col-6 user-nickname'>
                  <div style={{width:'240px'}}>{lolUser.lol_id}</div>
                  <div className='row user-info'>
                    <div className='col-4'>
                      <h4>Total</h4>
                      <p
                        style={{
                          marginLeft: '9px',
                          color: 'red',
                          fontSize: '25px',
                        }}
                      >
                        {lolUser.report_count}
                      </p>
                    </div>
                    <div className='col-4'>
                      <h4>Month</h4>
                      <p
                        style={{
                          marginLeft: '14px',
                          color: 'blue',
                          fontSize: '25px',
                        }}
                      >
                        {statsMain.score_count}
                      </p>
                    </div>
                    <div className='col-4'>
                      <h4 style={{ fontSize: '13px', marginBottom: '16px' }}>
                        Most used
                      </h4>
                      <p>{statsMain.category_name || '없음'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className='request' onClick={handleDetailView}>
                상세보기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
