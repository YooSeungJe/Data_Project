import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header';
import './css/My.css';
import {Doughnut } from 'react-chartjs-2';

function My() {
  const [userInfo, setUserInfo] = useState('');
  const [stats, setStats] = useState('');
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userStatusData, setUserStatusData] = useState([]);
  const [userReportedData, setUserReportedData] = useState([]);
  const [userReportingData, setUserReportingData] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response1 = await axios.get('http://localhost:3001/lolUser/my', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo(response1.data);
          const response2 = await axios.get(`http://localhost:3001/stats/basic/${response1.data.lol_id}`);
          setStats(response2.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [userInfo.lol_id]); //의존 배열에 userInfo를 추가하여 상태가 변할 때마다 훅이 실행되도록 함

  useEffect(() => {
    const fetchUserReportedByCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const emailId = localStorage.getItem('emailId');


      if (token && emailId) {
        const response3 = await axios.get(`http://localhost:3001/stats/userReportedByCategory/${emailId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAbuseCntByCategoryData(response3.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
    fetchUserReportedByCategory();
  }, []);
  
  const abuseCntByCategory = {
    labels: abuseCntByCategoryData.map(item => item.category_name),
    datasets: [
      {
        label: '신고 횟수',
        data: abuseCntByCategoryData.map(item => item.count),
        backgroundColor: ['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF'],
        borderColor:['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF'],
        borderDash:[0],
      },
    ],
  };

  useEffect(()=>{
    const fetchUserReportedByStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');

        if(token && emailId) {
          const response4 = await axios.get(`http://localhost:3001/stats/userReportCntByStatus/${emailId}`,{
            headers : {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserStatusData(response4.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
      fetchUserReportedByStatus();
  }, []);

  const userStatus = {
    labels: ['미승인', '승인', '대기중'],
    datasets: [
      {
        label:'건수',
        data: userStatusData.map(item=> item.count),
        backgroundColor:['#FF5A5A','#4374D9','#A6A6A6'],
        borderColor:['#FF5A5A','#4374D9','#A6A6A6'],
        borderWidth:1,
      },
    ],
  };

  


  useEffect(()=>{
    const fetchUserReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');

        if(token && emailId) {
          const response5 = await axios.get(`http://localhost:3001/stats/userReportCnt/${emailId}`,{
            headers : {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserReportedData(response5.data.userReportedCnt);
          setUserReportingData(response5.data.userReportingCnt);
        }
      } catch (error) {
        console.error(error);
      }
    };

      fetchUserReport();

  }, []);


  const userReport = {
    labels:['신고', '피신고'],
    datasets: [
      {
        label:'건수',
        data: [userReportingData.map(item=> item.count), userReportedData.map(item=> item.count)],
        backgroundColor:['#4374D9','#FF5A5A'],
        borderColor:['#4374D9','#FF5A5A'],
        borderWidth:1,
      },
    ],
  };





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
  
  


  return (
    <div className="my-back">
      <div>
        <Header />
      </div>
      <div className="user-container">
        <div style={divStyle} className="tier-image"></div>
        <div className="middle-text">
          <p><span style={{fontSize:'25px'}}>{userInfo.lol_id}</span>님의 총 피신고 건수는 <span style={{color:'red'}}>{userInfo.report_count}</span>회 입니다.</p>
          <p>이번달은 총 <span style={{color:'skyblue'}}>{stats.score_count}</span>회의 신고를 당하셨습니다.</p>
          <p>욕설 중 `{stats.category_name}`에 관한 욕설을 가장 많이 사용하셨습니다.</p>
        </div>
        <div className="left-pie-chart">
            <Doughnut data={userStatus} options={{color:'white'}}/>
        </div>
        <div className="right-pie-chart">
            <Doughnut data={userReport} options={{color:'white'}}/>
        </div>
      </div>
      <div className="chart-container">
        <div className="category-chart">
          <Doughnut data={abuseCntByCategory}  options={{color:'white'}}/>
        </div>
        <div>
          신고 목록
        </div>
      </div>
    </div>
  );
}

export default My;



