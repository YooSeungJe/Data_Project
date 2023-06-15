import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import './css/Detail.css';
import * as Api from '../api.js'
import { Doughnut } from 'react-chartjs-2';

function Detail() {

    const { id } = useParams();
    const [lolUser, setLolUser] = useState('');
    const [statsMain, setStatsMain] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    useEffect(() => {
        const fetchLolUser = async () => {
            if (id.trim() !== '') {
                try {
                    const response1 = await Api.get(`/lolUser/${id}`);
                    const response2 = await Api.get(`/stats/basic/${id}`);

                    setLolUser(response1);
                    setStatsMain(response2);
                } catch(error) {
                    console.log('error', error);
                }
            }
        };
        fetchLolUser();
    }, []);

    
    useEffect(() => {
        const fetchReportedByCategory = async () => {

        if (id.trim() !== '') {
            const response3 = await Api.get(`/stats/searchLolUserReportCntByCategory/${id}`);
            setCategoryData(response3.searchLolUserReportCntByCategory);
        }
        } 
        fetchReportedByCategory();
    }, []);
    
    const abuseCntByCategory = {
        labels: categoryData.map(item => item.categoryName),
        datasets: [
          {
            label: '욕설 횟수',
            data: categoryData.map(item => item.count),
            backgroundColor: ['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF'],
            borderColor:['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF'],
            borderDash:[0],
          },
        ],
      };

    useEffect(() => {
        const fetchUserReportedByTime = async () => {

        if (id.trim() !== '') {
            const response = await Api.get(`/stats/reportCntByTimeByLolId/${id}`);
            setTimeData(response);
        }
        } 
        fetchUserReportedByTime();
    }, []);
    
    const abuseUserCntByTime = {
        labels: timeData.map(item => item.hourRange),
        datasets: [
          {
            label: '욕설 횟수',
            data: timeData.map(item => item.count),
            backgroundColor: ['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF','#FFD9EC','#FAE0D4','#D1B2FF','#CEF279','#FAF4C0'],
            borderColor:['#DAD9FF','#003399','#4C4C4C','#F6F6F6','#005766','#3F0099','#6B66FF','#FFD9EC','#FAE0D4','#D1B2FF','#CEF279','#FAF4C0'],
            borderDash:[0],
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
        lolUser && lolUser.manner_grade === 'bronze'
        ? `url(${bronze_tier})`
        : lolUser && lolUser.manner_grade === 'silver'
        ? `url(${silver_tier})` // 수정: 중괄호 오류 수정
        : lolUser && lolUser.manner_grade === 'gold'
        ? `url(${gold_tier})`
        : lolUser && lolUser.manner_grade === 'gentle' // 수정: 'Gentle' 대소문자 구분 수정
        ? `url(${gentle_tier})`
        : '',
    };

    return(
        <div className="my-back">
            <div>
                <Header/>
            </div>
            <div className="user-container">
                <div style={divStyle} className="tier-image"></div>
                <div className="middle-text">
                    <p><span style={{fontSize:'25px'}}>{id}</span>님은 총 <span style={{color:'red'}}>{lolUser.report_count}</span>회의 욕설을 하였습니다.</p>
                    <p>이번달은 <span style={{color:'skyblue'}}>{statsMain.score_count}</span>회의 욕설을 하였습니다.</p>
                    <p>욕설 중 `{statsMain.category_name}`에 관한 욕설을 가장 많이 사용하셨습니다.</p>
                </div>
                <div className="lol-info">
                    <p className="user-tier">LoL 티어 : {lolUser.tier}</p>
                    <span className="user-win"><span style={{color:'red'}}>승</span>: {lolUser.wins ? lolUser.wins : 0}</span>
                    <span className="user-lose"><span style={{color:'skyblue'}}>패</span>: {lolUser.losses ? lolUser.losses : 0}</span>
                </div>
            </div>
            <div className='detail-chart-container'>
                <div className="detail-category-chart">
                    <Doughnut data={abuseCntByCategory}  options={{color:'white'}}/>
                </div>
                <div className="detail-time-chart">
                    <Doughnut data={abuseUserCntByTime}  options={{color:'white'}}/>
                </div>
            </div>
        </div>
    )
}

export default Detail

