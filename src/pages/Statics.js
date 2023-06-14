import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Header from './Header';
const Statistics = () => {
  const [genderData, setGenderData] = useState([]); // 성별
  const [reportTierRatioData, setReportTierRatioData] = useState([]); // 티어별 신고 횟수
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userCntByMannerGradeData, setUserCntByMannerGradeData] = useState([]); // manner_grade 별 누적
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]); // 월별 신고 누적 횟수
  const [reportCntByTimeData, setReportCntByTimeData] = useState([]); // 시간대 별 욕설 당한 횟수

  useEffect(() => {
    fetchReportTierRatioData();
    fetchReportCntByMonth();
    fetchAbuseCntByCategory();
    fetchUserCntByMannerGrade();
    fetchGenderData();
    fetchreportCntByTimeData();
  }, []);

  // 성별
  const fetchGenderData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/genderRatio'
      );
      const genderRatioData = response.data;
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
      const response = await axios.get(
        'http://localhost:3001/stats/reportTierRatio'
      );
      const reportTierRatio = response.data;
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
      const response = await axios.get(
        'http://localhost:3001/stats/abuseCntByCategory'
      );
      const abuseCntByCategory = response.data;
      setAbuseCntByCategoryData(abuseCntByCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const abuseCntByCategory = {
    labels: abuseCntByCategoryData.map(item => item.categoryName),
    datasets: [
      {
        label: '신고 횟수',
        data: abuseCntByCategoryData.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // manner_grade별 누적 횟수
  const fetchUserCntByMannerGrade = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/loluserCntByMannerGrade'
      );
      const loluserCntByMannerGrade = response.data;
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
      const response = await axios.get(
        'http://localhost:3001/stats/reportCntByMonth'
      );
      const reportCntByMonth = response.data;
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
      const response = await axios.get(
        'http://localhost:3001/stats/reportCntByTime'
      );
      const reportCntByTime = response.data;
      setReportCntByTimeData(reportCntByTime);
    } catch (error) {
      console.error(error);
    }
  };

  const reportCntByTime = {
    labels: reportCntByTimeData.map(item => item.hourRange),
    datasets: [
      {
        label: '신고 횟수',
        data: reportCntByTimeData.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="my-back">
      <div>
        <Header/>
      </div>
      <div style={{display:'flex'}}>
        <div style={{width:'25%'}}>
          <Bar data={reportTierRatio} />
        </div>
        <div style={{width:'25%'}}>
          <Bar data={abuseCntByCategory} />
        </div>
        <div style={{width:'25%'}}>
          <Bar data={loluserCntByMannerGrade} />
        </div>
        <div style={{width:'25%'}}>
          <Bar data={reportCntByTime} />
        </div>
      </div>
      <div style={{display:'flex'}}>
        <div style={{width:'50%'}}>
          <Pie data={reportCntByMonth} />
        </div>
        <div style={{width:'50%'}}>
          <Pie data={genderRatio} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;


