import React, { useEffect, useState } from 'react';
import * as Api from '../api.js';
import Header from './Header';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Statistics = () => {
  const [genderData, setGenderData] = useState([]); // 성별
  const [reportTierRatioData, setReportTierRatioData] = useState([]); // 티어별 신고 횟수
  const [abuseCntByCategoryData, setAbuseCntByCategoryData] = useState([]); // 신고된 카테고리 누적횟수
  const [userCntByMannerGradeData, setUserCntByMannerGradeData] = useState([]); // manner_grade 별 누적
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]); // 월별 신고 누적 횟수

  useEffect(() => {
    fetchReportTierRatioData();
    fetchReportCntByMonth();
    fetchAbuseCntByCategory();
    fetchUserCntByMannerGrade();
    fetchGenderData();
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
    labels: abuseCntByCategoryData.map(item => item.category_name),
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
        data: userCntByMannerGradeData.map(item => item.grade_count),
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
        data: reportCntByMonthData.map(item => item.report_count),
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

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1>통계 페이지</h1>
        성별
        <Pie data={genderRatio} />
        티어별 신고 횟수
        <Bar data={reportTierRatio} />
        카테고리별 신고 횟수
        <Bar data={abuseCntByCategory} />
        manner_grade 별 신고 횟수
        <Bar data={loluserCntByMannerGrade} />
        월별 신고 횟수
        <Pie data={reportCntByMonth} />
      </div>
    </div>
  );
};

export default Statistics;
