import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, } from 'react-chartjs-2';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Chart from 'chart.js/auto';

const data = [
  {
    name: "06/03",
    접수량: 300,
    amt: 2400
  },
  {
    name: "06/04",
    접수량: 250,
    amt: 2210
  },
  {
    name: "06/05",
    접수량: 360,
    amt: 2290
  },
  {
    name: "06/06",
    접수량: 200,
    amt: 2000
  },
  {
    name: "06/07",
    접수량: 190,
    amt: 2181
  },
  {
    name: "06/08",
    접수량: 290,
    amt: 2500
  },
  {
    name: "06/09",
    접수량: 400,
    amt: 2100
  }
];

const Statistics = () => {
  const [reportTierRatioData, setReportTierRatioData] = useState([]);
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]);

  useEffect(() => {
    fetchReportTierRatioData();
    fetchReportCntByMonth();
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

  return (
    <div>
      <h1>통계 페이지</h1>
      <div className='row'>
        <div className='col-6'>
          <Bar data={reportTierRatio} />
          <Pie data={reportCntByMonth} />
        </div>
        <div className='col-6' style={{marginTop:'5%'}}>
          <ResponsiveContainer width='100%' aspect={4.0/1.5}>
            <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="접수량" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='row' style={{marginTop:'-40%'}}>
        <div className='col-6'>
          <Bar data={reportTierRatio} />
          <Pie data={reportCntByMonth} />
        </div>
        <div className='col-6'>
          <Bar data={reportTierRatio} />
          <Pie data={reportCntByMonth} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
