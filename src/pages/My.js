import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header';
import './css/My.css';
function My() {
  const [userInfo, setUserInfo] = useState('');
  const [stats, setStats] = useState('');
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('http://localhost:3001/lolUser/my', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo(response.data);
          const response3 = await axios.get(`http://localhost:3001/stats/basic/${userInfo.lol_id}`);
          setStats(response3.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const bronze_tier = process.env.PUBLIC_URL + '/브론즈.png';
  const silver_tier = process.env.PUBLIC_URL + '/실버.png';
  const gold_tier = process.env.PUBLIC_URL + '/골드.png';
  const gentle_tier = process.env.PUBLIC_URL + '/젠틀.png';
  const divStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '150px',
    width: '140px',
    marginLeft: '10px',
    backgroundImage:
      userInfo && userInfo.manner_grade === 'bronze'
        ? `url(${bronze_tier})`
        : userInfo && userInfo.manner_grade === 'silver'
        ? `url(${silver_tier}})`
        : userInfo && userInfo.manner_grade === 'gold'
        ? `url(${gold_tier})`
        : userInfo && userInfo.manner_grade === 'Gentle'
        ? `url(${gentle_tier})`
        : '',
  };


  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="user-container">
        <div className="row my-user align-items-center">
          <div className="col-12 col-lg-2">
            <p style={divStyle}></p>
            <p className="user-nickname">{userInfo.lol_id}</p>
          </div>
          <div className="col-12 col-lg-5 user-middle">
            <p>{userInfo.lol_id}님의 총 피신고 건수는 <span style={{color:'red'}}>{userInfo.report_count}</span>회 입니다.</p>
            <p>이번달은 총 <span style={{color:'blue'}}>{stats.score_count}</span>회의 신고를 당하셨습니다.</p>
            <p>욕설 중 `{stats.category_name}`에 관한 욕설을 가장 많이 사용하셨습니다.</p>
          </div>
          <div className="col-12 col-lg-5">d</div>
        </div>
      </div>
    </div>
  );
}

export default My;

