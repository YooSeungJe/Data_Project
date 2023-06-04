import './css/Register.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Register() {

    const 징크스 = process.env.PUBLIC_URL + '/징크스.jpg';

    const divStyle = {
      backgroundImage: `url(${징크스})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    };

    const navigate = useNavigate();

    const [isAgreed, setIsAgreed] = useState(true);

    const handleAgreeChange = (event) => {
      setIsAgreed(event.target.checked);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // 약관 동의 처리 로직 작성
    };

    return(
        <div style={divStyle}>
            <div className='register-form'>
                <div className='register-home'>
                    <p onClick={()=>{navigate('/')}}>PECO</p>
                </div>
                <div className='register-title'>
                    <p>회원가입</p>
                </div>
                <div className='register-box'>
                    <div class="user-box">
                        <input type="text" name="" required="" />
                        <label>아이디</label>
                    </div>
                    <div class="user-box">
                        <input type="password" name="" required="" />
                        <label>비밀번호</label>
                    </div>
                    
                    <div class="user-box">
                        <input type="text" name="" required="" />
                        <label>LOL 닉네임</label>
                    </div><center>

                    <div className='sex'>
                        <p>남자<input type='radio'  id="male" name="gender" value="male"></input></p>
                        <p style={{marginLeft:'30px'}}>여자<input type='radio'  id="female" name="gender" value="female"></input></p>
                    </div>


                    <a href="#">
                        Register
                    <span></span>
                    </a></center>
                </div>
            </div>
        </div>
    )
}

export default Register