import Header from './Header';
import {useNavigate} from 'react-router-dom';
import './css/Report.css'
import { FloatingLabel, Form} from 'react-bootstrap';
import _DatePicker from '../components/_DatePicker';
import FileUpload from '../components/FileUpload';

export default function Report () {
    const 진 = process.env.PUBLIC_URL + '/진.png';

    const divStyle = {
        backgroundImage: `url(${진})`,
        backgroundSize: `100% 100%`,
        backgroundPosition: 'lefr',
        height: '100vh',
        width: `50%`,
    };

    const navigate = useNavigate();

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
                            <Form.Control type="nickname" placeholder="nickname" />
                        </FloatingLabel>
                        </div>
                        <div className='col'>
                            <_DatePicker/>
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
                        />
                    </FloatingLabel>
                    <FileUpload/>
                    <div className="container button-box">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button className="button">제출</button>
                            </div>
                            <div className="col-auto">
                                <button className="button cancel">취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}