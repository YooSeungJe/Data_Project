import Header from './Header';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './css/Report.css'
import { FloatingLabel, Form} from 'react-bootstrap';
import _DatePicker from '../components/_DatePicker';
import FileUpload from '../components/FileUpload';

import * as Api from '../api.js'

export default function Report () {
    const 진 = process.env.PUBLIC_URL + '/진.png';

    const divStyle = {
        backgroundImage: `url(${진})`,
        backgroundSize: `100% 100%`,
        backgroundPosition: 'left',
        height: '100vh',
        width: `50%`,
    };

    const[attackerId, setAttackerId] = useState('');
    const[content, setContent] = useState('');
    const[violenceAt, setViolenceAt] = useState('');

    const handleDateChange = (date) => {
        setViolenceAt(date);
    }

    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 버블링과 이벤트 캡처링을 방지하는 역할이라고 함

        const data = {
            userId : 'elice5', // userId도 구현하기
            attackerId,
            content,
            violenceAt,
        }

        try {
            const response = await Api.post('/report/register', data);
            console.log(response.data);
          } catch (error) {
            console.error('POST request failed', error);
          }
    }

    return (
        <>
            <Header/>
            <div className='report-page'>
                <div style={divStyle}/>
                <div className='report-container'>
                    <h2 className='singo'> 신 고 </h2>
                    <div className = 'contatiner'>
                        <div className='row'>
                        <div className="col">
                        <FloatingLabel
                            controlId="offender_nickname"
                            label="욕한 놈 닉네임"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="nickname" 
                                placeholder="nickname"
                                value={attackerId}
                                onChange={(e) => setAttackerId(e.target.value)}
                            />
                        </FloatingLabel>
                        </div>
                        <div className='col'>
                            <_DatePicker date={violenceAt} onDateChange={handleDateChange}/>
                        </div>
                        </div>
                    </div>
                    <FloatingLabel 
                        controlId="offense_content" 
                        label="욕설 내용"
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Write down the swear words here"
                            style={{ height: '100px' }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FloatingLabel>
                    <FileUpload/>
                    <div className="container button-box">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button className="button" onClick={handleClick}>제출</button>
                            </div>
                            <div className="col-auto">
                                <button className="button cancel" onClick ={() => {navigate('/')}}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// FileUpload 를 통해서 사진을 받아오는 건 아직 구현 X
