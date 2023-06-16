import React, { useEffect, useState } from 'react';
import * as Api from '../api.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './css/Statics.css';
import { IoArrowDownSharp } from 'react-icons/io5';
import Header from './Header';
const Statistics = () => {
  const [genderData, setGenderData] = useState([]); // 성별
  const [reportTierRatioData, setReportTierRatioData] = useState([]); // 티어별 신고 횟수
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userCntByMannerGradeData, setUserCntByMannerGradeData] = useState([]); // manner_grade 별 누적
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]); // 월별 신고 누적 횟수
  const [reportCntByTimeData, setReportCntByTimeData] = useState([]); // 시간대 별 욕설 당한 횟수
  const [userTotalCnt, setUserTotalCnt] = useState([]);
  const [reportTotal, setReportTotal] = useState([]);
  const [top10, setTop10] = useState([]);
  const [showTop10, setShowTop10] = useState(false);
  useEffect(() => {
    fetchReportTierRatioData();
    fetchReportCntByMonth();
    fetchAbuseCntByCategory();
    fetchUserCntByMannerGrade();
    fetchGenderData();
    fetchreportCntByTimeData();
    fetchUserTotalCnt();
    fetchReportTotalCnt();
    fetchTop10();
  }, []);

  // 성별
  const fetchGenderData = async () => {
    try {
      const response = await Api.get('/stats/genderRatio');
      const genderRatioData = response;
      setGenderData(genderRatioData);
    } catch (error) {
      console.error(error);
    }
  };

  const genderRatio = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderData, 100 - genderData],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // 티어별 신고 횟수
  const fetchReportTierRatioData = async () => {
    try {
      const response = await Api.get('/stats/reportTierRatio');
      const reportTierRatio = response;
      setReportTierRatioData(reportTierRatio);
    } catch (error) {
      console.error(error);
    }
  };

  const reportTierRatio = {
    labels: reportTierRatioData.map(item => item.tier),
    datasets: [
      {
        label: '신고 횟수',
        data: reportTierRatioData.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // 카테고리별 누적 횟수
  const fetchAbuseCntByCategory = async () => {
    try {
      const response = await Api.get('/stats/abuseCntByCategory');
      const abuseCntByCategory = response;
      setAbuseCntByCategoryData(abuseCntByCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const abuseCntByCategory = {
    labels: abuseCntByCategoryData.map(item => item.categoryName),
    datasets: [
      {
        label: '욕설 횟수',
        data: abuseCntByCategoryData.map(item => item.count),
        backgroundColor: [
          '#DAD9FF',
          '#003399',
          '#4C4C4C',
          '#F6F6F6',
          '#005766',
          '#3F0099',
          '#6B66FF',
        ],
        borderColor: [
          '#DAD9FF',
          '#003399',
          '#4C4C4C',
          '#F6F6F6',
          '#005766',
          '#3F0099',
          '#6B66FF',
        ],
        borderDash: [0],
      },
    ],
  };

  // manner_grade별 누적 횟수
  const fetchUserCntByMannerGrade = async () => {
    try {
      const response = await Api.get('/stats/loluserCntByMannerGrade');
      const loluserCntByMannerGrade = response;
      setUserCntByMannerGradeData(loluserCntByMannerGrade);
    } catch (error) {
      console.error(error);
    }
  };

  const loluserCntByMannerGrade = {
    labels: userCntByMannerGradeData.map(item => item.manner_grade),
    datasets: [
      {
        label: '유저 수',
        data: userCntByMannerGradeData.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // 월별 신고 누적 횟수
  const fetchReportCntByMonth = async () => {
    try {
      const response = await Api.get('/stats/reportCntByMonth');
      const reportCntByMonth = response;
      setReportCntByMonthData(reportCntByMonth);
    } catch (error) {
      console.error(error);
    }
  };

  // 월별 신고 누적 횟수
  const reportCntByMonth = {
    labels: reportCntByMonthData.map(item => item.month),
    datasets: [
      {
        label: '신고건수',
        data: reportCntByMonthData.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8C65D3',
          '#FF9F40',
          '#4BC0C0',
          '#E7E9ED',
          '#A9DFBF',
          '#F5A9BC',
          '#D7DF01',
          '#298A08',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8C65D3',
          '#FF9F40',
          '#4BC0C0',
          '#E7E9ED',
          '#A9DFBF',
          '#F5A9BC',
          '#D7DF01',
          '#298A08',
        ],
      },
    ],
  };

  // 시간대 별 욕설 당한 횟수
  // 티어별 신고 횟수
  const fetchreportCntByTimeData = async () => {
    try {
      const response = await Api.get('/stats/reportCntByTime');
      const reportCntByTime = response;
      setReportCntByTimeData(reportCntByTime);
    } catch (error) {
      console.error(error);
    }
  };

  const reportCntByTime = {
    labels: reportCntByTimeData.map(item => item.hourRange),
    datasets: [
      {
        label: '신고 건수',
        data: reportCntByTimeData.map(item => item.count),
        backgroundColor: [
          '#DAD9FF',
          '#003399',
          '#4C4C4C',
          '#F6F6F6',
          '#005766',
          '#3F0099',
          '#6B66FF',
        ],
        borderColor: [
          '#DAD9FF',
          '#003399',
          '#4C4C4C',
          '#F6F6F6',
          '#005766',
          '#3F0099',
          '#6B66FF',
        ],
        borderDash: [0],
      },
    ],
  };

  //총이용자수
  const fetchUserTotalCnt = async () => {
    try {
      const response = await Api.get('/stats/userTotalCnt');
      const userTotal = response;
      setUserTotalCnt(userTotal);
    } catch (error) {
      console.error(error);
    }
  };

  //총신고수
  const fetchReportTotalCnt = async () => {
    try {
      const response = await Api.get('/stats/reportTotalCnt');
      setReportTotal(response);
    } catch (error) {
      console.error(error);
    }
  };

  //top10 욕쟁이
  const fetchTop10 = async () => {
    try {
      const response = await Api.get('/stats/reportLoluserTopTen');
      setTop10(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTop10 = () => {
    setShowTop10(!showTop10);
  };

  return (
    <div className='parent-container'>
      <div className='chart-back'>
        <div>
          <Header />
        </div>
        <div
          className='total-static'>
          <div style={{ margin: 'auto', fontSize: '30px', fontWeight: 'bold' }}>
            총 가입자수:{' '}
            <span
              style={{
                fontWeight: 'bolder',
                fontSize: '32px',
                color: '#6B66FF',
              }}
            >
              {userTotalCnt}
            </span>
            <span style={{ marginLeft: '150px' }}>
              전체 신고건수 :{' '}
              <span
                style={{
                  fontWeight: 'bolder',
                  fontSize: '32px',
                  color: '#F15F5F',
                }}
              >
                {reportTotal}
              </span>
            </span>
          </div>
          <div>
            <button onClick={handleToggleTop10} className='top-button'>TOP10 <IoArrowDownSharp/> </button>
          </div>
        </div>
        {showTop10 && (
          <div className='top10-abuser'>
            {top10.map((user, index) => {
              return (
                <div
                  className='abuser-list'
                  key={index}
                >
                  <p>{index + 1}. {user.attackerId}</p>
                </div>
              );
            })}
          </div>
        )}
        <div className='pie-chart-back'>
          <div className='static-pie-chart'>
            <h4 className='pie-left-title'>카테고리별</h4>
            <Pie data={abuseCntByCategory} />
          </div>
          <div className='static-pie-chart'>
            <h4 className='pie-right-title'>시간대별</h4>
            <Pie data={reportCntByTime} />
          </div>
        </div>
        <div>
          <div className='line-back'>
            <h4 className='line-title'>월별 욕설추이</h4>
            <Line data={reportCntByMonth} />
          </div>
        </div>
        <div className='bar-back'>
          <div className='left-bar-back'>
            <h4 className='bar-title'>티어별 신고 건수</h4>
            <Bar data={reportTierRatio} />
          </div>
          <div className='right-bar-back'>
          <h4 className='bar-title'>Manner-grade별 유저 수</h4>
            <Bar data={loluserCntByMannerGrade} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
