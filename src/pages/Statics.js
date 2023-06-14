import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';

const Statistics = () => {
  const [reportTierRatioData, setReportTierRatioData] = useState([]);
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]);
  const [reportLoluserTopTenData, setReportLoluserTopTenData] = useState([]);

  useEffect(() => {
    fetchReportTierRatioData();
    fetchReportCntByMonth();
    fetchReportLoluserTopTen();
  }, []);

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

  const fetchReportLoluserTopTen = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/reportLoluserTopTen'
      );
      const reportLoluserTopTen = response.data;
      setReportLoluserTopTenData(reportLoluserTopTen);
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

  const reportLoluserTopTen = {
    labels: reportLoluserTopTenData.map(item => item.month),
    datasets: [
      {
        data: reportLoluserTopTenData.map(item => item.report_count),
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
      <h1>통계 페이지</h1>
      <div>
        <Bar data={reportTierRatio} />
      </div>
      <div>
        <Pie data={reportCntByMonth} />
      </div>
      <div>
        <Pie data={reportLoluserTopTen} />
      </div>
    </div>
  );
};

export default Statistics;
