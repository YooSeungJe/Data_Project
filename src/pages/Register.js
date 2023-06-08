import './css/Register.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
function Register() {



    const navigate = useNavigate();

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isMale, setIsMale] = useState('');
    const [personalInfoAgree, setPersonalInfoAgree] = useState();
    const [name, setName] = useState();
    const [lolId, setLolId] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:3001/user/register', {
            emailId,
            password,
            nickname,
            name,
            personalInfoAgree,
            isMale,
            lolId,
          });
      
          if (response && response.data) {
            console.log(response.data)
            alert('계정 생성 성공!')
            navigate('/login')
            ; // 성공 응답 확인
            // TODO: 회원가입 성공 시의 동작 추가
          } else {
            console.error('Invalid response'); // 응답이 올바르지 않은 경우 에러 처리
            // TODO: 응답이 올바르지 않은 경우의 동작 추가
          }
        } catch (error) {
          console.error(error.response?.data || error);
          alert('계정 생성 실패')
          // 실패 응답 확인 또는 예외 처리
          // TODO: 회원가입 실패 시의 동작 추가
        }
      };
      
      const handleConfirmSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:3001/lolUser/check', {
            lolId,
          });
      
          if (response && response.data) {
            if (response.data.exists) {
              alert('이미 사용 중인 LOL 닉네임입니다.');
            } else {
              alert('확인 완료');
            }
          } else {
            console.error('Invalid response');
          }
        } catch (error) {
          console.error(error.response?.data || error);
          alert('존재하지 않는 닉네임입니다');
        }
      };
      

    return(
        <div className='back-style'>
            <div className='register-form'>
                <div className='register-home'>
                    <p onClick={()=>{navigate('/')}}>PECO</p>
                </div>
                <div className='register-title'>
                    <p>회원가입</p>
                </div>
                <form className='register-box' onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>이름</label>
                        <input 
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                        <label className='email'>이메일</label>
                        
                    </div>
                    <div className='user-box'>
                        <input
                            className='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>비밀번호</label>
                    </div>    
                    
                    <div className="user-box">
                        <input 
                            className='lol-input'
                            type="text"
                            value={lolId}
                            onChange={(e) => setLolId(e.target.value)}
                            required
                        />
                        <label>LOL 닉네임</label>
                        <button className='confirm-button' onClick={handleConfirmSubmit}>확인</button>
                        <input
                            className='peco-input' 
                            style={{position:'relative', right:'30px'}}
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                        <label className='nickname'>PECO 닉네임</label>
                    </div><center>

                    <div className='sex'>
                        <p>남자<input 
                            type="radio"
                            name="gender"
                            value={1}
                            checked={isMale === 1}
                            onChange={() => setIsMale(1)}
                        ></input></p>
                        <p style={{marginLeft:'30px'}}>여자<input 
                            type="radio"
                            name="gender"
                            value={0}
                            checked={isMale === 0}
                            onChange={() => setIsMale(0)}
                        ></input></p>
                    </div>
                    <div className="scroll-textbox">
                        <textarea
                        placeholder="가입할래 말래?"
                        disabled
                        />
                    </div>
                    <div>
                        <p style={{color:'white', textAlign:'right', marginRight:'36px'}}>동의함<input 
                        type='radio'
                        name='personalInfoAgree'
                        value={1}
                        checked={personalInfoAgree === 1}
                        onChange={()=>setPersonalInfoAgree(1)}
                        ></input></p>
                    </div>
  



                    <button className='green-button' type="submit">
                        Register
                    <span></span>
                    </button></center>
                </form>
            </div>
        </div>
    )
}

export default Register



