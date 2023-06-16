import './css/Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Api from '../api.js';
function Register() {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isMale, setIsMale] = useState('');
  const [personalInfoAgree, setPersonalInfoAgree] = useState();
  const [name, setName] = useState();
  const [lolId, setLolId] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const MALE = 1;
  const FEMALE = 0;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await Api.post('/user/register', {
        emailId,
        password,
        nickname,
        name,
        personalInfoAgree,
        isMale,
        lolId,
      });

      if (response && response.data) {
        console.log(response.data);
        alert('계정생성 성공!');
        navigate('/');
        // navigate('/login') // 성공 응답 확인
        // TODO: 회원가입 성공 시의 동작 추가
      } else {
        console.error('Invalid response'); // 응답이 올바르지 않은 경우 에러 처리
        // TODO: 응답이 올바르지 않은 경우의 동작 추가
      }
    } catch (error) {
      console.error(error.response?.data || error);
      alert('계정 생성 실패');
      // 실패 응답 확인 또는 예외 처리
      // TODO: 회원가입 실패 시의 동작 추가
    }
  };

  const handleConfirmSubmit = async e => {
    e.preventDefault();

    try {
      const response = await Api.post('/lolUser/check', {
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

  return (
    <div className='back-style'>
      <div className='register-form'>
        <div className='register-home'>
          <p
            onClick={() => {
              navigate('/');
            }}
          >
            PECO
          </p>
        </div>
        <div className='register-title'>
          <p>회원가입</p>
        </div>
        <form className='register-box' onSubmit={handleSubmit}>
          <div className='user-box'>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <label>이름</label>
            <input
              type='email'
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
              required
            />
            <label className='email'>이메일</label>
          </div>
          <div className='user-box'>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label>비밀번호(8자 이상)</label>
            <input
              type='password'
              value={confirmedPassword}
              onChange={e => {
                setConfirmedPassword(e.target.value);
                setPasswordMismatch(e.target.value !== password);
              }}
              required
            />
            <label className='email'>비밀번호 재확인</label>
            {passwordMismatch && (
              <p className='password-confirm'>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <div className='user-box'>
            <input
              className='lol-input'
              type='text'
              value={lolId}
              onChange={e => setLolId(e.target.value)}
              required
            />
            <label>LOL 닉네임</label>
            <button className='confirm-button' onClick={handleConfirmSubmit}>
              확인
            </button>
            <input
              className='peco-input'
              type='text'
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              required
            />
            <label className='nickname'>PECO 닉네임</label>
          </div>
          <center>
            <div className='sex'>
              <p>
                남자
                <input
                  type='radio'
                  name='gender'
                  value={1}
                  checked={isMale === MALE}
                  onChange={() => setIsMale(1)}
                  style={{ transform: 'scale(1.3)', marginRight: '5px' }}
                ></input>
              </p>
              <p style={{ marginLeft: '30px' }}>
                여자
                <input
                  type='radio'
                  name='gender'
                  value={0}
                  checked={isMale === FEMALE}
                  onChange={() => setIsMale(0)}
                  style={{ transform: 'scale(1.3)', marginRight: '5px' }}
                ></input>
              </p>
            </div>
            <div className='scroll-textbox'>
              <textarea placeholder='PECO의 다양한 라이엇 서비스를 이용하기 위해서는 라이엇게임즈의 계정이 필요합니다. 계정을 생성하고 라이엇 서비스를 이용하기 위해서는 (i) 성인이거나 (ii) 친권 독립 미성년자 또는 라이엇서비스 이용과 관련하여 적용될 수 있는 관계법령에 따라 독립적으로 계정을 생성할 수 있는 미성년자이거나 (iii) 부모님 또는 법정 대리인으로부터 본 약관에 대해 유효한 동의를 얻어야 합니다. 성인이나 친권 독립 미성년자가 아니거나 본 조항을 이해할 수 없다면 부모님 또는 법정 대리인께 말씀 드리고 도움을 요청해야 합니다. 귀하가 라이엇 서비스의 계정을 생성하려는 미성년자의 부모 또는 법정 대리인이라면, 귀하와 미성년자 자녀는 본 약관을 수락하고 본 약관에 구속되는 것에 동의하게 됩니다. 귀하는 또한 계정을 통한 구매 등 미성년자의 모든 계정 이용과 본 약관 준수에 대해 책임을 집니다. 라이엇서비스를 이용하는 모든 사람은 법인을 대리하거나 상업적인 목적으로 계정을 생성∙이용하거나 라이엇 서비스를 이용할 수 없습니다' disabled />
            </div>
            <div>
              <p
                style={{
                  color: 'white',
                  textAlign: 'right',
                  marginRight: '36px',
                }}
              >
                동의
                <input
                  type='radio'
                  name='personalInfoAgree'
                  value={1}
                  checked={personalInfoAgree === 1}
                  onChange={() => setPersonalInfoAgree(1)}
                  style={{ transform: 'scale(1.3)', marginRight: '4px' }}
                ></input>
              </p>
            </div>

            <button className='green-button' type='submit'>
              Register
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Register;
