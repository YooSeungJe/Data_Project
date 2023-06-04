import './css/Login.css'
import {useNavigate} from 'react-router-dom'


function Login() {

    const 징크스 = process.env.PUBLIC_URL + '/징크스.jpg';

    const divStyle = {
      backgroundImage: `url(${징크스})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    };

    const navigate = useNavigate();


    return(
        <div style={divStyle}>
            <div  className="login-form">
                <div className='login-home'>
                    <p onClick={()=>{navigate('/')}}>PECO</p>
                </div>
                <div className='login-title'>
                    <p>로그인</p>
                </div>
                <div className='login-box'>
                    <div class="user-box">
                        <input type="text" name="" required="" />
                        <label>아이디</label>
                    </div>
                    <div class="user-box">
                        <input type="password" name="" required="" />
                        <label>비밀번호</label>
                    </div><center>
                    <a href="#">
                        Login
                    <span></span>
                    </a></center>
                </div>
            </div>
        </div>
    )
}

export default Login