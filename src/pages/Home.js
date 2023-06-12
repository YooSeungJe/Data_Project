import React from 'react';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { TbListSearch, TbArrowBigRightFilled } from 'react-icons/tb';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [lolUser, setLolUser] = useState(null);
  const [statsMain, setStatsMain] = useState(null);
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



  const handleButtonClick = async () => {
    if (nicknameInput.trim() !== '') {
      try {
        const response1 = await axios.post(`http://localhost:3001/lolUser/${nicknameInput}`);
        const response2 = await axios.get(`http://localhost:3001/stats/basic/${nicknameInput}`);
  
        setLolUser(response1.data);
        setStatsMain(response2.data);
        setShowUserCard(!showUserCard);
      } catch (error) {
        console.log('error', error);
      }
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
          <p className='login-button' onClick={()=>navigate('/my')}>마이페이지</p>
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

  const bronze_tier = process.env.PUBLIC_URL + '/브론즈.png';
  const silver_tier = process.env.PUBLIC_URL + '/실버.png';
  const gold_tier = process.env.PUBLIC_URL + '/골드.png';
  const gentle_tier = process.env.PUBLIC_URL + '/젠틀.png';
  const divStyle2 = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '150px',
    width: '140px',
    marginLeft: '10px',
    backgroundImage:
      lolUser && lolUser.manner_grade === 'bronze'
        ? `url(${bronze_tier})`
        : lolUser && lolUser.manner_grade === 'silver'
        ? `url(${silver_tier}})`
        : lolUser && lolUser.manner_grade === 'gold'
        ? `url(${gold_tier})`
        : lolUser && lolUser.manner_grade === 'Gentle'
        ? `url(${gentle_tier})`
        : '',
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
        <div className='search-card'>
          {lolUser && statsMain && (
            // <div className='row'>
            //   <div className='col-3 left-card'>
            //     <div style={{padding:'10px'}}>
            //       <div style={divStyle2}></div>
            //     </div>
            //     <p style={{textAlign:'center', fontWeight:'bolder'}}>{lolUser.lol_id}</p>
            //   </div>
            //   <div className='col-9' style={{textAlign:'center', paddingTop:'35px'}}>
            //     <p>이 유저는 총 <span style={{color:'red'}}>{lolUser.report_count}회</span>의 신고를 당했습니다</p>
            //     <p>이번달은 총 <span style={{color:'red'}}>{statsMain.score_count}회</span>의 신고를 당했습니다.</p>
            //     <p>가장 많이 한 욕설의 종류는 <span style={{color:'red'}}>{statsMain.category_name}</span>입니다.</p>
            //     <p onClick={()=>{navigate('/detail')}} style={{textAlign:'end', marginRight:'5px',cursor:'pointer'}}>상세보기<TbArrowBigRightFilled/></p>
            //   </div>
            // </div>
            <div className='container'>
              <div className='row'>
                <div className='col-6' style={divStyle2}></div>
                <div className='col-6 user-nickname'>
                  <div>
                    {lolUser.lol_id}
                  </div> 
                  <div className='row user-info'>
                    <div className='col-4'>
                      <h4>Total</h4>
                      <p style={{marginLeft:'12px', color:'red'}}>{lolUser.report_count}</p>  
                    </div>  
                    <div className='col-4'>
                      <h4>Month</h4>
                      <p style={{marginLeft:'16px', color:'blue'}}>{statsMain.score_count}</p>
                    </div>  
                    <div className='col-4'>
                      <h4 style={{fontSize:'13px'}}>Most used</h4> 
                      <p>{statsMain.category_name}</p> 
                    </div>  
                  </div> 
                </div>
              </div>
              <button className='request' onClick={()=>{navigate('/detail')}}>상세보기</button>
            </div>  

          )}
        </div>
      )}
    </div>
  );
}

export default Home;

