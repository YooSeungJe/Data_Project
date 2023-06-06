import './css/Header.css'
import { IoMenu } from 'react-icons/io5';
import { TbListSearch } from "react-icons/tb";
import {useNavigate} from 'react-router-dom';

export default function Header () {
    const navigate = useNavigate();
    
    return (
        <div>
            <header className="header">
                <div className='logo-section'>
                    <div className="logo" onClick={()=>{navigate('/')}}>PECO</div>
                    <input type="text" 
                        className="form-control" 
                        placeholder="닉네임" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" 
                        type="button" 
                        id="button-addon2">
                    <TbListSearch style={{marginTop:'-5px'}}/></button>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">신고</li>
                        <li className="nav-item">통계</li>
                        <li className="nav-item">마이페이지</li>
                        <li className="nav-item">로그아웃</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}