import React from 'react';
import Header from './Header';
import '../pages/css/About.css';

// export default function About() {
const About = () => {
  const logo = process.env.PUBLIC_URL + '/PECO.png';

  const chart1 = process.env.PUBLIC_URL + '/사이버 폭력 가해 경로.png';
  const chart2 = process.env.PUBLIC_URL + '/사이버 폭력 피해 경험.png';
  const chart3 =
    process.env.PUBLIC_URL + '/사이버폭력 피해 경험 후 무대응 이유.png';
  const chart5 = process.env.PUBLIC_URL + '/사이버 언어폭력 용인 태도.png';
  const chart6 =
    process.env.PUBLIC_URL + '/사이버 폭력 피해 경험 후 취한 행동.png';

  return (
    <>
      <Header />
      <div className='About-container'>
        <div className='About-logo'>
          <img className='logo-image' src={logo} alt='로고' draggable='false' />
        </div>
        <div className='tab-content'>
          <h3 style={{ marginTop: '3%', fontWeight: '800', fontSize: '40px' }}>
            PECO의 출발점
          </h3>
          <p className='about-text'>
            그동안 우리는 <br/>
            사이버 폭력의 심각성에 대한 공감대에 비해, <br/>
            소극적인 대응 방식의 비율이 지나치게 높았습니다.
          </p>
          <div className='About-image-container'>
            <img
              className='About-chart-image chart3'
              src={chart5}
              alt='사이버 언어폭력 용인 태도'
              draggable='false'
            />
            <img
              className='About-chart-image chart3'
              src={chart6}
              alt='사이버폭력 피해 경험 후 취한 행동'
              draggable='false'
            />
          </div>
          <h3 style={{ marginTop: '3%', fontWeight: '800', fontSize: '40px' }}>
             PECO의 실험
          </h3>
          <p className='about-text'>
            가장 많은 사람들이 사이버 폭력에 노출되는 <br/>
            <b>온라인 게임 상에서</b><br/>
            우리는 한 가지 실험을 해보려고 합니다.
          </p>
        <div className='About-chartimage-box'>
          <img
            className='chart-image'
            src={chart1}
            alt='사이버 폭력 가해 경로1'
            draggable='false'
          />

          <img
            className='chart-image'
            src={chart2}
            alt='사이버 폭력 가해 동기'
            draggable='false'
          />
        </div>
          <div className='about-text'>
            <div>
              <h3 style={{  marginTop: '3%', fontWeight: '800', fontSize: '40px' }}>
                PECO의 질문
              </h3>
              <p className='about-text'>
                '별일 아니라고 생각해서' 라는 당신의 응답처럼, <br/>
                <b>정말 별일 아니라고 생각했나요?</b> <br/>
                이런 일들이 너무 흔하다고 생각해서 그냥 넘겨버린 건 아닌가요? <br/>

              </p>
              <img
                className='chart-image chart3'
                src={chart3}
                alt='사이버폭력 피해 경험 후 무대응 이유'
                draggable='false'
              />
            </div>
          </div>

          <h3 style={{ fontSize: '40px', fontWeight: '800' }}>PECO의 제안</h3>
          <p className='about-text'>
            <b>"제보해주세요"</b> <br/>
            다른 사람들과 미래의 여러분들을 위해<br/><br/>
            
            <b>"검색하세요"</b> <br/>
            여러분들의 안녕을 위해 <br/>
            그리고, 자신을 되돌아 보기 위해 <br/><br/>

            우리가 뱉은 단어들을 모아두는 쓰레기 통이 되고자 합니다. <br/>
            더이상 이곳에 던져지는 단어들이 없을 그날까지 <br/>
            <b>"모으고, 분석하겠습니다"</b>
          </p>
        </div>
        <div>
          <a href='https://ecrm.police.go.kr/minwon/main' className='doum'>도움이 필요하다면 언제든 이 링크를 통해 도움을 요청하세요</a>
        </div>
      </div>
    </>
  );
};

export default About;
