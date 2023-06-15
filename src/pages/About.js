import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../pages/css/About.css';
import axios from 'axios';

// export default function About() {
const About = () => {
  const logo = process.env.PUBLIC_URL + '/PECO.png';

  const chart1 = process.env.PUBLIC_URL + '/사이버 폭력 가해 경로.png';
  const chart2 = process.env.PUBLIC_URL + '/사이버 폭력 피해 경험.png';
  const chart3 =
    process.env.PUBLIC_URL + '/사이버폭력 피해 경험 후 무대응 이유.png';
  const chart4 =
    process.env.PUBLIC_URL + '/사이버폭력 피해 발생 시 법적 처벌 인지 여부.png';

  return (
    <>
      <Header />
      <div className='About-container'>
        <div className='logo'>
          <img className='logo-image' src={logo} alt='로고' />
        </div>
        <div className='tab-content'>
          <h3>프로그램 소개</h3>
          <p className='about-text'>
            사이버 언어폭력 신고 및 통계 서비스 PECO는 사이버 언어폭력에
            대응하기 위해 개발된 온라인 서비스입니다. 현대 사회에서는 물리적인
            자연과 사회 환경에 노출되는 것과 마찬가지로 사이버 환경에도 노출되고
            있습니다. 그러나 사이버 환경은 다양한 폭력으로 오염되어 있습니다.
            특히, 사이버 언어폭력은 가장 높은 비율로 발생하며, 사이버 폭력
            가해의 경로 중에서도 온라인 게임이 가장 높은 비율을 차지합니다.
            PECO는 이러한 문제에 대응하기 위해 다음과 같은 기능을 제공합니다:
          </p>

          <img
            className='chart-image'
            src={chart1}
            alt='사이버 폭력 가해 경로1'
          />

          <img
            className='chart-image'
            src={chart2}
            alt='사이버 폭력 가해 동기'
          />

          <div className='about-text'>
            <div className='function-benefit'>
              <div>
                <h3>PECO의 기능</h3>
                <ul className='function-list'>
                  <li>
                    1. 온라인 게임 상에서 발생한 욕설에 대한 신고와 검색 서비스
                  </li>
                  <li>2. 통계 제공</li>
                </ul>
                <img
                  className='chart-image chart3'
                  src={chart3}
                  alt='사이버폭력 피해 경험 후 무대응 이유'
                />
              </div>
              <div>
                <h3>PECO의 혜택</h3>
                <ul className='benefit-list'>
                  <li>1. 사이버 언어폭력 대응 방법 습득</li>
                  <li>2. 안전한 온라인 환경 조성</li>
                  <li>3. 사이버 언어폭력 통계 제공</li>
                </ul>
                <img
                  className='chart-image chart3'
                  src={chart4}
                  alt='사이버폭력 피해 발생 시 법적 처벌 인지 여부'
                />
              </div>
            </div>
          </div>

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
        </div>
      </div>
      );
    </>
  );
};

export default About;
