import React, { useState, useEffect, useCallback } from "react";
import * as Api from '../api.js'
import Header from './Header';
import './css/My.css';
import { Doughnut } from 'react-chartjs-2';
import buttonStyles from './css/Button.module.css';

function My() {
  const [userInfo, setUserInfo] = useState('');
  const [stats, setStats] = useState('');
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userStatusData, setUserStatusData] = useState([]);
  const [userReportedData, setUserReportedData] = useState([]);
  const [userReportingData, setUserReportingData] = useState([]);
  const [userReportList, setUserReportList] = useState([]);

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, SetSort] = useState('new');
  const [statusPage, SetStatusPage] = useState('all');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response1 = await Api.get('/lolUser/my');
          setUserInfo(response1);
          const response2 = await Api.get(`/stats/basic/${response1.lol_id}`);
          setStats(response2);
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
        const response3 = await Api.get(`/stats/userReportedByCategory/${emailId}`);
        setAbuseCntByCategoryData(response3);
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
          const response4 = await Api.get(`/stats/userReportCntByStatus/${emailId}`);
          setUserStatusData(response4);
        }
      } catch (error) {
        console.error(error);
      }
    };
      fetchUserReportedByStatus();
  }, []);

  const statusLabels = userStatusData.map(item => {
    switch (item.status) {
      case 'rejected':
        return '반려';
      case 'completed':
        return '승인';
      case 'pending':
        return '대기중';
      default:
        return '';
    }
  });

  const userStatus = {
    labels: statusLabels,
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
          const response5 = await Api.get(`/stats/userReportCnt/${emailId}`);
          setUserReportedData(response5.userReportedCnt);
          setUserReportingData(response5.userReportingCnt);
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
// report 목록 가져오기 + 페이지네이션
  const fetchMyReportList = useCallback(async ()=>{
     const response = await Api.get(`/report/my?sort=${sort}&status=${statusPage}&currentPage=${currentPage}`)
     setUserReportList(response.data);
     setTotalPage(response.totalPages);
   }, [sort, statusPage, currentPage])

  useEffect(()=>{
    fetchMyReportList();
  }, [fetchMyReportList, sort, statusPage, currentPage])

  const statusList = ['pending', 'completed', 'rejected', 'all'];
  const sortList = ['old', 'new'];
  const pageNumbers = [];
    for(let i = 0; i < totalPage; i++) {
      pageNumbers.push(i);
    }
  
  const handleClickDetail = async (report) => {
    const reportId = report.id;
    const response = await Api.get(`/admin/report/${reportId}`)
    console.log(response);
  }
// 사진 파일
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
        <div className="reports-container">
        <div className='radio-container'>
          <div className="status-container">
            {statusList.map((stat, index) => (
            <div key={index}>
              <input type="radio" id={`radio${index}`} name="radioGroup1" value={stat} onClick={()=>{SetStatusPage(stat)}}/>
              <label for={`radio${index}`}>{stat}</label>
            </div>
            ))}
          </div>
          <div className="sort-container">
            {sortList.map((sort, index) => (
            <div key={index}>
              <input type="radio" id={`radio${index}`} name="radioGroup2" value={sort} onClick={()=>{SetSort(sort)}}/>
              <label for={`radio${index}`}>{sort}</label>
            </div>
            ))}
          </div>
        </div>
          {userReportList.map((userReport)=>{
            return (
              <div key={userReport.id} className='report-card'>
              <div key={userReport.id*100} className='report-card-content'>
                <h2>욕한 놈: {userReport.attacker_id}</h2>
                <h3>등록일: {userReport.created_at}</h3>
              </div>
                <button className='status-button'>{userReport.status.charAt()}</button>
                <button className={buttonStyles.button} onClick={()=>(handleClickDetail(userReport))}>
                  <span className={buttonStyles.button_top}>상세 보기</span>
                </button>
              </div>
            )
          })}
          <div className='page-number'>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>이전</button>
                {pageNumbers.map(number =>(<button key={number} onClick={() => setCurrentPage(number)} style={{ backgroundColor: number === currentPage ? 'blue' : 'white' }}>{number+1}</button>))}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My;



