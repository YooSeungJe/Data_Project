import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../pages/css/About.css';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';

// export default function About() {
const About = () => {
  const logo = process.env.PUBLIC_URL + '/PECO.png';

  const [genderRatioData, setGenderRatioData] = useState([]);
  const [reportTierRatioData, setReportTierRatioData] = useState([]);
  const [reportCntByMonthData, setReportCntByMonthData] = useState([]);
  const [reportLoluserTopTenData, setReportLoluserTopTenData] = useState([]);

  useEffect(() => {
    fetchGenderRatio();
    fetchReportTierRatio();
    fetchReportCntByMonth();
    fetchReportLoluserTopTen();
  }, []);

  const fetchGenderRatio = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/genderRatio'
      );
      const genderRatioData = response.data;
      setGenderRatioData(genderRatioData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportTierRatio = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/reportTierRatio'
      );
      const ReportTierRatio = response.data;
      setReportTierRatioData(ReportTierRatio);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportCntByMonth = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/reportCntByMonth'
      );
      const ReportCntByMonth = response.data;
      setReportCntByMonthData(ReportCntByMonth);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportLoluserTopTen = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/stats/reportLoluserTopTen'
      );
      const ReportLoluserTopTen = response.data;
      setReportLoluserTopTenData(ReportLoluserTopTen);
    } catch (error) {
      console.log(error);
    }
  };

  const reportCntByMonth = {
    labels: genderRatioData.map(item => item.month),
    datasets: [
      {
        data: genderRatioData.map(item => item.report_count),
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
    <>
      <Header />
      <div className='About-container'>
        <div className='logo'>
          <img className='logo-image' src={logo} alt='로고' />
        </div>
        <div className='tab-content'>
          <h3>위험성</h3>
          <p className='about-text'>
            사이버 언어폭력 신고 및 통계 서비스 PECO는 사이버 언어폭력에
            대응하기 위해 개발된 온라인 서비스입니다. 현대 사회에서는 물리적인
            자연과 사회 환경에 노출되는 것과 마찬가지로 사이버 환경에도 노출되고
            있습니다. 그러나 사이버 환경은 다양한 폭력으로 오염되어 있습니다.
            특히, 사이버 언어폭력은 가장 높은 비율로 발생하며, 사이버 폭력
            가해의 경로 중에서도 온라인 게임이 가장 높은 비율을 차지합니다.
            PECO는 이러한 문제에 대응하기 위해 다음과 같은 기능을 제공합니다:
            <Bar data={reportCntByMonth} />
          </p>

          <h3>PECO의 기능</h3>
          <div className='about-list'>
            <li>온라인 게임 상에서 발생한 욕설에 대한 신고와 검색 서비스</li>
            <li>통계 제공</li>
          </div>
          <h3>PECO의 혜택</h3>
          <div className='about-list'>
            <li>사이버 언어폭력 대응 방법 습득</li>
            <li>안전한 온라인 환경 조성</li>
            <li>사이버 언어폭력 통계 제공</li>
          </div>

          <Pie data={reportTierRatioData} />

          <h3>PECO의 목표</h3>
          <p className='about-text'>
            PECO는 피해자들에게 적극적인 대응 방식을 제공하여 기존의 소극적인
            대응 방식을 극복하고자 합니다. 또한, 통계 자료를 통해 개인 및 단체
            차원에서 사이버 언어폭력 문제를 인식하고 대응할 수 있도록 돕습니다.
            PECO는 사이버 언어폭력에 대한 인식과 대응의 중요성을 알리고, 문제의
            심각성을 인지하는 사회적인 변화를 이끌어내기 위해 개발되었습니다.
            PECO는 사용자들이 온라인에서 안전하게 소통하고 사이버
            언어폭력으로부터 자신을 보호할 수 있는 도구를 제공합니다. 더 나아가,
            이 프로젝트를 통해 사회적인 변화를 이끌어내고 사이버 환경에서 상호
            존중과 책임을 바탕으로 한 건전한 온라인 문화를 조성하기 위한 노력을
            기울이고자 합니다.
          </p>

          <Pie data={reportCntByMonthData} />

          <Pie data={reportLoluserTopTenData} />
        </div>
      </div>
    </>
  );
};

export default About;
