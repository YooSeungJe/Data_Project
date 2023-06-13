import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header';
import './css/My.css';
import { Bar, Pie } from 'react-chartjs-2';

function My() {
  const [userInfo, setUserInfo] = useState('');
  const [stats, setStats] = useState('');
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userStatusData, setUserStatusData] = useState([]);
  const [userReportData, setUserReportData] = useState([]);


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
        backgroundColor: '#4641D9',
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
    labels: userStatusData.map(item => item.status),
    datasets: [
      {
        label:'건수',
        data: userStatusData.map(item=> item.count),
        backgroundColor:['lightblue','#FF6C6C'],
        borderColor:['lightblue','#FF6C6C'],
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
          setUserReportData(response5.data.userReportedCnt);
        }
      } catch (error) {
        console.error(error);
      }
    };
      fetchUserReport();
  }, []);


  const userReport = {
    datasets: [
      {
        label:'건수',
        data: [userReportData],
        backgroundColor:['rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)'],
        borderColor:['rgba(54, 162, 235, 1)','rgba(255, 99, 132, 1)'],
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
    <div>
      <div>
        <Header />
      </div>
      <div className="user-container">
        {/* <div className="row my-user">
          <div className="col-12 col-lg-2 user-left">
            <p style={divStyle}></p>
          </div>
          <div className="col-12 col-lg-4 user-middle">
            <p><span style={{fontSize:'25px'}}>{userInfo.lol_id}</span>님의 총 피신고 건수는 <span style={{color:'red'}}>{userInfo.report_count}</span>회 입니다.</p>
            <p>이번달은 총 <span style={{color:'blue'}}>{stats.score_count}</span>회의 신고를 당하셨습니다.</p>
            <p>욕설 중 `{stats.category_name}`에 관한 욕설을 가장 많이 사용하셨습니다.</p>
          </div>
          <div className="col-12 col-lg-3">
            <Pie data={userStatus} style={{height:'100px'}}/>
          </div>
          <div className="col-12 col-lg-3">
            <Pie data={userStatus} style={{height:'100px'}}/>
          </div>
          <div className="col-12 col-lg-5">
            <Bar data={abuseCntByCategory} style={{height:'180px', width:'400px'}}/>
          </div>
          <div className="col-12 col-lg-7">
            d
          </div>
        </div> */}
        <div style={divStyle} className="tier-image"></div>
        <div className="middle-text">
          <p><span style={{fontSize:'25px'}}>{userInfo.lol_id}</span>님의 총 피신고 건수는 <span style={{color:'red'}}>{userInfo.report_count}</span>회 입니다.</p>
          <p>이번달은 총 <span style={{color:'blue'}}>{stats.score_count}</span>회의 신고를 당하셨습니다.</p>
          <p>욕설 중 `{stats.category_name}`에 관한 욕설을 가장 많이 사용하셨습니다.</p>
        </div>
        <div className="pie-chart">
            <Pie data={userStatus} />
        </div>
        <div className="pie-chart">
            <Pie data={userStatus}/>
        </div>
      </div>
      <div className="chart-container">
        <div>
          <Bar data={abuseCntByCategory}/>
        </div>
        <div>
          d
        </div>
      </div>
    </div>
  );
}

export default My;

