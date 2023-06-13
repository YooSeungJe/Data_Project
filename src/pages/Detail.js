import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState('');
  const [stats, setStats] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/lolUser/${id}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    axios
      .get(`http://localhost:3001/stats/basic/${id}`)
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const bronze_tier = process.env.PUBLIC_URL + '/브론즈.png';
  const silver_tier = process.env.PUBLIC_URL + '/실버.png';
  const gold_tier = process.env.PUBLIC_URL + '/골드.png';
  const gentle_tier = process.env.PUBLIC_URL + '/젠틀.png';
  const divStyle = {
    backgroundSize: 'cover',
    height: '190px',
    width: '190px',

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
  console.log(stats);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='user-container'>
        <div style={divStyle} className='tier-image'></div>
        <div className='middle-text'>
          <p>
            <span style={{ fontSize: '25px' }}>{userInfo.lol_id}</span>님의 총
            피신고 건수는{' '}
            <span style={{ color: 'red' }}>{userInfo.report_count}</span>회
            입니다.
          </p>
          <p>
            이번달은 총{' '}
            <span style={{ color: 'blue' }}>{stats.score_count}</span>회의
            신고를 당하셨습니다.
          </p>
          <p>
            욕설 중 `{stats.category_name}`에 관한 욕설을 가장 많이
            사용하셨습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
