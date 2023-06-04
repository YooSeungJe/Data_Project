import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { TbListSearch } from "react-icons/tb";
import './css/Home.css'
import {useNavigate} from 'react-router-dom'



function Home() {
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const navigate = useNavigate();

  const 징크스 = process.env.PUBLIC_URL + '/징크스.jpg';

  const divStyle = {
    backgroundImage: `url(${징크스})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };



  return (
    <div style={divStyle}>
        <div className='main-bar'>
            <IoMenu 
            className='iomenu' 
            onClick={handleClick}
            />
            <div className='login-container'>
                <p className='login-button' onClick={()=>{navigate('/login')}}>로그인</p>
                <p className='register-button' onClick={()=>{navigate('/register')}}>회원가입</p>
            </div>
            {showOptions && (
            <div className='menu'>
                <p>신고</p>
                <p>통계</p>
            </div>
            )}
        </div>
        <div className='peco'>
            <p onClick={()=>{navigate('/')}}>PECO</p>
        </div>
        <div className="input-group mb-3 search" style={{width:'600px', margin:'auto'}}>
            <input type="text" className="form-control" placeholder="닉네임" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><TbListSearch style={{marginTop:'-5px'}}></TbListSearch></button>
        </div>
    </div>
  );
}

export default Home;