import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import './css/Detail.css';
import * as Api from '../api.js';

function Detail() {
  const { id } = useParams();
  const [lolUser, setLolUser] = useState('');
  const [statsMain, setStatsMain] = useState('');

  useEffect(() => {
    const fetchLolUser = async () => {
      if (id.trim() !== '') {
        try {
          const response1 = await Api.get(`/lolUser/${id}`);
          const response2 = await Api.get(`/stats/basic/${id}`);

          setLolUser(response1);
          setStatsMain(response2);
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    fetchLolUser();
  }, []);

  const bronze_tier = process.env.PUBLIC_URL + '/브론즈.png';
  const silver_tier = process.env.PUBLIC_URL + '/실버.png';
  const gold_tier = process.env.PUBLIC_URL + '/골드.png';
  const gentle_tier = process.env.PUBLIC_URL + '/젠틀.png';
  const divStyle = {
    backgroundSize: 'cover',
    height: '190px',
    width: '190px',

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
    <div className='my-back'>
      <div>
        <Header />
      </div>
      <div className='user-container'>
        <div style={divStyle} className='tier-image'></div>
        <div className='middle-text'>
          <p>
            <span style={{ fontSize: '25px' }}>{id}</span>님의 총 피신고 건수는{' '}
            <span style={{ color: 'red' }}>{lolUser.report_count}</span>회
            입니다.
          </p>
          <p>
            이번달은 총{' '}
            <span style={{ color: 'skyblue' }}>{statsMain.score_count}</span>
            회의 신고를 당하셨습니다.
          </p>
          <p>
            욕설 중 `{statsMain.category_name}`에 관한 욕설을 가장 많이
            사용하셨습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
